import React, { Component } from 'react';
import TextArea from 'react-autosize-textarea';
import Axios from 'axios';
import KeywordList from '../KeywordList/KeywordList';
import ProgressBar from '../ProgressBar/ProgressBar';
import Constants from '../../settings/constants.json';
import statusCheck from '../../utils/statusCheck';
import contentGenerator from '../../utils/contentGenerator';
import './AddNew.css';

class AddNew extends Component {

  constructor(props) {
    super(props);
    this.fileInput = null;
    this.keywordInput = null;
    this.imageName = null;
    this.state = {
      imagePreviewUrl: null,
      file: null,
      keywords:[],
      emotions: null,
      content:""
    };
  }

  isSubmitable(){
    return (this.imageName&&this.state.emotions);
  }

  async uploadImageToServer(file){
    const url = Constants.apiBaseUrl + '/emotion/upload';
    if(file){
      const formData = new FormData();
      formData.append('photo',file)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      let res = await Axios.post(url, formData, config);
      console.log(res);
      return res;
    }
    else{
      throw "file is null";
    }
  }

  async getEmotionsFromServer(imageUrl){
    const url = Constants.apiBaseUrl + '/emotion/detect';
    if(imageUrl){
      return await Axios.post(url,{
        url:imageUrl
      });
    }
    else{
      throw "imageUrl is null";
    }
  }

  async submitDiary(){
    const url = Constants.apiBaseUrl + '/entries/create';
    if(this.isSubmitable()){
      return await Axios.post(url,{
        keywords: this.state.keywords,
        facePhoto: this.imageName,
        emotions: this.state.emotions,  
        content: this.state.content
      });
    }
    else{
      throw "unsubmitable";
    }
  }

  simulateClick(event) {
    this.fileInput.click();
  }

  async onSubmitClick(event){
    event.preventDefault();
    try{
      let res = await this.submitDiary();
      if(statusCheck(res,this.props.history)){
        this.props.history.push('/diaries');
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async onImageUpload(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = async () => {
      //console.log(file);
      this.imageName = null;
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        emotions: null
      });
      try{
        let imageRes = await this.uploadImageToServer(file);
        console.log(imageRes);
        if(statusCheck(imageRes,this.props.history)){
          this.imageName = imageRes.data.payload.url.split('/').pop();
          console.log(this.imageName);
          let emotionRes = await this.getEmotionsFromServer(imageRes.data.payload.url);
          if(statusCheck(emotionRes,this.props.history)){
            console.log(this.textArea)
            this.setState({
              emotions: emotionRes.data.payload,
              content: contentGenerator(emotionRes.data.payload)
            });
          }
        }
        
      } catch(e){
        console.log(e);
      }
      
    }
    reader.readAsDataURL(file);
  }

  onKeywordEnter(event){
    if(event.key==="Enter"){
      //event.preventDefault();
      this.setState({
        keywords: [...this.state.keywords, this.keywordInput.value]
      });
      this.keywordInput.value = "";
    }
  }

  onKeywordCloseIconClick(event,item,i){
    event.preventDefault();
    let keywords = this.state.keywords;
    this.setState({
      keywords: keywords.slice(0,i).concat(keywords.slice(i+1,keywords.length))
    });
  }

  render() {
    let imagePreview = null,
      tags = null,
      progressBars = null;

    if (this.state.imagePreviewUrl) {
      imagePreview = (<img alt="diary cover" src={this.state.imagePreviewUrl} />);
    }
    else {
      imagePreview = (
        <div className = "prompt-text">
          <i className = "fa fa-camera"></i>
          <br/>
          Take a selfie now!
        </div>
      )
    }

    if(this.state.imagePreviewUrl&&!this.state.emotions){
      progressBars = (<p className="spinner">Detecting your emotions:)</p>);
    }

    if (this.state.emotions){
      let data = this.state.emotions;
      progressBars = (
        <div>
          {
            Object.keys(data).map((key,i) => {
              if(data[key]>0){
                return <ProgressBar type={key} value={data[key]} key={i}/>
              }
              else{
                return null;
              }
            })
          }
        </div>
      );
    }

    if (this.state.keywords.length>0){
      tags = (
        <KeywordList keywordList={this.state.keywords}
        closeIcon={true} onCloseIconClick={(e,item,i)=>this.onKeywordCloseIconClick(e,item,i)}/>
      );
    }

    return (
      <div className="page-addnew container">

        <div className="row card rounded photo-block" onClick={(e) => this.simulateClick(e)}>
          {imagePreview}
          <input ref={(e) => { this.fileInput = e }} onChange={async (e) => {await this.onImageUpload(e)}} type="file" accept="/image/*" />
        </div>

        {progressBars}
        
        <div className="row">
          {tags}
          <div className="form-group">
            <input onKeyPress={(e)=>this.onKeywordEnter(e)} 
              ref={(e) => { this.keywordInput = e }}
              type="text" name="name" className="form-control" id="name" placeholder="Add new tag..." />
          </div>
        </div>

        <div className="row">
          <div className="form-group content-block">
            <TextArea  onChange={(e)=>{this.setState({content:e.target.value})}}
            value={this.state.content} className="form-control" rows={5} placeholder="Add more content..."></TextArea>
          </div>
        </div>

        <div className="row">
          <button onClick={async (e) => {await this.onSubmitClick(e)}} className="btn btn-block btn-info" disabled={!this.isSubmitable()}>Submit!</button>
        </div>

      </div>
    );
  }
}

export default AddNew;
