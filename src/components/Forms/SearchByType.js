import React from 'react';

function SearchByType (props) {
   
        return (
         <div>
            <section className="form-group flexForms">
            <label htmlFor="genre">
            <h4> Search by Genre </h4>
            </label>
            <select 
            onChange={props.onGenre}
            name="select"
            className="form-control"
            
            >
            <option value="Genres">= Genres = </option>
            <option value="Adventure">Adventure</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>            
            <option value="Drama">Drama</option>
            <option value="Ecchi">Ecchi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Mecha">Mecha</option>
            <option value="Music">Music</option>
            <option value="Mystery">Mystery</option>
            <option value="Psychological">Psychological</option>
            <option value="Romance">Romance</option>
            <option value="Sports">Sports</option>
            <option value="Supernatural">Supernatural</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Slice of Life">Slice of Life</option>
            <option value="Thriller">Thriller</option>
            </select>
            </section>
            

            <section className="form-group flexForms">
            <label htmlFor="selectType">
            <h4 className="show"> Search by Type </h4>
            </label>
            <select 
            onChange={props.onType}
            name="selectType"
            className="form-control"
            
            >
            <option value="Type of Show">= Type of Show = </option>
            <option value="TV">TV-Show</option>
            <option value="Movie">Movie</option>
            <option value="OVA">OVA</option>
            </select>
            </section>          
           </div>
        );
    }


export default SearchByType;