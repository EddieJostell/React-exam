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
    this.setState({logVisible: !this.state.logVisible,
      regVisible: false})
    }
    
    regVisible = () => {
      console.log("RegForm is visible!");
      this.setState({regVisible: !this.state.regVisible,
        logVisible: false})
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
      
      fetchPostToApi = () => {
        
        let postURL = 
        "https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=eduardoj-lqksr&client_secret=dCd2I1SAbGIHl0dhql82ReB2rN"
        
        fetch(postURL, {
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        }).then(response => response.json())
        /*  .then(data => console.log(data.access_token)) */
        .then(data => {this.fetchFromApi(data.access_token)})
        .catch(error => console.log(error))
        
        
      }
      
      fetchFromApi = (data) => {

        var URL = `https://anilist.co/api/browse/anime?access_token=${data}`;
        
        fetch(URL)
        .then(response => response.json()) 
        /*  .then(data => console.log(data))  */        
        .then(data => {console.log(data), this.setState({animeList: data}) })
        .catch(error => console.log(error))
        
      }
      
      componentDidMount() {
        this.onAuthChanged();
        this.getRedirectResult();
        this.fetchPostToApi();
      }
      
      render() {
        
        const anime = this.state.animeList.map( (ani, key) => 
        <div key={key}>
        
        <img src={ani.image_url_lge} />
        <p> {ani.id} </p>
        <p> {ani.title_romaji} || {ani.title_english} </p> 
        <p> {ani.series_type} </p>
        <p> {ani.airing_status} </p>
        <p> {ani.genres} </p>
        </div>)
        
        return (
          <div className="App">
          <div className="App-header">
          <Navbar 
          user={this.state.user} 
          signOut={this.signOut} 
          logBtn={this.logVisible} 
          regBtn={this.regVisible}
          google={this.signInWithGoogle}
          />
          
          </div> {/* END OF App-Header*/}
          <Container>
          
          { ( !this.state.user && this.state.regVisible) ? <RegForm 
            regpassword={this.state.regpassword}
            regemail={this.state.regemail}
            onChange={this.onChange}
            register={this.onSubmit}
            error={this.state.error}
            /> :null }
            
            { (!this.state.user && this.state.logVisible) ? <LoginForm 
              password={this.state.password}
              email={this.state.email}
              onChange={this.onChange}
              login={this.signIn}
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
        