import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
        <div className="container bottom-navbar">
            <ul className="nav nav-pills nav-fill fixed-bottom">
                <li className="nav-item nav-link"><Link to="/diaries">My Diaries</Link></li>
                <li className="nav-item nav-link"><Link to="/addnew"><i className="fa fa-plus-circle"></i></Link></li>
                <li className="nav-item nav-link"><Link to="/profile">About Me</Link></li>
            </ul>
        </div>  
    );
  }
}

export default Navbar;
