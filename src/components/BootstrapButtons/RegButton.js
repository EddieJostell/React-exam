import React from 'react';
import RButton from '../HOCButtons/RButton.js';

function RegButton(props) {
console.log(props);
    return(
        <RButton {...props} className="primary" />
    )
}

export default RegButton;