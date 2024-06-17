import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set background color to black when component mounts
    document.body.style.backgroundColor = 'black';
    document.body.style.color = '#fff'; // Text color

    // Function to center the form container
    const centerContainer = () => {
      const windowHeight = window.innerHeight;
      const formHeight = document.getElementById('register-form').offsetHeight;
      const marginTop = (windowHeight - formHeight) / 2;
      document.getElementById('register-form').style.marginTop = `${marginTop}px`;
    };

    // Call the function initially and on window resize
    centerContainer();
    window.addEventListener('resize', centerContainer);

    // Cleanup function to reset background color and remove event listener
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = ''; // Reset text color
      window.removeEventListener('resize', centerContainer);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, aadharNo, voterId, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      setName('');
      setAadharNo('');
      setVoterId('');
      setPassword('');
      // Redirect to AdminControls page after successful registration
      navigate('/admincontrols');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const formStyle = {
    width: '80%',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background (adjust opacity as needed)
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
  };

  return (
    <div>
      <ParticleBackground />
      <div id="register-form" style={formStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
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
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterUser;