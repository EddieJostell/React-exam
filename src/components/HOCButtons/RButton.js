import React from 'react';

function RButton(props) {

       /*  const className = props.primary ? 'btn btn-primary' : 'btn'; */
    return(
        <button className={`btn btn-${props.className}`} name="primary" onClick={props.onClick}> 
            {props.title}
            </button>
    )
}

export default RButton;