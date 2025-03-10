import React from 'react';
import './login.css'

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    const [quote, setQuote] = React.useState('...loading')
    const [quoteAuthor, setAuthor] = React.useState('unknown')

    React.useEffect(() => {
        async function fetchQuote() {
            try {
                const response = await fetch('/api/quote');
                const data = await response.json();
                const quoteData = data[0]
                setQuote(quoteData.q);
                setAuthor(quoteData.a || 'Unknown');
            } catch (error) {
                console.error('Error fetching quote:', error);
                setQuote('The only way to do great work is to love what you do');
                setAuthor('Steve Jobs');
            }
        }

        fetchQuote();
    }, []);

  return (
    <main className="main container-fluid text-center">
        <div>
            {authState !== AuthState.Unknown && <h1>Welcome to Pictures Around the World</h1>}
            {authState === AuthState.Authenticated && (
                <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                userName={userName}
                onLogin={(loginUserName) => {
                    onAuthChange(loginUserName, AuthState.Authenticated);
                }}
                />
            )}
        </div>
        <figure>
            <blockquote className="blockquote">
                <p id="quote"><em>{quote}</em></p>
            </blockquote>
            <figcaption className="blockquote-footer">{quoteAuthor}</figcaption>
            <p>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></p>
        </figure>
    </main>
  );
}