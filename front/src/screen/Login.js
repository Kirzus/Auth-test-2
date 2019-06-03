import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Login extends Component {
  state = {};

  render() {
    return (
      <form className="" noValidate autoComplete="off">
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
          id="outlined-password-input"
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
