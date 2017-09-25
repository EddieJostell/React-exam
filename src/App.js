import React, { Component } from 'react';
import firebase from './firebase.js';
import Container from './components/Container/Container.js';
import LoginForm from './components/Forms/LoginForm.js';
import RegForm from './components/Forms/RegForm.js';
import Navbar from './components/Navbar/Navbar.js';
import MainContent from './components/MainContent/MainContent.js';
import WelcomePage from './components/WelcomePage/WelcomePage.js';
import './sass/App.css';

const db = firebase.database();

class App extends Component {
  
  
  state = {
    regemail: '',
    regpassword: '',
    email: '',
    password: '',
    username: '',
    user: '',
    error: false,
    logVisible: false,
    regVisible: false,
    logBtn: '',
    regBtn: ''
  }
  
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
    /* this.setState({[e.target.name] : this.state.loginBtn})
    this.setState({[e.target.name] : this.state.regBtn}) */
  }
  
  logVisible = () => {
    console.log("LoginForm is visible!");
    this.setState({logVisible: !this.state.logVisible,
      regVisible: false
    })
  }
  
  regVisible = () => {
    console.log("RegForm is visible!");
    this.setState({regVisible: !this.state.regVisible,
      logVisible: false
    })
  }

  cancelOnClick = () => {
    this.setState({logVisible: false,
    regVisible: false})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    /* this.setState({ error: false}) */
    firebase.auth()
    .createUserWithEmailAndPassword(this.state.regemail, this.state.regpassword)
    .then((user) => {
      firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({ 
        email: user.email,
         uid: user.uid,
        username: this.state.username })
    })
    .then((user) => {
      alert("Welcome to HELL!");
    })
    .catch( error => console.log(error))
 
    
    
  }
  
  onAuthChanged = () => {
    firebase.auth()
    .onAuthStateChanged((user) => {
      if(user) {

        const userCred = {
          uid: user.uid,
          email: user.email,
          username: user.displayName
        }
    
        this.setState({user: user, user: userCred})

        if(user.displayName) {
          
         /*  const newUser = {
            email: user.email,
            photoUrl: user.photoURL,
            displayName: user.displayName
          } */
          
          this.setState({ username: user.displayName });
          /*   this.setState({user: user}); */
        }
        else {
         return null;
        }
      }
      else {
        this.setState({user: ''});
      }
    })
  }
  
  
  signIn = (e) => {
    e.preventDefault();
   /*  this.setState({ error: false}) */
    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => console.log("SIGNED IN!"))
    .catch(error => alert(error.message))
    .catch(error => {
      console.log("You goofed", error);
    });
    
  /*   console.log(this.state.user); */
  }
  
  signOut = (e) => {
    e.preventDefault();
    this.setState({email: '', password: ''});
    firebase.auth().signOut();
    console.log("User signed out");
    
  }
  
  
  
  
  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      /* var token = result.credential.accessToken; */
      // The signed-in user info.
      var user = result.user;
      
      //db = firebase.database()
      db.ref(`users/${user.uid}`)
      .set({ 
        email: user.email, 
        uid: user.uid,
        username: user.displayName})

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
  }
  
  render() {
    
    return (
      <div className="App">
      <div className="App-header">
      <Navbar 
      username={this.state.username}
      user={this.state.user} 
      signOut={this.signOut} 
      logBtn={this.logVisible} 
      regBtn={this.regVisible}
      google={this.signInWithGoogle}
      />
      
      </div> {/* END OF App-Header*/}
      <Container>
       {!this.state.user && <WelcomePage /> }
        {this.state.user && <MainContent 
        user={this.state.user}
        /> }

      { ( !this.state.user && this.state.regVisible) ? <RegForm 
        regpassword={this.state.regpassword}
        regemail={this.state.regemail}
        username={this.state.username}
        onChange={this.onChange}
        register={this.onSubmit}
        error={this.state.error}
        cancel={this.cancelOnClick}
        /> : null }
        
        { (!this.state.user && this.state.logVisible) ? <LoginForm 
          password={this.state.password}
          email={this.state.email}
          onChange={this.onChange}
          login={this.signIn}
          error={this.state.error}
          cancel={this.cancelOnClick}
          /> : null }
          
          
          
          {this.state.user &&  <div className="form-group">
          </div> }
          </Container>
          </div>
        );
      }
    }
    
    export default App;
    