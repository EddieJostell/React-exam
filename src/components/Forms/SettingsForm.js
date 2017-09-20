import React, { Component } from 'react';

export default class SettingsForm extends Component {
    state = { 
        
     }
    
    render() {
        return (
            <form>
            
            <section className="form-group">
            <label htmlFor="title">
            Search by Title
            </label>
            <input type="text" className="form-control" name="title" placeholder="Press Enter to Search" />
            </section> 
            
            <section className="form-group">
            <label htmlFor="genre">
            Search by Genre
            </label>
            <select 
            name="select"
            className="form-control"
            value={this.state.select}
            >
            <option value="Genres">= Genres = </option>
            <option value="Adventure">Adventure</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>            
            <option value="Crime">Crime</option>
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
            
            <section className="form-check">
            <label htmlFor="tv" className="form-check-label">
            <span> </span>
            <input className="form-check-input" type="checkbox" value="tv" />
            TV
            </label>
            <span> </span>
            <label htmlFor="movie" className="form-check-label">
                <span> </span>
            <input className="form-check-input" type="checkbox" value="movie" />
           Movie
            </label>
            </section>
            
            </form>  
        );
    }
}