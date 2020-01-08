import React, { Component } from 'react';
import BulkCreator from './components/BulkCreator';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="ui container">
          <div className="page-heading">
            <h1 className="ui center aligned header">Shopify Proudct Metafiled Bulk Edit</h1>
          </div>
          <BulkCreator />
          <div className="ui center aligned container" style={{fontSize: "20px"}}>Powered By <a href="https://www.madeforcode.com/">Made for Code</a></div>
        </div>
      </div>
    );
  }
}

export default App;
