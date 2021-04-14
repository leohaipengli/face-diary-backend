import React, { Component } from 'react';
import Axios from 'axios';
import PreviewSingle from './PreviewSingle';
import statusCheck from '../../utils/statusCheck';
import Constants from '../../settings/constants.json';
import logo from '../App/logo.svg';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import './PreviewList.css';

class PreviewList extends Component {

    constructor(props){
      super(props);
      this.state={
        diaries:[]
      };
    }

    getItemList() {
      return this.state.diaries;
    }

    async componentDidMount(){
      try{
        let res = await this.getDiariesFromServer();
        if(statusCheck(res,this.props.history)){
          this.setState({
            diaries:res.data.payload.map((item,i)=>{
              return {
                id: item.id,
                imageURL: item.facePhoto,
                timestamp:(new Date(item.createdAt)).toLocaleDateString(),
                keywords: item.keywords,
              }
            })
          })
        }
      }
      catch(e){
        console.log(e);
      }
    }

    async getDiariesFromServer(){
      const url = Constants.apiBaseUrl + '/entries/list';
      return await Axios.get(url);
    }

    onDiaryClick(event,id){
      event.preventDefault();
      this.props.history.push('/diarypage/'+id);
    }

    render() {
        var itemList = this.getItemList();
        return (
            <div className="container preview-list">
                <div className="row">
                {
                    itemList.map((item, j) => 
                        <PreviewSingle
                            key={j}
                            imageURL={item.imageURL}
                            timestamp={item.timestamp}
                            keywords={(item.keywords.length < 1) ? ["no keywords"] : item.keywords}
                            onClick={(e)=>this.onDiaryClick(e,item.id)}
                        />
                    )
                }
                </div>
            </div>
        );
    }
}

export default PreviewList;
