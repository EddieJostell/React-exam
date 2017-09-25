import React from 'react';

 function soBtn(props) {
            const className = props.danger ? 'btn btn-link' : 'btn';
        return (
            <button className={ className } name="danger" onClick={props.signOut}>
                  {props.title}
                </button>
        );
    }

    export default soBtn;