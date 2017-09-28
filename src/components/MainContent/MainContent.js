import React, { Component } from 'react';
import firebase from '../../firebase.js';
import SearchByTitle from '../Forms/SearchByTitle';
import SearchByType from '../Forms/SearchByType';
import ListHolder from '../ListHolder/ListHolder.js';

//MainContent component that handles all the API information
//And all components that are visible when you are logged in as a user.
//Add and display comments
//Inputfields for the filtering of the information.

class MainContent extends Component {
    state = { 
        user: '',
        select: '',
        animeList: [],
        tInput: '',
        selectType: '',
        commentVal: '',
        comments: {},
        delComment: '',
        showList: [],
        showAllbtn: '',
        bigList: '',
        animeInput: '',
        showID: []
    }
    
    componentDidMount() {
        this.childAdded();
        this.childChanged();
        this.childRemoved(); 
        this.fetchPostToApi(); 
         
    }
    
    
    childAdded = () => {
        
        firebase.database().ref(`comments`).on("child_added", (snapshot) => {
            /* console.log("Listner knows something is added"); */
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
           /*  console.log("Listner knows its Updated"); */
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
           /*  console.log("Listner knows something is removed!") */
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
        .then(data => { 
        
       /*  console.log(data); */
        this.setState({animeList: data, showList : data});
        })

        .catch(error => console.log(error))
        
    }
    
    findMovieByInput = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }
    
    showMovieByTitle = (e) => {
        if (e.key === "Enter") {
            /* console.log("Search or title"); */
    
            const find = this.state.animeList.filter(function(anim) {
                
                return anim.title_romaji.toUpperCase().startsWith(e.target.value.toUpperCase());
            }); 
             this.setState({ showList : find})
        }
    } 
    
    onGenre = (e) => {
        this.setState({[e.target.name] : e.target.value})
        
        const filtByGenre = this.state.animeList.filter(function(filter) {
            return filter.genres.includes(e.target.value);
        });
        this.setState({showList : filtByGenre}); 
        
        
    }
    
    searchByShowType = (e) => {
        this.setState({ [e.target.name] : e.target.value})
       /*  console.log("SHOW BY TYPE"); */
        
        const showByType = this.state.animeList.filter(function(sort) {
            return sort.type === e.target.value;
        });
        this.setState({showList: showByType});
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
       
    }


    showAnime = (e) => {
        this.setState({animeInput : e.target.checked})
        /* console.log("SHOW ALL ANIME") */
    }

    findShowID = () => {

    }

    addComment = (id) => {
        const user = firebase.auth().currentUser;
        const objectToPush = {
            text: this.state.commentVal,
            uid: user.uid,
            aniID: id,
            email: user.email,
            username: user.displayName
        }
        
        firebase.database().ref(`comments/${id}`).push(objectToPush)
        .then(() => {console.log("Pushed to Firebase/comments")})
        .catch(error => {console.log('messed up', error)})
        
    }

/*     
    deleteComment = (key) => {
        
          firebase.database().ref(`comments`).remove()
          .then(() =>{console.log("Removed!")})
          .then(() =>{
            const removed = this.state.comments.filter(item => item.key !== key);
            this.setState({comments: removed});
          })
          .catch(error => {console.log('You messed up', error)})
    }  */
     
    
    
    render() {
        
 
        //WHOLE LIST
        const wholeList  = this.state.showList.map( (ani, key) => 
        <ListHolder key={key} 
        title={ani.title_romaji} 
        episodes={ani.total_episodes}
        img={ani.image_url_lge} 
        series_type={ani.series_type}
        genres={ani.genres}
        score={ani.average_score}
        type={ani.type}
        onSubmit={this.addComment}
        onChange={this.onChange}
        commentVal={this.props.commentVal}
        id={ani.id}
        comments={this.state.comments}
        delComment={this.deleteComment}
        />)

        const aniList  = this.state.animeList.map( (ani, key) => 
        <ListHolder key={key} 
        title={ani.title_romaji} 
        episodes={ani.total_episodes}
        img={ani.image_url_lge} 
        series_type={ani.series_type}
        genres={ani.genres}
        score={ani.average_score}
        type={ani.type}
        onSubmit={this.addComment}
        onChange={this.onChange}
        commentVal={this.props.commentVal}
        id={ani.id}
        comments={this.state.comments}
        delComment={this.deleteComment}
        />)
        
     

        return (
            <div className="row">
            <div className="leftContent col-md-2">
            <br>
            </br>
            <SearchByTitle
            showAnime={this.showAnime}
            find={this.findMovieByInput} 
            enter={this.showMovieByTitle}/>
            
            <SearchByType
            onGenre={this.onGenre} 
            onType={this.searchByShowType}
            />
            </div>
            
            <div className="rightContent col-md-10">
            {wholeList}
            {this.state.animeInput ? aniList : wholeList} 
            {/* {aniList} */}
            </div>
            </div> //END OF ROW
        );
    }
}

export default MainContent;