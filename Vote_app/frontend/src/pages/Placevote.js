import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceVote = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getCandidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

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

  const handleVote = async () => {
    const voterId = localStorage.getItem('voterId'); // Retrieve voterId from localStorage
    console.log('Selected candidate:', selectedCandidate);
    console.log('Voter ID:', voterId);
    try {
      const response = await fetch('http://localhost:5000/api/placeVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateName: selectedCandidate, voterId }),
      });
      const data = await response.json();
      if (response.status === 403) {
        setMessage('You have already voted.');
      } else if (response.status === 200) {
        setMessage('Vote placed successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error placing vote:', error);
      setMessage('An error occurred while placing the vote. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('voterId');
    navigate('/');
  };

  return (
    <div>
      <h1>Vote for Your Favorite Candidate</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}>
            <input
              type="radio"
              id={candidate.candidateName}
              name="candidate"
              value={candidate.candidateName}
              onChange={() => setSelectedCandidate(candidate.candidateName)}
            />
            <label htmlFor={candidate.candidateName}>{candidate.candidateName} - {candidate.partyName}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote}>Vote</button><br />
      <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

const logoutButtonStyle = {
  width: 'auto',
  padding: '6px 12px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#6c757d',
  color: '#fff',
  cursor: 'pointer',
};

export default PlaceVote;
