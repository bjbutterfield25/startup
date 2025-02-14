import React from 'react';
import './login.css'

export function Login() {
    const [quote, setQuote] = React.useState('...loading')
    const [quoteAuthor, setAuthor] = React.useState('unknown')

    React.useEffect(() => {
        setQuote('The only way to do great work is to love what you do')
        setAuthor('Steve Jobs')
    }, []);

  return (
    <main className="main container-fluid text-center">
        <h1>Welcome to Pictures Around the World</h1>
        <p className="intro">Pictures Around the World allows you to view various photos and leave comments if you desire. Your comments will be public to all other users and you must login below in order to leave a comment.</p>
        <form method="get" action="pictures">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Username</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
            </div>
            <button type="submit" className="btn btn-outline-primary btn-sm">Login</button>
            <button type="submit" className="btn btn-outline-dark btn-sm">Create</button>
        </form>
        <figure>
            <blockquote className="blockquote">
                <p id="quote"><em>{quote}</em></p>
            </blockquote>
            <figcaption className="blockquote-footer">{quoteAuthor}</figcaption>
        </figure>
    </main>
  );
}