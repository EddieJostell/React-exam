import React from 'react';

function ListHolder(props) {
 
        return (
          
            <div className="media col-md-6">
            <img className="d-flex mr-3 pt-15" src={props.img} alt="../../img/anime.jpg" />
            <div className="media-body">
              <h5 className="mt-0 boxshadow">Title: {props.title}</h5>
             <p className="boxshadow"> Total Episodes:  {props.episodes} </p>
             <p className="boxshadow"> Type:  {props.type} </p>
             <p className="boxshadow"> {props.status} </p>
             <p className="boxshadow"> Genres: {props.genres.join(",")} </p>
             <p className="boxshadow"> Average Score: {props.score} </p>
            </div>
          </div>
      
        );
    }

export default ListHolder;