import React, { Component } from 'react';
import firebase from '../../firebase.js';
import ListHolder from '../ListHolder/ListHolder.js';

export default class MainContent extends Component {
    state = { 
        select: '',
        animeList: [],
    }
    
    fetchPostToApi = () => {
        
        let postURL = 
        "https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=eduardoj-lqksr&client_secret=dCd2I1SAbGIHl0dhql82ReB2rN"
        
        fetch(postURL, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        }).then(response => response.json())
        /*  .then(data => console.log(data.access_token)) */
        .then(data => {this.fetchFromApi(data.access_token)})
        .catch(error => console.log(error))
        
    }
    
    fetchFromApi = (data) => {
        
        var URL = `https://anilist.co/api/browse/anime?access_token=${data}`;
        
        fetch(URL)
        .then(response => response.json()) 
        /*  .then(data => console.log(data))  */        
        .then(data => {console.log(data), this.setState({animeList: data}) })
        .catch(error => console.log(error))
        
    }
    
    
    componentDidMount() {
        this.fetchPostToApi();
    }
    
    render() {
        
        const amazeList = this.state.animeList.map( (ani, key) =>
        <ListHolder key={key} 
        title={ani.title_romaji} 
        episodes={ani.total_episodes}
        img={ani.image_url_med} 
        series_type={ani.series_type}
        genres={ani.genres}
        />)
        
        
        return (
            
            <div className="row">
            <div className="rightContent col-md-3">
            
            <form>
            
            <section className="form-group">
            <label htmlFor="title">
            Search by title
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
            
            </form>
            </div>
            <div className="leftContent col-md-9">
            <h1> ANIME GOES HERE!! </h1>
            {amazeList}
            </div>
            </div> //END OF ROW
        );
    }
}