import React from 'react';

// HOC button that determines the bootstrap class and title on the cancel button for the Register form
//CancelButton is in BootstrapButtons folder.

 function soFUCKYOUButton(props) {
 
         
           /* const className = props.danger ? 'btn btn-danger' : 'btn';  */
        return (
            <button className={`btn btn-${props.className}`} 
            name="danger" 
            onClick={props.onClick}
            >
                  {props.title}
                </button>
        )
    }

    export default soFUCKYOUButton;