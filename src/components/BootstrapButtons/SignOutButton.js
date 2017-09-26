import React from 'react';
import Button from '../Buttons/Button.js';

function SignOutButton(props) {
    console.log(props);
   return(
    <Button {...props} className="link" /> 
   )
}

export default SignOutButton;