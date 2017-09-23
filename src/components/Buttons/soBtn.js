import React, { Component } from 'react';

export default  function soBtn(props) {
            const className = props.danger ? 'btn btn-danger' : 'btn';
        return (
            <button className={ className } name="danger">
                  {props.title}
                </button>
        );
    }
