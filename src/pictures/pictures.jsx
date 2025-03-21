import React from 'react';
import './pictures.css'; 
import { Link } from 'react-router-dom';
import { AuthState } from '../login/authState'; 

export function Pictures({ userName, authState }) {
  const [recentUpdates, setRecentUpdates] = React.useState([]);

  const sunsetImages = [
    { id: 1, url: "Photos/Sunsets/sunset_ecuador.jpg", title: "Sunset in Ecuador"},
    { id: 2, url: "Photos/Sunsets/sunset_norway.jpg", title: "Sunset in Norway"},
    { id: 3, url: "Photos/Sunsets/sunset_norway2.jpg", title: "Sunset in Norway 2"},
    { id: 4, url: "Photos/Sunsets/sunset_utah.jpg", title: "Sunset in Utah"},
    { id: 5, url: "Photos/Sunsets/sunset2.jpg", title: "Sunset in Texas"},
  ];

  const animalImages = [
    { id: 6, url: "Photos/Animals/Bearded_dragon.jpg", title: "Breaded Dragon"},
    { id: 7, url: "Photos/Animals/Cougar.jpg", title: "Cougar"},
    { id: 8, url: "Photos/Animals/Dolphin.jpg", title: "Dolphin"},
    { id: 9, url: "Photos/Animals/Giraffe.jpg", title: "Giraffe"},
    { id: 10, url: "Photos/Animals/Gorilla.jpg", title: "Gorilla"},
  ];

  const allImages = [...sunsetImages, ...animalImages];

  const fetchRecentComments = async () => {
    try {
      const response = await fetch('/api/recent-comments');
      if (response.ok) {
          const data = await response.json();
          const recentComments = data.map(comment => {
              const image = allImages.find(img => img.id == comment.imageId);
              return {
                  username: comment.userName,
                  imageTitle: image ? image.title : "Unknown Image",
                  timestamp: comment.timestamp
              };
          });
          setRecentUpdates(recentComments);
      } else {
          console.error('Failed to fetch recent comments');
      }
  } catch (error) {
      console.error('Error fetching recent comments:', error);
  }
  };
  
  React.useEffect(() => {
    if (authState === AuthState.Authenticated) {
      fetchRecentComments();
      const intervalId = setInterval(fetchRecentComments, 5000); 
      return () => clearInterval(intervalId); 
    }
  }, [authState]);

  return (
    <main>
      {authState === AuthState.Authenticated && 
      (<div>
        <div className="user">
          User: <span className="usersName">{userName}</span>
        </div>
        <div className="updates">
          Recent Updates:
          <ul id="notification">
              {recentUpdates.length > 0 ? (
                recentUpdates.map((update, index) => (
                  <li key={index}>
                    <span className="usersName">{update.username}</span> posted a comment on <strong>{update.imageTitle}</strong>
                  </li>
                ))
              ) : (
                <li>No recent updates</li>
              )}
            </ul>
        </div>
      </div>)}
      
      <h2>Sunsets</h2>
      <div id="carouselIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div className="carousel-inner">
        {sunsetImages.map((sunsetImages, index) => (
            <div key={sunsetImages.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={sunsetImages.url} className="img1 d-block w-100" alt={sunsetImages.title} />
              <div className="carousel-caption d-md-block">
                <h5>{sunsetImages.title}</h5>
                {authState === AuthState.Authenticated && (<Link to={`/comments/${sunsetImages.id}`}>Leave a comment</Link>)}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2>Animals</h2>
      <div id="carouselIndicators2" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselIndicators2" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselIndicators2" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselIndicators2" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselIndicators2" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselIndicators2" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div className="carousel-inner">
          {animalImages.map((animalImages, index) => (
            <div key={animalImages.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={animalImages.url} className="img1 d-block w-100" alt={animalImages.title} />
              <div className="carousel-caption d-md-block">
                <h5>{animalImages.title}</h5>
                {authState === AuthState.Authenticated && (<Link to={`/comments/${animalImages.id}`}>Leave a comment</Link>)}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators2" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators2" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </main>
  );
}
