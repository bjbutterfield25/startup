import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Pictures } from './pictures/pictures';
import { Comments } from './comments/comments';

export default function App() {
  return (
    <BrowserRouter>
        <div className='body'>
            <header className="container-fluid">
                <nav className="navbar fixed-top">
                    <span className="navbar-brand mb-0 h1">Pictures Around the World</span>
                    <menu className="navbar-nav">
                        <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="pictures">Pictures</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="comments">Comments</NavLink></li>
                    </menu>
                </nav>
            </header>
        
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/pictures' element={<Pictures />} />
                <Route path='/comments' element={<Comments />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        
            <footer>
                <span>Bradley Butterfield</span>
                <NavLink to="https://github.com/bjbutterfield25/startup.git">GitHub</NavLink>
            </footer>
        </div>
    </BrowserRouter>
    
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}