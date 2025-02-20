import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
  
    async function loginUser() {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    }
  
    async function createUser() {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    }
  
    return (
      <>
        <div>
          <div className='input-group mb-3'>
            <span className="input-group-text" id="basic-addon1">Username</span>
            <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <div className='input-group mb-3'>
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' aria-label='Password' aria-describedby='basic-addon1'/>
          </div>
          <button type="submit" className="btn btn-outline-primary btn-sm" onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
          <button type="submit" className="btn btn-outline-dark btn-sm" onClick={() => createUser()} disabled={!userName || !password}>Create</button>
        </div>
      </>
    );
  }
  