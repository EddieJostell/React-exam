import React, { Component } from 'react';
import firebase from './firebase.js';
import Container from './components/Container/Container.js';
import LoginForm from './components/Forms/LoginForm.js';
import RegForm from './components/Forms/RegForm.js';
import Navbar from './components/Navbar/Navbar.js';
import './sass/App.css';

class App extends Component {
  
  
  state = {
    animeList: [],
    regemail: '',
    regpassword: '',
    email: '',
    password: '',
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
    this.setState({logVisible: !this.state.logVisible})
  }

  regVisible = () => {
    console.log("RegForm is visible!");
    this.setState({regVisible: !this.state.regVisible})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    firebase.auth()
    .createUserWithEmailAndPassword(this.state.regemail, this.state.regpassword)
    .catch(error => alert(error.message), error => console.log(error))
    .then((user) => {
      firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({ email: user.email, uid: user.uid })
    })
    .then((user) => {
      alert("Welcome to HELL!");
    })
    /* .then(user =>  console.log("Created user", user)) */
    
    
  }
  
  onAuthChanged = () => {
    firebase.auth()
    .onAuthStateChanged((user) => {
      if(user) {
        
        const newUser = {
          email: user.email,
          photoUrl: user.photoURL,
          displayName: user.displayName
        }
        
        this.setState({user: newUser});
        /*   this.setState({user: user}); */
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
  

  
  
  signInWithGoogle = () => {
    console.log("HEJ");
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
  
  fetchFromApi = () => {
    fetch("https://ghibliapi.herokuapp.com/films")
    .then(response => response.json())           //Get JSON, implicit return
    .then(data => {this.setState({animeList: data});
  })
  .catch(error => console.log(error))
}

componentDidMount() {
  this.onAuthChanged();
  this.getRedirectResult();
  this.fetchFromApi();
}


render() {
  
  const anime = this.state.animeList.map( (ani, key) => 
  <div key={key}>

   <p> {ani.title} </p>
   <p> {ani.release_date} </p>  
     </div>)
  
  return (
    <div className="App">
    <div className="App-header">
    <Navbar 
    user={this.state.user} 
    signOut={this.signOut} 
    logBtn={this.logVisible} 
    regBtn={this.regVisible}
    />

    </div> {/* END OF App-Header*/}
    <Container>

    { (this.state.regVisible && !this.state.logVisible) ? <RegForm 
      regpassword={this.state.regpassword}
      regemail={this.state.regemail}
      onChange={this.onChange}
      register={this.onSubmit}
      error={this.state.error}
      /> :null }

      { (this.state.logVisible && !this.state.regVisible) ? <LoginForm 
      password={this.state.password}
      email={this.state.email}
      onChange={this.onChange}
      login={this.signIn}
      google={this.signInWithGoogle}
      error={this.state.error}
      /> : null }
      
      
      
      {this.state.user &&  <div className="form-group">
     <p> { anime } </p> 
      </div> }
      </Container>
      </div>
    );
  }
}

export default App;
