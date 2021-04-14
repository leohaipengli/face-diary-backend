import React, { Component } from "react";
import {
  Button,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from "react-bootstrap";
import "./Login.css";
import Header from '../Header/Header';
import axios from "axios";
import Constants from '../../settings/constants.json';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
      // type: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {


    event.preventDefault();

    axios
      .post(
        Constants.apiBaseUrl + "/users/login",
        {
          email: this.state.email,
          password: this.state.password
        },
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status == "success") {
          this.props.history.push('/diaries');          
        } else if (response.data.status == "unauthenticated") {
          alert(JSON.stringify(response.data))
        } else if (response.data.status == "fail") {
          alert(JSON.stringify(response.data))
        }
      })
      .catch((error)=> {
        alert(JSON.stringify(error));
      });
  };


  render() {
    return (
      <div className="Login">
        <Header/>
        <div className="container">
            <div className="login_form form-group">
              <form onSubmit={(event)=>this.handleSubmit(event)}>
                <FormGroup controlId="email" bsSize="large">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    placeholder="Enter your Email address"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    placeholder="Enter your Password"
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <Button
                  className="login_button btn btn-block btn-info"
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  Login
                </Button>
                <div className="register_text">
              <p>
                Not a member yet? <a href="/signup"> Register </a> now!!!
              </p>
            </div>
            
            <div className="facebook-login-block">
              <p>OR</p>
              <div>
                <Button
                  className="facebook_button btn btn-info btn-block"
                  block
                  bsSize="large"
                  onClick={() => window.location = Constants.apiBaseUrl + "/users/facebook-login"}
                >
                  Login with Facebook
                </Button>
              </div>
            </div>
              </form>
            </div>
          </div>
      </div>
    );
  }
}
