import React, { Component} from 'react';

function ListHolder(props) {
  const submit = e => {
    e.preventDefault();
    props.onSubmit(props.id);
  }
  return (
/*   <div className="media media1 col-md-6">
    <img className="d-flex mr-3 pt-15 boxshadow" src={props.img} alt="../../img/anime.jpg" />
    <div className="media-body">
    <h5 className="mt-0 boxshadow">Title: {props.title}</h5>
    <p className="boxshadow"> Total Episodes:  {props.episodes} </p>
    <p className="boxshadow"> Type:  {props.type} </p>
    <p className="boxshadow"> {props.status} </p>
    <p className="boxshadow"> Genres: {props.genres.join(",")} </p>
    <p className="boxshadow"> Average Score: {props.score} </p>
    </div>
    </div>  
    
    <div class="card">
  <img class="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">
      Some quick example text to build on the card title
      and make up the bulk of the card's content.
    </p>
    <a href="#!" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
     
    

    <div className="media media1 col-md-6 col-sm-8 col-xs-12">
      <div className="row">
        <div className="leftCard col-md-4 col-sm-12 col-xs-12">
    <img className="d-flex mr-3 pt-15 " src={props.img} alt="../../img/anime.jpg" />
    </div>
    <div className="rightCard col-md-8 ">
    <div className="media-body">
    <h5 className="mt-0 ">Title: {props.title}</h5>
    
    <p className=""> Total Episodes:  {props.episodes} </p>
    <p className=""> Type:  {props.type} </p>
    <p className=""> {props.status} </p>
    <p className=""> Genres: {props.genres.join(",")} </p>
    <p className=""> Average Score: {props.score} </p>

    <form onSubmit={submit} className="form-group">
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
      <p> Comments goes here with help of a component </p>
      <input 
    className="btn btn-danger"
    onClick={props.delComment} 
     type="button"
      value="Delete"  
      />
      </div>

    </div>
    </div>
    </div>
    </div>  
  );
}

export default ListHolder; 


/* class ListHolder extends Component {

state = {
  commentVal: ''
}

submit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.id);
  }

  render() {
  return (

    <div className="media media1 col-md-6 col-sm-8 col-xs-12">
      <div className="row">
        <div className="leftCard col-md-4 col-sm-12 col-xs-12">
    <img className="d-flex mr-3 pt-15 " src={this.props.img} alt="../../img/anime.jpg" />
    </div>
    <div className="rightCard col-md-8 ">
    <div className="media-body">
    <h5 className="mt-0 ">Title: {this.props.title}</h5>
    
    <p className=""> Total Episodes:  {this.props.episodes} </p>
    <p className=""> Type:  {this.props.type} </p>
    <p className=""> {this.props.status} </p>
    <p className=""> Genres: {this.props.genres.join(",")} </p>
    <p className=""> Average Score: {this.props.score} </p>

    <form onSubmit={this.submit} className="form-group">
    <textarea
    className="textarea"
    onChange={this.props.onChange}
    type="text" 
    placeholder="Comment" 
    name="commentVal"
    rows="3"
    value={this.props.commentVal}
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
      <p> Comments goes here with help of a component </p>
      <input 
    className="btn btn-danger"
    onClick={this.props.delComment} 
     type="button"
      value="Delete"  
      />
      </div>

    </div>
    </div>
    </div>
    </div>  
  );
}

}
export default ListHolder;
 */
