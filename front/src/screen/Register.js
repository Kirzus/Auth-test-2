import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios'

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    redirect: false
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.name.value);
    console.log(e.target.password.value);
    console.log(e.target.email.value);

    axios
      .post("http://localhost:3031/auth/register", {
        name: e.target.name.value,
        password: e.target.password.value,
        email: e.target.email.value,
        role: "user"
      })
      .catch(error => {
        console.log(error);
      })
      .then(res => {
        console.log(res)
        this.setState({
          redirect : true
        })
      });
  }

  render() {
    // State declaration
    const { redirect } = this.state;
    // When form submited, redirected to /login 
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <form className="" noValidate onSubmit={this.onSubmit}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            margin="normal"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="btn"
          >
            Sign Up
          </Button>
          <NavLink to="/login" className="link">{"Have an account? Log in"}</NavLink>
        </form>
      </>
    );
  }
}

export default Register;
