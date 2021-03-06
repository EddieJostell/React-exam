import React, { Component } from 'react';
class LoginForm extends Component {
    
//Login form with input fields and buttons to login on the page if you allready have an account.
//Click on cancel to remove the form.

    state = {
        error: false
    }
    
    render() {
        
        
        const hasError = this.state.error ? 'has-danger' : ''; 
        
        
        return (
            
           
            <div style={{maxWidth: "50%", margin: "5rem auto"}}>
            <form onChange={this.props.onChange}>
            <div className={`form-group ${hasError}`}>
            <label htmlFor="email">
            E-mail
            </label>
            <input 
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter E-mail"
            onChange={this.props.onChange}
            value={this.props.email}
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
                name="password"
                placeholder="Password"
                onChange={this.props.onChange}
                value={this.props.password}
                />
                
                {this.state.error &&
                    <div className="form-control-feedback">
                    Sorry, that Password's not right. You suck!
                    </div>}
                    </div>
                
                    <input 
                    onClick={this.props.login} 
                    type="submit" 
                    value="Login" 
                    className="btn btn-success"/>
                    <span> </span>

                    <input 
                    onClick={this.props.cancel} 
                    type="button" 
                    value="Cancel" 
                    className="btn btn-outline-danger"/> 
                    </form>
                    </div>
                )
            }
        }
        
        export default LoginForm;