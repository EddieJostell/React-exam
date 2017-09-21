import React, { Component } from 'react';
import firebase from '../../firebase.js';

class UserProfile extends Component {

    state = {

    }

    render() {
        return(
            <div style={{maxWidth: "50%", margin: "5rem auto"}}>
            <form onChange={this.props.onChange}>

            <div className={`form-group`}>
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

            <div className={`form-group`}>
            <label htmlFor="chemail">
            E-mail
            </label>
            <input 
            type="text"
            className="form-control"
            name="chemail"
            placeholder="Enter E-mail"
            onChange={this.props.onChange}
            value={this.props.chemail}
            />
            
            { this.state.error && 
                <div className="form-control-feedback">
                Sorry, Wrong username you suck!
                </div>}
                
                </div>
                
                <div className={`form-group`}>
                <label htmlFor="password">
                Password
                </label>
                <input 
                type="password" 
                className="form-control" 
                name="chpassword"
                placeholder="Password"
                onChange={this.props.onChange}
                value={this.props.chpassword}
                />
                
                {this.state.error &&
                    <div className="form-control-feedback">
                    Sorry, Password must be six or longer!
                    </div>}
                    </div>
                    <input onClick={this.props.update} 
                    type="submit" value="update" 
                    className="btn btn-primary"/>
                    <span> </span>
                    <input onClick={this.props.cancelUpdate} 
                    type="button" value="Cancel" 
                    className="btn btn-outline-danger"/>
                    </form>
                    </div>
        )
    }
}

export default UserProfile;