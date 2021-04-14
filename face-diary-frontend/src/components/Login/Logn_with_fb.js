import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import FacebookAuth from "react-facebook-auth";
import {
  Button,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from "react-bootstrap";

const btnStyles = {
  backgroundColor: "#008CBA",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer"
};

const MyFacebookButton = ({ onClick, styles }) => (
  <button onClick={onClick} style={styles}>
    Login with facebook
  </button>
);

const authenticate = response => {
  console.log(response);
};

export default class Logn_with_fb extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    <div>
      <h1>Facebook Auth</h1>
      <FacebookAuth
        appId="532476480295175"
        callback={authenticate}
        //  component={MyFacebookButton}
        customProps={{ styles: btnStyles }}
      />
    </div>;
  };

  render() {
    return (
      <div className="Logn_with_fb ">
        <div className="login_form">
          <form>
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
          </form>
          <FacebookAuth
            // appId="532476480295175"
            // callback={authenticate}
            component={MyFacebookButton}
            // customProps={{ styles: btnStyles }}
          />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<Logn_with_fb />, document.getElementById('root'));
