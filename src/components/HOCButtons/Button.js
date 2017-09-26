import React from 'react';

 function soFUCKYOUButton(props) {
 
         
           const className = props.danger ? 'btn btn-danger' : 'btn'; 
        return (
            <button className={ className } onClick={props.onClick}>
                  {props.title}
                </button>
        )
    }

    export default soFUCKYOUButton;