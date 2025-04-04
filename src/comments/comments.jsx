import React from 'react';
import { useParams } from 'react-router-dom'
import './comments.css';
import { CommentNotifier } from '../commentNotifier';

export function Comments( {userName} ) {
    const { id } = useParams()
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");
    const [loading, setLoading] = React.useState(true);

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
        async function fetchComments() {
            setLoading(true);
            try {
                const response = await fetch(`/api/comments/${id}`, { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchComments();
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim() === "") return;
        const newCommentObj = { text: newComment };
        try {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCommentObj),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setComments([...comments, data.comment]);
                setNewComment("");
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
        // Notify other clients about the new comment
        const image = images.find(img => img.id == id);
        const msg = {
            username: userName,
            imageTitle: image ? image.title : "Unknown Image",
        };
        CommentNotifier.broadcastEvent(msg);
    };

    const handleDeleteComment = async (index) => {
        try {
            const response = await fetch(`/api/comments/${id}/${index}`, {
                method: 'DELETE',
                credentials: 'include',
            });   
            if (response.ok) {
                setComments(comments.filter((_, i) => i !== index));
                const img = images.find(img => img.id == id);
                const msg = {
                    type: 'delete',
                    username: userName,
                    imageTitle: img ? img.title : "Unknown Image",
                };
                CommentNotifier.broadcastEvent(msg);
            } else {
                const data = await response.json();
                console.error('Error deleting comment:', data.msg);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
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
            {loading ? <p>Loading comments...</p> :
                comments.length === 0 ? (
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
                <label htmlFor="textarea">Comments: </label>
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