import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Login extends Component {
  state = {
    redirect: false,
    error_msg: "",
    error_email: "",
    error_password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3031/auth/login", {
        password: e.target.password.value,
        email: e.target.email.value
      })
      .then(res => {
        localStorage.setItem("token", res.headers["x-access-token"]);
        this.setState({
          redirect: true
        });
      })
      .catch(error => {

        // Dom selectors
        const emailDom = document.querySelector("#email");
        const passwordDom = document.querySelector("#password");

        // Not Found 
        if (error.response.statusText === "Not Found") {
          this.setState({
            error_msg: error.response.data,
            error_email: true,
            error_password: false
          });
          // Resets email input
          emailDom.value = "";
          emailDom.focus();
        } else if (error.response.statusText === "Unauthorized") {
          this.setState({
            error_msg: error.response.data.error_msg,
            error_email: false,
            error_password: true
          });
          // Resets password input
          passwordDom.value = "";
          passwordDom.focus();
        }
      });
  };

  render() {
    // State declaration
    const { redirect } = this.state;

    // When form submited, redirected to /protected
    if (redirect) {
      return <Redirect to="/protected" />;
    }
    
    return (
      <form className="" noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <TextField
          required
          id="email"
          label="Email"
          className="login-input"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          autoFocus
          error={this.state.error_email ? true : false}
        />
        {this.state.error_email ? (<p className="error-msg">* {this.state.error_msg}</p>) : ("")}
        <TextField
          required
          id="password"
          label="Password"
          className="login-input"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          error={this.state.error_password ? true : false}
        />
        {this.state.error_password ? ( <p className="error-msg">* {this.state.error_msg}</p> ) : ("")}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          color="primary"
          label="Submit"
          type="submit"
          variant="contained"
          className="btn"
        >
          Sign in
        </Button>
        <NavLink to="/register" className="link">
          {"Don't have an account? Sign Up"}
        </NavLink>
      </form>
    );
  }
}

export default Login;
