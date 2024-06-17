import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const AdminPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleLogin = () => {
    if (username === 'Subhodeep' && password === 'iloveyousree') {
      navigate('/admincontrols');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  };

  return (
    <div>
      <ParticleBackground />
      <div style={containerStyle}>
        <p>WELCOME ADMIN</p>
        <h1>Admin Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
