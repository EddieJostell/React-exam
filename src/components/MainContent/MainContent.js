import React, { Component } from 'react';
import firebase from '../../firebase.js';
import SearchByTitle from '../Forms/SearchByTitle';
import SearchByGenre from '../Forms/SearchByGenre';
import ListHolder from '../ListHolder/ListHolder.js';




export default class MainContent extends Component {
    state = { 
        select: '',
        animeList: [],
        tInput: '',
        animeL: [],
        sortGenre: [],
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
        .then(data => {this.fetchFromApi(data.access_token)})
        .catch(error => console.log(error))
        
    }
    
    fetchFromApi = (data) => {
        
        var URL = `https://anilist.co/api/browse/anime?access_token=${data}`;
        
        fetch(URL)
        .then(response => response.json())   
        .then(data => { console.log(data), this.setState({animeList: data})})
        .catch(error => console.log(error))
        
    }
    
    findMovieByInput = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }
    
    showMovieByTitle = (e) => {
        if (e.key === "Enter") {
            console.log("WORKING");
            const find = this.state.animeList.filter(function(anim) {
                
                return anim.title_romaji === e.target.value;
            });
            this.setState({ animeL : find})
        }
    } 
    
    onGenre = (e) => {
        this.setState({[e.target.name] : e.target.value})
        
        const filtByGenre = this.state.animeList.filter(function(filter) {
            return filter.genres.includes(e.target.value);
        });
        this.setState({sortGenre : filtByGenre}); 
        
        
    }
    
    
    
    componentDidMount() {
        
        this.fetchPostToApi(); 
    }
    
    render() {
        console.log(this.state.sortGenre);
        
        const amazeList = this.state.animeList.map( (ani, key) =>
        <ListHolder key={key} 
        title={ani.title_romaji} 
        episodes={ani.total_episodes}
        img={ani.image_url_med} 
        series_type={ani.series_type}
        genres={ani.genres}
        score={ani.average_score}
        type={ani.type}
        />);
        
        const sortedAni = this.state.animeL.map( (a, key) => 
        <ListHolder key={key} 
        title={a.title_romaji} 
        episodes={a.total_episodes}
        img={a.image_url_med} 
        series_type={a.series_type}
        genres={a.genres}
        score={a.average_score}
        type={a.type}
        /> 
    ) 
    
    const genres = this.state.sortGenre.map( (cow, key) =>
    <ListHolder key={key} 
    title={cow.title_romaji} 
    episodes={cow.total_episodes}
    img={cow.image_url_med} 
    series_type={cow.series_type}
    genres={cow.genres}
    score={cow.average_score}
    type={cow.type}
    /> 
)

return (
    
    <div className="row">
    <div className="rightContent col-md-3">
    
    <SearchByTitle
    find={this.findMovieByInput} 
    enter={this.showMovieByTitle}/>
    
    <SearchByGenre
    onGenre={this.onGenre} />
    </div>
    
    <div className="leftContent col-md-9">
    <h1> ANIME GOES HERE!! </h1>
    <div className="row">
    <div className="1">
    {amazeList}
    </div>
    <div className="2">
    {sortedAni}
    </div>
    <div className="3">
    {genres}
    </div>
    </div>
    </div>
    </div> //END OF ROW
);
}
}