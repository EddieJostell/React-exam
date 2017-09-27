import React, { Component } from 'react';
import CancelButton from '../BootstrapButtons/CancelButton.js';
import RegButton from '../BootstrapButtons/RegButton.js';

class LoginForm extends Component {
    
    state = {
        error: false,
        errorMsg: ''
    }
    
    render() {
        
        
        const hasError = this.state.error ? 'has-danger' : ''; 
        
        
        return (
            
           
            <div style={{maxWidth: "50%", margin: "5rem auto"}}>
            <form onChange={this.props.onChange}>

            <div className={`form-group ${hasError}`}>
            <label htmlFor="username">
            Username
            </label>
            <input 
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter Username"
            onChange={this.props.onChange}
            value={this.props.username}
            />
            
            { this.state.error && 
                <div className="form-control-feedback">
                Sorry, Wrong username you suck!
                </div>}
                
                </div>

            <div className={`form-group ${hasError}`}>
            <label htmlFor="email">
            E-mail
            </label>
            <input 
            type="text"
            className="form-control"
            name="regemail"
            placeholder="Enter E-mail"
            onChange={this.props.onChange}
            value={this.props.regemail}
            />
            
            { this.state.error && 
                <div className="form-control-feedback">
                Sorry, Wrong username you suck!
                </div>}
                
                </div>
                
                <div className={`form-group ${hasError}`}>
                <label htmlFor="password">
                Password
                </label>
                <input 
                type="password" 
                className="form-control" 
                name="regpassword"
                placeholder="Password"
                onChange={this.props.onChange}
                value={this.props.regpassword}
                />
                {this.state.errorMsg && <p> {this.state.errorMsg} </p>}
                {this.state.error &&
                    <div className="form-control-feedback">
                    Sorry, that Password's not right. You suck!
                    </div>}
                    </div>
                  {/*   <input onClick={this.props.register} 
                    type="submit" value="Register" 
                    className="btn btn-primary"/> */}

                    <RegButton  title="Register" onClick={this.props.register} />
                    <span> </span>
                  {/*   <input onClick={this.props.cancel} 
                    type="button" value="Cancel" 
                    className="btn btn-outline-danger"/> */}

                    <CancelButton title="Cancel" onClick={this.props.cancel} />
                    </form>
                    </div>
                )
            }
        }
        
        export default LoginForm;