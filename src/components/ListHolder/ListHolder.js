import React from 'react';
import CommentHolder from '../CommentHolder/CommenHolder.js';

function ListHolder(props) {

  const submit = e => {
    e.preventDefault();
    props.onSubmit(props.id);
  }

  return (

    <div className="col-md-3">
    <div className="card showAnime">
    <img className="card-img-top pt-15 img-responsive" src={props.img} alt="../../img/anime.jpg" />
    <div className="card-body">
    <h4 className="card-title">Title: {props.title}</h4>
    <p className="card-text"> Total Episodes: {props.episodes} </p>
    <p className="card-text"> Type: {props.type} </p>
    <p className="card-text"> {props.status} </p>
    <p className="card-text"> Genres: {props.genres.join(",")} </p>
    <p className="card-text"> Average Score: {props.score} </p>

    <form onSubmit={submit} className="form-group centerForm">
    <textarea
    className="textarea"
    onChange={props.onChange}
    type="text" 
    placeholder="Comment" 
    name="commentVal"
    rows="3"
    value={props.commentVal}
    />
    <div className="form-group">
    <input 
    className="btn btn-primary"
    type="submit"
    value="Comment"
    />
    </div>
    </form>
    
    <div>
    </div>
    <CommentHolder delComment={props.delComment} 
    key={props.dkey} 
    text={props.text} 
    aniID={props.aniID} 
    username={props.username} 
    id={props.uid} 
    comments={props.comments} 
    />  
    </div>
    </div> 
    </div>

  );
}

export default ListHolder; 



