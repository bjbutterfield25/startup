import React from 'react';
import './pictures.css'; 

export function Pictures() {
  return (
    <main>
      <div className="user">
        User: <span className="usersName">TestUser</span>
      </div>
      <div className="updates">
        Recent Updates:
        <ul id="notification">
          <li><span className="usersName">Jim</span> posted a comment</li>
          <li><span className="usersName">Anne</span> posted a comment</li>
          <li><span className="usersName">Jack</span> posted a comment</li>
        </ul>
      </div>
      
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
          <div className="carousel-item active">
            <img src="Photos/Sunsets/sunset_ecuador.jpg" className="img1 d-block w-100" alt="Sunset in Ecuador"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Sunset in Ecuador</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Sunsets/sunset_norway.jpg" className="img1 d-block w-100" alt="Sunset in Norway"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Sunset in Norway</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Sunsets/sunset_norway2.jpg" className="img1 d-block w-100" alt="Sunset in Norway 2"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Sunset in Norway</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Sunsets/sunset_utah.jpg" className="img1 d-block w-100" alt="Sunset in Utah"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Sunset in Utah</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Sunsets/sunset2.jpg" className="img1 d-block w-100" alt="Sunset in Texas"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Sunset in Texas</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
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
          <div className="carousel-item active">
            <img src="Photos/Animals/Bearded_dragon.jpg" className="img1 d-block w-100" alt="Bearded Dragon"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Bearded Dragon</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Animals/Cougar.jpg" className="img1 d-block w-100" alt="Cougar"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Cougar</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Animals/Dolphin.jpg" className="img1 d-block w-100" alt="Dolphin"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Dolphin</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Animals/Giraffe.jpg" className="img1 d-block w-100" alt="Giraffe"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Giraffe</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Photos/Animals/Gorilla.jpg" className="img1 d-block w-100" alt="Gorilla"/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Gorilla</h5>
              <a href="comments">Leave a comment</a>
            </div>
          </div>
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
