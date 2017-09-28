import React from 'react';
import Button from '../HOCButtons/Button.js';

function CancelButton(props) {
   return(
    <Button {...props} className="danger" /> 
   )
}

export default CancelButton;