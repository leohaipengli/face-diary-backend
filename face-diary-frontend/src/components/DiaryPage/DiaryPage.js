import React, { Component } from 'react';
import axios from 'axios';
import KeywordList from '../KeywordList/KeywordList';
import ProgressBar from '../ProgressBar/ProgressBar';
import Constants from '../../settings/constants.json';
import statusCheck from '../../utils/statusCheck';
import figure from './test.jpg';
import './DiaryPage.css'

class DiaryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      timestamp: null,
      keywordList: [],
      apiDataDictionary: null,
      content: null
    }
  }

  async componentDidMount() {
    try {
      let res = await this.getDiaryFromServer(this.props.match.params.id);
      if (statusCheck(res, this.props.history)) {
        let obj = res.data.payload;
        this.setState({
          imageURL: obj.facePhoto,
          timestamp: (new Date(obj.createdAt)).toLocaleDateString(),
          keywordList: obj.keywords,
          apiDataDictionary: obj.emotions,
          content: obj.content
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async getDiaryFromServer(id) {
    let url = Constants.apiBaseUrl + '/entries/' + id + '/get';
    return await axios.get(url);
  }

  async deleteDiaryFromServer(id) {
    let url = Constants.apiBaseUrl + '/entries/' + id + '/delete';
    return await axios.get(url);
  }

  async onDeleteClick(event) {
    event.preventDefault();
    let res = await this.deleteDiaryFromServer(this.props.match.params.id);
    if (statusCheck(res, this.props.history)) {
      this.props.history.goBack();
    }
  }

  // dataObject : imageURL, keywordList, date, weather, apiDataDictionary, content

  render() {
    if (this.state.imageURL) {
      var dict = this.state.apiDataDictionary;
      var keys = Object.keys(dict);
      return (
        <div className="container diary-page">
          <div className="row">
            <div className="col-12">
              <img src={this.state.imageURL} alt="diary cover" className="diary-image rounded" />
            </div>
          </div>
          <div className="row diary-meta-info">
            <div className="col-12">
              <em className="date-weather">{this.state.timestamp}</em>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <KeywordList keywordList={this.state.keywordList} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {
                keys.map((item, i) => {
                  if (dict[item] > 0) return (
                    <ProgressBar type={item} value={dict[item]} />
                  )
                }
                )
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              <p className="diary-text">{this.state.content}</p>
            </div>
          </div>
          <button onClick={async (e)=>await this.onDeleteClick(e)} className="btn btn-block btn-danger">Delete</button>
        </div>
      );
    }
    else {
      return ("Loading...")
    }
  }
}

export default DiaryPage;
