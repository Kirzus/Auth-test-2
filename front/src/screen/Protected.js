import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import axios from 'axios'

class Protected extends Component {
  state = {
    name: "",
    email: "",
    role: ""
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
      .catch(error => {
        console.log(error);
      })
      .then(res => {
        console.log(res) 
        this.setState({
          name: res.data[0].name,
          email: res.data[0].email,
          role: res.data[0].role
        })
      })
  }

  render() {
    return (
      <div className="wrapper">
        <h1>ACCESS AUTHORIZED: PERSONNAL SPACE</h1>
        <h2>Welcome {this.state.name} ! </h2>
        <p>Your account email is: {this.state.email}</p>
        <p>Your role is: {this.state.role}</p>
      </div>
    );
  }
}

export default Protected;
