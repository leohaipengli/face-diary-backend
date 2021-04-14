import React, { Component } from 'react';
import axios from 'axios';
import AccountInfo from '../AccountInfo/AccountInfo'
import logo from '../../resources/face-diary.png';
import Statistics from '../Statistics/Statistics';
import Header from '../Header/Header';
import Constants from '../../settings/constants.json';
import statusCheck from '../../utils/statusCheck';
import './Profile.css';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: null,
      name: null,
      emotions: null
    };
  }

  async getUserInfoFromServer(){
    let url = Constants.apiBaseUrl+'/users/me';
    return await axios.get(url);
  }
  
  async getEmotionSummaryFromServer(){
    let url = Constants.apiBaseUrl+'/emotion/summary';
    return await axios.get(url);
  }

  async logoutFromServer(){
    let url = Constants.apiBaseUrl+'/users/logout';
    return await axios.get(url);
  }

  async onLogoutClick(event) {
    event.preventDefault();
    try {
      let res = await this.logoutFromServer();
      if (statusCheck(res, this.props.history)) {
        this.props.history.push('/login');
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      let res = await this.getUserInfoFromServer();
      if (statusCheck(res, this.props.history)) {
        let user = res.data.payload;
        this.setState({
          email:user.email,
          name:user.name
        });
      }
    }
    catch (e) {
      console.log(e);
    }
    try {
      let res = await this.getEmotionSummaryFromServer();
      if (statusCheck(res, this.props.history)) {
        this.setState({
          emotions:res.data.payload
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  render(){
    return(
      <div className="profile-page">
        <Header/>
        <AccountInfo email={this.state.email} userName={this.state.name}/>
        <Statistics emotions={this.state.emotions}/>
        <button onClick={async (e)=>await this.onLogoutClick(e)}
          className="btn btn-block btn-danger">
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;
