import React, { Component } from 'react';
import firebase from './firebase.js';
import logo from './logo.svg';
import Container from './components/Container/Container.js';
import LoginForm from './components/Forms/LoginForm.js';
import './App.css';

class App extends Component {
  
  
  state = {
    email: '',
    password: '',
    user: '',
    error: false
  }
  
  
  onSubmit = (e) => {
    e.preventDefault();
    firebase.auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => alert(error.message))
    .catch(error => console.log(error))
    .then(user =>  console.log("Created user", user))


  }
  
  onAuthChanged = () => {
    firebase.auth()
    .onAuthStateChanged((user) => {
      if(user) {
        this.setState({user: user});
      }
      else {
        this.setState({user: ''});
      }
    })
  }
  
  signIn = (e) => {
    e.preventDefault();
    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => console.log("SIGNED IN!"))
    .catch(error => alert(error.message))
    .catch(error => {
      console.log("You goofed", error);
    });

    console.log(this.state.user);
  }
  
  signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    console.log("User signed out");
    
  }
  
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  
  getRedirectResult = () => {
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    
    
  }

  componentDidMount() {
    this.onAuthChanged();
    this.getRedirectResult();
  }
  
  
  render() {

  

    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to AnimeOnline! {this.state.user.email}</h2>
      </div>
      <Container>
     { !this.state.user && <LoginForm 
      password={this.state.password}
      email={this.state.email}
      onChange={this.onChange}
      register={this.onSubmit}
      login={this.signIn}
      google={this.signInWithGoogle}
      /> }

      { this.state.user && <div className="box">
        <h3>
          I AM THE BEST AROUND!
          </h3>
          <input className="btn btn-danger" type="button" value="Sign out" onClick={this.signOut} />
        </div> }
      </Container>
      </div>
    );
  }
}

export default App;
