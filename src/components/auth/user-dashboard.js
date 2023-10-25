import React, { Component } from "react";
import axios from "axios";
const { secretToken } = require('../../token'); 

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
    };
  }

  render() {
    return (
      <div>
       <h1>USER dashboard</h1>
      </div>
    );
  }
}

export default UserDashboard;
