import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios'
// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Login extends Component {
  state = {
    redirect: false
  };

  onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3031/auth/login", {
        password: e.target.password.value,
        email: e.target.email.value,
      })
      .catch(error => {
        console.log(error);
      })
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.headers["x-access-token"])
        console.log('token',localStorage.getItem("token"))
        this.setState({
          redirect : true
        })
      });
  }

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
          id="outlined-email-input"
          label="Email"
          className=""
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          autoFocus
        />
        <TextField
          required
          id="password"
          label="Password"
          className=""
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
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
