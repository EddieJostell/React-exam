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

//App component where everything eventually ends up.
//Containing all the logic for registering and login for a user. 
//And the logic for how to sign in with a google account.


class App extends Component {
  
  
  state = {
    regemail: '',
    regpassword: '',
    regusername: '',
    email: '',
    password: '',
    username: '',
    user: '',
    uid: '',
    error: false,
    logVisible: false,
    regVisible: false,
    logBtn: '',
    regBtn: '',
    errorMsg: ''
  }
  
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  
  logVisible = () => {
    console.log("LoginForm is visible!");
    this.setState({logVisible: !this.state.logVisible,
      regVisible: false,
      errorMsg : ''
    })
  }
  
  regVisible = () => {
    console.log("RegForm is visible!");
    this.setState({regVisible: !this.state.regVisible,
      logVisible: false,
      errorMsg : ''
    })
  }

  cancelOnClick = () => {
    this.setState({logVisible: false,
    regVisible: false, errorMsg : ''})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const displayName = this.state.regusername;
    console.log(this.state.regusername);
    firebase.auth()
    .createUserWithEmailAndPassword(this.state.regemail, this.state.regpassword)
    .then((user) => {
      firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({ 
        email: user.email,
         uid: user.uid,
        username: displayName
       })
        this.setState({errorMsg: ''})
    })
    .catch( error => this.setState({
      errorMsg: error.message}))
 
    
    
  }
  
  onAuthChanged = () => {
    firebase.auth()
    .onAuthStateChanged((user) => {
      if(user) {

       /*  const userCred = {
          uid: user.uid,
          email: user.email,
          username: user.displayName
        } */
    
        this.setState({user: user})

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
    .then(user =>  this.setState({errorMsg: ''}))
    .catch(error => this.setState({
      errorMsg: error.message}) )
    .catch(error => {
      console.log("You goofed", error);
    });
    
    
 
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
      /* var errorCode = error.code;
      var errorMessage = error.message; */
      // The email of the user's account used.
      /* var email = error.email; */
      // The firebase.auth.AuthCredential type that was used.
     /*  var credential = error.credential; */
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
       {this.state.errorMsg && <div className="errorMSG"> <p> { this.state.errorMsg } </p> </div>}
        {this.state.user && <MainContent 
        user={this.state.user}
        /> }

      { ( !this.state.user && this.state.regVisible) ? <RegForm 
        regpassword={this.state.regpassword}
        regemail={this.state.regemail}
        username={this.state.username}
        onChange={this.onChange}
        register={this.onSubmit}
        error={this.state.errorMsg}
        cancel={this.cancelOnClick}
        /> : null }
        
        { (!this.state.user && this.state.logVisible) ? <LoginForm 
          password={this.state.password}
          email={this.state.email}
          onChange={this.onChange}
          login={this.signIn}
          error={this.state.errorMsg}
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
    