import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {};
  render() {
    return (
      <>
        <form className="" noValidate>
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
