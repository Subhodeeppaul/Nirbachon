import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const WelcomePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.body.style.height = '100vh';
    document.body.style.display = 'flex';
    document.body.style.alignItems = 'center';
    document.body.style.justifyContent = 'center';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.height = '';
      document.body.style.display = '';
      document.body.style.alignItems = '';
      document.body.style.justifyContent = '';
    };
  }, []);

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    margin: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (    
    <div style={{ textAlign: 'center' }}>
      <ParticleBackground />
      <h1>Welcome</h1>
      <Link to="/admin" style={buttonStyle}>
        Admin
      </Link>
      <Link to="/user" style={buttonStyle}>
        User
      </Link>
    </div>
  );
};

export default WelcomePage;
