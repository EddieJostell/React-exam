import React, { Component } from 'react';

/*Navbar component that has buttons that show Register form and Login form
and a sign in with google button if your not logged in.
If you are logged in you can only see the sign out button.
*/
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
            <div className="col-md-9 page-title ml-auto">
           {!userState && <h2>Anime Haven</h2> }
            {userState && <h2>Welcome to Anime Haven!  </h2> }
            </div>
            
            <div className="col-md-3 react-logo mr-auto">
            
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
                   
                      { !userState && <input 
                        onClick={this.props.google} 
                        type="button" 
                        value="Sign in with Google" 
                        className="btn btn-link buttons"/> }

                         
                    {userState &&  <input
                        className="btn btn-link buttons" 
                        type="button" 
                        value="Sign Out" onClick={this.props.signOut } /> } 
                        {userState && <h4> {userState.email} </h4>}
                        </div> 
                        </div> //END OF ROW
                      
                    );
                }
            }
            
            export default Navbar;