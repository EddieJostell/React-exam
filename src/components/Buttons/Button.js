import React from 'react';

 function soFUCKYOUButton(props) {
 
           
           const className = props.link ? 'btn btn-link' : 'btn'; 
        return (
            <button className={ className } name="link"  onClick={props.signOut}>
                  {props.title}
                </button>
        )
    }

    export default soFUCKYOUButton;