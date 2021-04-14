import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import PreviewList from '../PreviewList/PreviewList';
import AddNew from '../AddNew/AddNew';
import Navbar from '../Navbar/Navbar';
import Profile from '../Profile/Profile';
import axios from "axios/index";

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
            <Route exact path="/" component={PreviewList} />
            <Route path="/diaries" component={PreviewList} />
            <Route path="/addnew" component={AddNew} />
            <Route path="/profile" component={Profile} />
        </Switch>
        <Navbar/>
      </div>
    );
  }
}

export default App;
