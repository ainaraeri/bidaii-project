import React, { Component } from 'react';
import moment from "moment";

import PortfolioContainer from './portfolio/porfolio-container';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Ainara Erice Portfolio</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>

        <br></br>

        <PortfolioContainer />
        <br></br>
      </div>
    );
  }
}

