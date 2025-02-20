import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='usersName'>{props.userName}</div>
      <p>Thank you for logging in. You may know view others comments and leave your own.</p>
      <button type="submit" className="btn btn-outline-primary btn-sm" onClick={() => navigate('/pictures')}>
        Pictures
      </button>
      <button type="submit" className="btn btn-outline-dark btn-sm" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}