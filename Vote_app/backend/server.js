const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.REACT_APP_MONGODB_URI; // Use the MongoDB URI from environment variable
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// MongoDB Model
const User = mongoose.model('User', {
  name: String,
  aadharNo: { type: String, unique: true },
  voterId: { type: String, unique: true },
  password: String
});

const Candidate = mongoose.model('Candidate', {
  candidateName: String,
  partyName: String,
  voteCount: { type: Number, default: 0 } // Added voteCount field
});

const Vote = mongoose.model('Vote', {
  candidateName: String,
  voterId: String
});

// Routes
app.post('/api/register', async (req, res) => {
  const { name, aadharNo, voterId, password } = req.body;
  try {
    const user = new User({ name, aadharNo, voterId, password });
    await user.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Aadhar number or Voter ID already exists.' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.post('/api/register-candidate', async (req, res) => {
  const { candidateName, partyName } = req.body;
  try {
    const candidate = new Candidate({ candidateName, partyName });
    await candidate.save();
    res.json({ message: 'Candidate registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { aadharNo, voterId, password } = req.body;
  try {
    const user = await User.findOne({ aadharNo, voterId, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Aadhar number, Voter ID, or password.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/updatePassword', async (req, res) => {
  const { aadharNo, voterId, newPassword } = req.body;
  try {
    const user = await User.findOneAndUpdate({ aadharNo, voterId }, { $set: { password: newPassword } });
    if (user) {
      res.json({ success: true, message: 'Password updated successfully!' });
    } else {
      res.status(401).json({ success: false, message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.get('/api/getCandidates', async (req, res) => {
  try {
    const candidates = await Candidate.find({}, 'candidateName partyName'); // Only return candidateName and partyName
    res.json(candidates);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Endpoint to place a vote
app.post('/api/placeVote', async (req, res) => {
    const { voterId, candidateName } = req.body;
  
    // Ensure voterId and candidateName are provided
    if (!voterId || !candidateName) {
      return res.status(400).json({ success: false, message: 'Voter ID and Candidate Name are required.' });
    }
  
    try {
      // Check if the voter has already voted
      const vote = await Vote.findOne({ voterId });
      if (vote) {
        return res.status(403).json({ success: false, message: 'You have already voted.' });
      }
  
      // Find the candidate
      const candidate = await Candidate.findOne({ candidateName });
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Candidate not found.' });
      }
  
      // Save the vote
      const newVote = new Vote({ voterId, candidateName });
      await newVote.save();
  
      // Increment the vote count for the candidate
      candidate.voteCount += 1;
      await candidate.save();
  
      res.status(200).json({ success: true, message: 'Vote placed successfully!' });
    } catch (error) {
      console.error('Error placing vote:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
