import React from 'react';

//HOC button that determin the bootstrap class and title for the register button on the register form.
////RegisterButton is in BootstrapButtons folder.
function RButton(props) {

       /*  const className = props.primary ? 'btn btn-primary' : 'btn'; */
    return(
        <button className={`btn btn-${props.className}`} name="primary" onClick={props.onClick}> 
            {props.title}
            </button>
    )
}

export default RButton;