import React, { Component } from 'react';


export default class WelcomePage extends Component {
    state = {  }
    
    render() {
        return (
            <div className="welcome">
            <h1> WELCOME TO ANIME HAVEN! </h1>
            <div className="text">
            <h3> Welcome anime lover! on this page you can get inspiration for what you want to watch for your next anime tvshow, movie or OVA.
             Just create a account or sign in with google to see all the anime! 
             If you enjoyed a show or if maybe it wasnt your cup of tea you can drop a comment on said show to let other users know what you think!
             </h3>
             </div>
            </div>        
        );
    }
}