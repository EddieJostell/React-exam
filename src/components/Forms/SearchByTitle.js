import React from 'react';
import ShowAllAnime from '../ShowAllAnime/ShowAllAnime.js';

//form that lets you search for a specific title and lets you list all shows after filtering.

const SearchByTitle = (props) => {

    return(
        <section className="form-group flexForms">
       {/*  <input name="showAllbtn" value="Show All Shows" type="button" onClick={props.showAll} className="btn btn-link buttons" /> */}
       <label> Use the checkbox to list all shows after filtering</label>
       <ShowAllAnime onChange={props.showAnime}/>
        <label htmlFor="tInput">
        <h4> Search by Title </h4>
        </label>
        <input type="text" 
        className="form-control" 
        name="tInput" 
        onChange={props.find}
        onKeyDown={props.enter}
        placeholder="Press Enter to Search" />
        </section> 
    )
}

export default SearchByTitle;