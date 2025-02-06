import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
        <header className="container-fluid">
            <nav className="navbar fixed-top">
                <span className="navbar-brand mb-0 h1">Pictures Around the World</span>
                <menu className="navbar-nav">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="index.html">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="pictures.html">Pictures</a></li>
                    <li className="nav-item"><a className="nav-link" href="comments.html">Comments</a></li>
                </menu>
            </nav>
        </header>
    
        <main>App components go here</main>
    
        <footer>
            <span>Bradley Butterfield</span>
            <a href="https://github.com/bjbutterfield25/startup.git">GitHub</a>
        </footer>
    </div>
    
  );
}