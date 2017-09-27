import React from 'react';


function CommentHolder(props) {
    /* console.log(props.comments); */

   let comments = props.comments;
    console.log(comments);

   /*  for( let comment in comments) {
       
       let wow = comment[com].aniID;
        if(wow = props.aniID) {
            var pinnedShow = [];
            pinnedShow.push(wow);
            console.log(pinnedShow[0]);
        }
    } 
  */
    /* const renderComments = pinnedShow.map(key => ) */

    return(
        <section>

        

{/* 
        <div> {props.comments ?  .map(key => <section key={key}>  <p >  {props.comments[key].text} </p>  <p>Made by: {props.comments[key].username} </p>
          
    
            <input 
        className="btn btn-outline-danger"
        onClick={props.delComment} 
        type="button"
        value="Delete" 
        />
        </section>
        )
            :
            "No comments yet"
        } </div> */}
        </section>
    )
}

export default CommentHolder;