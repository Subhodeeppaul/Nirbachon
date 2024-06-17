import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const RegisterCandidate = () => {
  const navigate = useNavigate();

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

  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register-candidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateName, partyName }),
      });
      const data = await response.json();
      setMessage(data.message);
      setCandidateName('');
      setPartyName('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    navigate('/AdminControls');
  };

  const formStyle = {
    width: '80%',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
    color: '#ddd',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#555',
    color: '#fff',
    marginBottom: '15px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', 
  };

  return (
    <div>
      <ParticleBackground />
      <div style={formStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Candidate</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Candidate Name:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Party Name:</label>
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Register Candidate
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Back
        </button>
      </div>
    </div>
  );
};

export default RegisterCandidate;
