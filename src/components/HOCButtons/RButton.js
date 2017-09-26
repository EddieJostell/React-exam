import React from 'react';

function RButton(props) {

        const className = props.primary ? 'btn btn-primary' : 'btn';
    return(
        <button className={ className } onClick={props.onClick}> 
            {props.title}
            </button>
    )
}

export default RButton;