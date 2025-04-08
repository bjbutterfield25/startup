import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
  
    async function loginUser() {
      loginOrCreate(`/api/auth/login`);
    }
  
    async function createUser() {
      loginOrCreate(`/api/auth/create`);
    }
  
    async function loginOrCreate(endpoint) {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        alert(`⚠ Error: ${body.msg}`);
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        loginUser();
      }
    };

    return (
      <>
        <p className="intro">Pictures Around the World allows you to view various photos and leave comments if you desire. Your comments will be public to all other users and you must login below in order to leave a comment.</p>
        <div>
          <div className='input-group mb-3'>
            <span className="input-group-text" id="basic-addon1">Username</span>
            <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <div className='input-group mb-3'>
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder='Password' aria-label='Password' aria-describedby='basic-addon1'/>
          </div>
          <button type="submit" className="btn btn-outline-primary btn-sm" onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
          <button type="submit" className="btn btn-outline-dark btn-sm" onClick={() => createUser()} disabled={!userName || !password}>Create</button>
        </div>
      </>
    );
  }
  