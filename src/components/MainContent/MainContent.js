import React, { Component } from 'react';
import firebase from '../../firebase.js';
import SettingsForm from '../Forms/SettingsForm.js';
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
        .then(data => {console.log(data), this.setState({animeList: data}), this.postToFirebase(data) })
        .catch(error => console.log(error))
        
    }
    
    postToFirebase = (data) => {
        console.log(data);
      /* firebase.database().ref(`/anime`).push(data); */
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
        score={ani.average_score}
        type={ani.type}
        />);
        
        
        return (
            
            <div className="row">
            <div className="rightContent col-md-3">
            
            <SettingsForm />
            </div>

            <div className="leftContent col-md-9">
            <h1> ANIME GOES HERE!! </h1>
            {amazeList}
            </div>
            </div> //END OF ROW
        );
    }
}