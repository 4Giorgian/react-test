import React, { Component } from 'react';
import TableTest from './components/Table';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TableTest />
      </div>
    );
  }
}

export default App;
