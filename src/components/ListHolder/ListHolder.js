import React from 'react';

function ListHolder(props) {
 
        return (
            <div className="media">
            <img className="d-flex mr-3" src={props.img} />
            <div className="media-body">
              <h5 className="mt-0">Title: {props.title}</h5>
             <p> Total Episodes:  {props.episodes} </p>
             <p> {props.status} </p>
             <p> Genres: {props.genres} </p>
            </div>
          </div>
        );
    }

export default ListHolder;