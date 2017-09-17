import React, { Component } from 'react';
class LoginForm extends Component {
    
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
                    <input onClick={this.props.register} type="submit" value="Register" className="btn btn-primary"/>
                    <input onClick={this.props.login} type="submit" value="Login" className="btn btn-success"/>
                    <input onClick={this.props.google} type="submit" value="Sign in with Google" className="btn btn-outline-primary"/>
                    </form>
                    </div>
                )
            }
        }
        
        export default LoginForm;