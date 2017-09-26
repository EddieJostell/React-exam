import React from 'react';


function CommentHolder(props) {
    return(
        <section>
        <p> {props.comments ? 
            Object.keys(props.comments).map(key =><section key={key}> <p>  {props.comments[key].text} </p>  <p>Made by: {props.comments[key].username} </p>
            <input 
        className="btn btn-danger"
        onClick={props.delComment} 
        type="button"
        value="Delete" 
        />
        </section>
        )
            :
            "No comments yet"
        } </p>
        </section>
    )
}

export default CommentHolder;