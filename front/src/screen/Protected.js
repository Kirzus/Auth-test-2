import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';

// import { NavLink } from "react-router-dom";
import axios from 'axios'

class Protected extends Component {
  state = {
    name: "",
    email: "",
    role: "",
    authorized : false
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token")

    axios({
      method: 'Get',
      url: "http://localhost:3031/auth/protected", 
       headers: {
         'x-access-token': `${token}`,
       },
      })
      .then(res => {
        this.setState({
          name: res.data[0].name,
          email: res.data[0].email,
          role: res.data[0].role,
          authorized: true
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          authorized: false
        })
      })
  }

  render() {
    const { authorized } = this.state;
    if (!authorized) {
      return <p>This page is protected, you need to be <NavLink to="/login" className="link">logged in</NavLink> to view it</p>;
    }
    return (
      <div className="wrapper">
        <h1>ACCESS AUTHORIZED: PERSONNAL SPACE</h1>
        <h2>Welcome {this.state.name} !</h2>
        <p>Your account email is: {this.state.email}</p>
        <p>Your role is: {this.state.role}</p>
      </div>
    );
  }
}

export default Protected;
