import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';

// import { NavLink } from "react-router-dom";
import axios from 'axios'

class Confirmation extends Component {
  state = {
    confirming : true
  };

  componentDidMount = () => {
    const token = this.props.match.params.token
    console.log(token);
    axios({
      method: 'PUT',
      url: `http://localhost:3031/auth/confirmation/${token}`, 
       headers: {
         'x-access-token': `${token}`,
       },
      })
      .then(res => {
        this.setState({ confirming: false })
        console.log(res.msg);
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
        <div className='confirm'>
            {this.state.confirming
            ?   <p>Loading...</p> 
            :   <NavLink to='/Login'>
                    <p>Email succesfully confirmed !</p>
                    <button>Click to go to login</button>
                </NavLink>
            }
        </div>
    );
  }
}

export default Confirmation;
