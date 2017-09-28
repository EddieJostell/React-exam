import React from 'react';

//Checkbox that lists all shows.
function ShowAllAnime(props) {

    return(
        <div>
        <input type="checkbox" checked={props.checked}
         className="form-check-input" name="animeInput" onChange={props.onChange} />
         <label className="form-check-label" htmlFor="animeInput"> Show All Anime </label>
         </div>
    )
}

export default ShowAllAnime;