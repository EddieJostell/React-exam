import React from 'react';

//Component to render out comments made on shows.
//Looping through the firebase list of comments to get the information I want to render.

function CommentHolder(props) {
      var pinnedComment = [];
        for( let comment in props.comments) {
            for(let com in props.comments[comment].value){
                let wow =  props.comments[comment].value[com].aniID; 
                if(wow === props.id) {
                    pinnedComment.push(props.comments[comment].value[com]);
                }  
           
                let key = props.comments[comment].value[com];
             
        }
        
    } 
  
    const newComm = pinnedComment.map(key => <div> <p> {key.text} </p> <p> {key.email} </p> 
    
     {/*     <input 
        className="btn btn-outline-light"
        onClick={props.delComment} 
        type="button"
        value="Delete"
      pinnedComment={props.pinnedComment}
        />  */}
    
        </div>)

    
        
        
        return(
            <section>
            {newComm}
            </section>
        )
    }
    
    export default CommentHolder;
