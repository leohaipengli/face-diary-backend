import React, { Component } from "react";
import './Header.css';
import logo from '../../resources/face-diary.png';

export default class Header extends React.Component{
  render() {
    return (
        <span>
          <header className="Login-header">
            <img src={logo} className="Login-logo" alt="logo" />
            <h1 className="Login-title">Keep your diary just by taking some selfies!</h1>
          </header>
        </span>
    );
  }
}
