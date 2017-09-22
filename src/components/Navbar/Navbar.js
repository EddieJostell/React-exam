import React, { Component } from 'react';


class Navbar extends Component {
    state = { 
        user: '',
        username: ''
    }
    
    
    
    render() {
        
        const userState = this.props.user;
        const userName = this.props.username;
        
        return (
            <div className="row">
            <div className="col-md-6 page-title">
           {!userState && <h2>Anime Haven</h2> }
            {userState && <h2>Welcome to Anime Haven! {userName}  </h2> }
            </div>
            
            <div className="col-md-6 react-logo">
            
            { !userState && <input 
                name="logBtn"
                className="btn btn-link buttons" 
                type="button" 
                value="Register" 
                onClick={this.props.regBtn}
                /> }
                { !userState &&  <input 
                    className="btn btn-link buttons" 
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
                        className="btn btn-link buttons"/> }
                        </div> 
                        </div> //END OF ROW
                    );
                }
            }
            
            export default Navbar;