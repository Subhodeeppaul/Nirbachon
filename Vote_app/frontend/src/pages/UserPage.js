import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();

  const [aadharNo, setAadharNo] = useState('');
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNo, voterId, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('');
        localStorage.setItem('voterId', voterId); // Store voterId in localStorage
        if (newPassword) {
          await updatePassword();
        }
        navigate('/Placevote');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNo, voterId, newPassword }),
      });
      const data = await response.json();
      if (!data.success) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the password. Please try again.');
    }
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
    marginBottom: '15px', 
  };

  const backButtonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6c757d',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to online voting platform</h1>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Aadhar Number:</label>
            <input
              type="text"
              value={aadharNo}
              onChange={(e) => setAadharNo(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Voter ID:</label>
            <input
              type="text"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <h5>!!!Please update your password if you are using for the first time!!!</h5>
            <label style={labelStyle}>Change Password (Optional):</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        <button onClick={() => navigate('/')} style={backButtonStyle}>
          Back
        </button>
      </div>
    </div>
  );
};

export default UserPage;
