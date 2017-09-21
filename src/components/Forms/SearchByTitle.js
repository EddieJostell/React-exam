import React from 'react';

const SearchByTitle = (props) => {

    return(
        <section className="form-group">
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