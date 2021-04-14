import React, { Component } from "react";
import {
  Button,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from "react-bootstrap";
import { Auth } from "aws-amplify";
import Constants from '../../settings/constants.json';
import Header from '../Header/Header';
import axios from "axios";

// import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
// import logo from "./logo.svg";
import logo from '../../resources/face-diary.png';


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",
      // confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 && this.state.password.length > 0
      //  && this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
        Constants.apiBaseUrl + "/users/register",
        {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        },
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      )
      .then((response) => {
        console.log(response);

        if (response.data.status == "success") {
          // console.log("sdfsdfsdfsdfsdf");
          this.props.history.push('/diaries');
        }
      })
      .catch((error)=> {
        console.log(error);
      });
  };

  // handleConfirmationSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });

  //   try {
  //     await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
  //     await Auth.signIn(this.state.email, this.state.password);

  //     this.props.userHasAuthenticated(true);
  //     this.props.history.push("/");
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ isLoading: false });
  //   }
  // }

  // renderConfirmationForm() {
  //   return (
  //     <form onSubmit={this.handleConfirmationSubmit}>
  //       <FormGroup controlId="confirmationCode" bsSize="large">
  //         <ControlLabel>Confirmation Code</ControlLabel>
  //         <FormControl
  //           autoFocus
  //           type="tel"
  //           value={this.state.confirmationCode}
  //           onChange={this.handleChange}
  //         />
  //         <HelpBlock>Please check your email for the code.</HelpBlock>
  //       </FormGroup>
  //       <LoaderButton
  //         block
  //         bsSize="large"
  //         disabled={!this.validateConfirmationForm()}
  //         type="submit"
  //         isLoading={this.state.isLoading}
  //         text="Verify"
  //         loadingText="Verifying…"
  //       />
  //     </form>
  //   );
  // }

  renderForm() {
    return (
      <div className="container signup_form">
        <form onSubmit={(event)=>this.handleSubmit(event)}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              placeholder="Your cool Name:)"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              // autoFocus
              type="email"
              value={this.state.email}
              placeholder="example@host.com"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              placeholder="Your password"
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {/* <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              placeholder="Re-Enter your Password"
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup> */}
          <Button
            className="signup_button btn btn-block btn-info"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up!
          </Button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="Signup">
        <Header/>

        <span>
          {this.state.newUser === null ? (
            this.renderForm()
          ) : (
            <Alert bsStyle="warning">
              <strong>Error!</strong>
            </Alert>
          )
          // this.renderConfirmationForm()
          }
        </span>
      </div>
    );
  }
}
