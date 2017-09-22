import React, { Component } from 'react';
import firebase from '../../firebase.js';
import SearchByTitle from '../Forms/SearchByTitle';
import SearchByType from '../Forms/SearchByType';
import ListHolder from '../ListHolder/ListHolder.js';




class MainContent extends Component {
    state = { 
        user: '',
        select: '',
        animeList: [],
        tInput: '',
        animeL: [],
        sortGenre: [],
        anime: [],
        selectType: '',
        listByType: [],
        commentVal: ''
    }
    
    componentDidMount() {
        /* this.childAdded(); */
        /* this.childChanged();
        this.childRemoved(); */
        this.fetchPostToApi(); 
    }
    
    
    childAdded = () => {
        
        firebase.database().ref(`comments`).on("child_added", (snapshot) => {
            console.log("Listner knows something is added");
            const comments = [...this.state.comments];
            const comment = {
                key: snapshot.key,
                value: snapshot.val()
            }
            comments.push(comment);
            this.setState({comments: comments}) 
        })
    }
    
    childChanged = () => {
        firebase.database().ref(`comments`).on("child_changed", (snapshot) => {
            console.log("Listner knows its Updated");
            //Copy state
            const comments = [...this.state.comments];
            //Loop the object
            const updatedComments = comments.map(item => {
                //If object is found
                if(item.key === snapshot.key){
                    return Object.assign({}, item, {value : snapshot.val()})
                }
                else {
                    return item;
                }
            })
            this.setState({comments: updatedComments}) 
        })
    }
    
    
    childRemoved = () => {
        firebase.database().ref(`comments`).on("child_removed", (snapshot) => {
            console.log("Listner knows something is removed!")
            const comments = [...this.state.comments];
            const filteredComments = comments.filter((item) => { return item.key !== snapshot.key})
            this.setState({comments: filteredComments}) 
        })
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
            console.log("Search or title");
            const find = this.state.animeList.filter(function(anim) {
                
                return anim.title_romaji.toUpperCase() === e.target.value.toUpperCase();
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
    
    searchByShowType = (e) => {
        this.setState({ [e.target.name] : e.target.value})
        console.log("SHOW BY TYPE");
        
        const showByType = this.state.animeList.filter(function(sort) {
            return sort.type === e.target.value;
        });
        this.setState({listByType : showByType});
        
        
        /*  firebase.database()
        .ref(`anime`)
        .orderByChild('type')
        .equalTo('TV')
        .on('child_added', (snapshot) =>{
            const newType = [...this.state.anime];
            newType.push(snapshot.val());
            this.setState({anime : newType});
        })*/
    }
    
    onChange = (e) => {
        this.setState[{ [e.target.name] : e.target.value }]
    }
    
    
    addComment = (id) => {
        const user = firebase.auth().currentUser;
        
        
        console.log('button works anyhow');
        console.log(id);
        console.log("commentVal should go here -> " + " " + this.state.commentVal);
        const objectToPush = {
            name: this.state.commentVal,
            uid: user.uid,
            aniID: id
        }
        
        firebase.database().ref(`comments`).push(objectToPush)
        .then(() => {console.log("Pushed to Firebase/comments")})
        .catch(error => {console.log('messed up', error)})
    }
    
    /*  showTV = () => {
        
        firebase.database()
        .ref(`anime`)
        .orderByChild('type')
        .equalTo('TV')
        .on('child_added', (snapshot) =>{
            const newType = [...this.state.anime];
            newType.push(snapshot.val());
            this.setState({anime : newType});
        })
    } */
    
    
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
        onSubmit={this.addComment}
        />);
        
        const sortedAni = this.state.animeL.map( (a, key) => 
        <ListHolder key={key} 
        title={a.title_romaji} 
        episodes={a.total_episodes}
        img={a.image_url_sml} 
        series_type={a.series_type}
        genres={a.genres}
        score={a.average_score}
        type={a.type}
        onSubmit={this.addComment}
        />) 
        
        const genres = this.state.sortGenre.map( (cow, key) =>
        <ListHolder key={key} 
        title={cow.title_romaji} 
        episodes={cow.total_episodes}
        img={cow.image_url_lge} 
        series_type={cow.series_type}
        genres={cow.genres}
        score={cow.average_score}
        type={cow.type}
        id={cow.id}
        onSubmit={this.addComment}
        commentVal={this.props.commentVal}
        />)
        
        const mediaType = this.state.listByType.map( (t, key) => 
        <ListHolder key={key} 
        title={t.title_romaji} 
        episodes={t.total_episodes}
        img={t.image_url_med} 
        series_type={t.series_type}
        genres={t.genres}
        score={t.average_score}
        type={t.type}
        onSubmit={this.addComment}
        
        />)
        
        
        
        return (
            <div className="row">
            <div className="rightContent col-md-2">
            <br>
            </br>
            <SearchByTitle
            find={this.findMovieByInput} 
            enter={this.showMovieByTitle}/>
            
            <SearchByType
            onGenre={this.onGenre} 
            onType={this.searchByShowType}
            />
            </div>
            
            <div className="leftContent col-md-10">
            <h1> ANIME GOES HERE!! </h1>
            {genres}
            <div className="row">
            <div className="1">
            {/*  {amazeList} */}
            {mediaType}
            </div>
            <div className="2">
            {sortedAni}
            </div>
            <div className="3">
            
            </div>
            </div> {/*END OF INNER ROW*/}
            </div>
            </div> //END OF ROW
        );
    }
}

export default MainContent;