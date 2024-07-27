import React, { useState, useContext } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const JoinLobby = () => {
  const [lid, setLid] = useState('');
  const { email } = useContext(UserContext); // Access email from UserContext
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLidChange = (event) => setLid(event.target.value);

  const handleJoinLobby = async (event) => {
    event.preventDefault();
    if (!lid || !email) {
      setError('Please provide all required fields.');
      return;
    }
    try {
		const response = await axios.post('https://azhackathon-backend-1.onrender.com/lobbies/requestJoinLobby', {
        lid,
        participant: email,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        alert(`You have joined lobby ${lid} with ${email}`);
        navigate(`/startGame/${lid}`); // Redirect to StartGame component with lobby ID
      } else {
        setError(response.data.message || 'Failed to send join request');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send join request');
    }
  };

  const paperStyle = { padding: 20, height: '40vh', width: 400, margin: '50px auto' };
  const btnStyle = { margin: '8px 0' };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h5" align="center" gutterBottom>
          Join Lobby
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleJoinLobby}>
          <TextField
            label="Lobby ID"
            placeholder="Enter lobby ID"
            fullWidth
            required
            value={lid}
            onChange={handleLidChange}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Email"
            placeholder="Enter participant email"
            fullWidth
            required
            value={email}
            disabled
            style={{ marginBottom: 16 }}
          />
          <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>
            Join Lobby
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default JoinLobby;
/*
import React, { useState, useContext } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const JoinLobby = () => {
  const [lid, setLid] = useState('');
  const { email } = useContext(UserContext); // Access email from UserContext
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLidChange = (event) => setLid(event.target.value);

  const handleJoinLobby = async (event) => {
    event.preventDefault();
    if (!lid || !email) {
      setError('Please provide all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8085/lobbies/requestJoinLobby', {
        lid,
        participant: email,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        alert(`You have joined lobby ${lid} with ${email}`);
        navigate(`/startGame/${lid}`); // Redirect to StartGame component with lobby ID
      } else {
        setError(response.data.message || 'Failed to send join request');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send join request');
    }
  };

  const paperStyle = { padding: 20, height: '40vh', width: 400, margin: '50px auto' };
  const btnStyle = { margin: '8px 0' };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h5" align="center" gutterBottom>
          Join Lobby
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleJoinLobby}>
          <TextField
            label="Lobby ID"
            placeholder="Enter lobby ID"
            fullWidth
            required
            value={lid}
            onChange={handleLidChange}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Email"
            placeholder="Enter participant email"
            fullWidth
            required
            value={email}
            disabled
            style={{ marginBottom: 16 }}
          />
          <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>
            Join Lobby
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default JoinLobby;
*/