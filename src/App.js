import React, { Component } from 'react';
import firebase from './firebase.js';
import logo from './logo.svg';
import Container from './components/Container/Container.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the FoodNetwork!</h2>
        </div>
        <Container>
        <button className="btn btn-primary"> Click Me! </button>
        </Container>
      </div>
    );
  }
}

export default App;
