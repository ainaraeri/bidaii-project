import React, { Component } from 'react';
import moment from "moment";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Ainara Erice Portfolio</h1>
        <br></br>

        <h2>Let's create something awesome</h2>
        <br></br>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
    );
  }
}
