import React from 'react';
import { useParams } from 'react-router-dom'
import './comments.css';

export function Comments() {
    const { id } = useParams()

    const images = [
        { id: 1, url: "../Photos/Sunsets/sunset_ecuador.jpg", title: "Sunset in Ecuador"},
        { id: 2, url: "../Photos/Sunsets/sunset_norway.jpg", title: "Sunset in Norway"},
        { id: 3, url: "../Photos/Sunsets/sunset_norway2.jpg", title: "Sunset in Norway 2"},
        { id: 4, url: "../Photos/Sunsets/sunset_utah.jpg", title: "Sunset in Utah"},
        { id: 5, url: "../Photos/Sunsets/sunset2.jpg", title: "Sunset in Texas"},
        { id: 6, url: "../Photos/Animals/Bearded_dragon.jpg", title: "Breaded Dragon"},
        { id: 7, url: "../Photos/Animals/Cougar.jpg", title: "Cougar"},
        { id: 8, url: "../Photos/Animals/Dolphin.jpg", title: "Dolphin"},
        { id: 9, url: "../Photos/Animals/Giraffe.jpg", title: "Giraffe"},
        { id: 10, url: "../Photos/Animals/Gorilla.jpg", title: "Gorilla"},
    ];

    const image = images.find(img => img.id.toString() === id)

  return (
    <main>
        <div className="user">User: 
            <span className = "usersName">TestUser</span>
        </div>
        <h2>Add comments for this picture below</h2>
        {image ? (
            <img className="img" src={image.url} alt={image.title} />
        ) : (
            <p style={{textAlign: 'center'}}>You will need to go to the Pictures page to select a picture</p>
        )}
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