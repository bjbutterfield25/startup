import React from 'react';
import './comments.css';

export function Comments() {
  return (
    <main>
        <div className="user">User: 
            <span className = "usersName">TestUser</span>
        </div>
        <h2>Add comments for this picture below</h2>
        <img className="img" src="Photos\Sunsets\sunset_ecuador.jpg"/>
        <div className = "commentsDiv">
            <p className = "comments">Impressive -Jim</p>
            <p className = "comments">This is a beautiful picture -Anne</p>
            <p className = "comments">So cool -Jack</p>
        </div>
        <div className="mb-3">
            <form method="get" action="comments.html">
                <label for="textarea">Comments: </label>
                <textarea className="form-control" id="textarea" name="comment" rows="3"></textarea>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
        </div>
    </main>
  );
}