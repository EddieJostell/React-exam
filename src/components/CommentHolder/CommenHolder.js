import React from 'react';


function CommentHolder(props) {
   

    for( let comment in props.comments) {
        
        let wow = props.comments[comment].aniID; 
        
        if(wow = props.id) {
            var pinnedComment = [];
            pinnedComment.push(props.comments[comment]);
            console.log(pinnedComment);

            
        } 
    } 
    
    const newComm = pinnedComment.map(key => <div key={key}> <p> {console.log(key.text)} </p> <p> {console.log(key.username)} </p>  
    
       </div>)
 
    
    return(
        <section>
        
     
        {newComm}
        {/* 
            <div> {props.comments ? .map(key => <section key={key}>  <p >  {props.comments[key].text} </p>  <p>Made by: {props.comments[key].username} </p>
                
                
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
        } </div> } */}
        </section>
    )
}

export default CommentHolder;