import React from 'react';
import RButton from '../HOCButtons/RButton.js';

function RegButton(props) {
console.log(props);
    return(
        <RButton {...props} classPrimary="primary" />
    )
}

export default RegButton;