import React, { Component } from 'react';


class Navbar extends Component {
    state = { 
        user: '',
        isVisible: false
    }
    
    
    
    render() {
        
        const userState = this.props.user;
        
        return (
            <div className="row">
            <div className="col-md-6 page-title">
            <h2>Welcome to AnimeOnline! {this.props.user.email} </h2>
            </div>
            
            <div className="col-md-6 react-logo">
            
            { !userState && <input 
                name="logBtn"
                className="btn btn-outline-primary" 
                type="button" 
                value="Register" 
                onClick={this.props.regBtn}
                /> }
                { !userState &&  <input 
                    className="btn btn-outline-success" 
                    type="button" 
                    value="Login"
                    name="regBtn"
                    onClick={this.props.logBtn}
                    /> }
                    
                    {userState && <input
                        className="btn btn-danger" 
                        type="button" 
                        value="Sign out" onClick={this.props.signOut } 
                        
                        /> }

                      { !userState && <input 
                        onClick={this.props.google} 
                        type="button" 
                        value="Sign in with Google" 
                        className="btn btn-light"/> }
                        </div> 
                        </div> //END OF ROW
                    );
                }
            }
            
            export default Navbar;