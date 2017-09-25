import React from 'react';

function CommentHolder(props) {
    return(
      <section>
        <p>{props.aniID} </p>
        <p>{props.text} </p>
        <p> {props.id} </p>
        <p> {props.username}</p>
        </section>
    )
}

export default CommentHolder;