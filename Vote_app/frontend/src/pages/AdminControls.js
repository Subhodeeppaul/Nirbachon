import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const AdminControls = () => {
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

  const sectionStyle = {
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #fff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    margin: '0.5rem',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  const handleRegisterUser = () => {
    navigate('/RegisterUser');
  };

  const handleRegisterCandidates = () => {
    navigate('/RegisterCandidate');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <ParticleBackground />
      <div>
        <h1 style={{ textAlign: 'center' }}>Admin Controls</h1>
        <div style={{ ...sectionStyle, marginBottom: '2rem' }}>
          <h2>Register User</h2>
          <button style={buttonStyle} onClick={handleRegisterUser}>
            Register User
          </button>
        </div>
        <div style={sectionStyle}>
          <h2>Register Candidates</h2>
          <button style={buttonStyle} onClick={handleRegisterCandidates}>
            Register Candidates
          </button>
        </div>
        <div style={{ ...sectionStyle, marginTop: '2rem' }}>
          <h2>Logout</h2>
          <button style={buttonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
