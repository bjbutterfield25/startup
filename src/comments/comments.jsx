import React from 'react';
import { useParams } from 'react-router-dom'
import './comments.css';

export function Comments( {userName} ) {
    const { id } = useParams()
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

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

    React.useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        setComments(savedComments);
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() === "") return;
        const newCommentObj = { userName, text: newComment };
        const updatedComments = [...comments, newCommentObj];
        setComments(updatedComments);
        localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
        setNewComment("");
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
        localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    };


  return (
    <main>
        <div className="user">
            User: <span className = "usersName">{userName}</span>
        </div>
        <h2>Add comments for this picture below</h2>
        {image ? (
            <img className="img" src={image.url} alt={image.title} />
        ) : (
            <p style={{textAlign: 'center'}}>You will need to go to the Pictures page to select a picture</p>
        )}
        <div className = "commentsDiv">
            {comments.length === 0 ? (
                <p className="no-comments">Be the first to comment</p>
                ) : comments.map((comment, index) => (
                    <div key={index} className="commentItem">
                    <p className="comments">
                        {comment.text} -{comment.userName}
                    </p>
                    {comment.userName === userName && ( 
                        <button className="btn btn-danger" onClick={() => handleDeleteComment(index)}>
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
        <div className="mb-3">
            <form onSubmit={handleCommentSubmit}>
                <label for="textarea">Comments: </label>
                <textarea className="form-control" 
                    id="textarea" 
                    name="comment" 
                    rows="3" 
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Enter your comment">
                </textarea>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
        </div>
    </main>
  );
}