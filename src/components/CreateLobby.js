/*
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateLobby.css';
import { UserContext } from './UserContext'; // Import the UserContext
import { io } from 'socket.io-client';
const socket = io('http://localhost:8085');

const CreateLobby = () => {
  const { email } = useContext(UserContext); // Access email from UserContext
  const [lobbyId, setLobbyId] = useState('');
  const [lobbyName, setLobbyName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
     socket.on("joinRequest-not", (data) => {
       alert(`New participant ${data.participant} joined lobby ${data.lobbyId}`);
    })
  }, [socket]);

  useEffect(() => {
    if (!email) {
      alert('User email not found. Please log in.');
      navigate('/login'); // Redirect to login if email is not found
    }
  }, [email, navigate]);



  const handleCreateLobby = async () => {
    try {
      const authToken = localStorage.getItem(email); // Get the auth token using email

      if (!authToken) {
        alert('Authentication token not found. Please log in.');
        return;
      }

      const response = await axios.post('http://localhost:8085/lobbies/createLobby', {
        lid: lobbyId,
        lname: lobbyName,
        lowneremail: email
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}` // Include token in headers
        }
      });
      if (response.status === 201) {
        alert('Lobby created successfully');
        socket.emit('joinLobbyOwner', { lid: lobbyId, lowneremail: email });

        //console.log('Lobby created:', response.data);
        //alert('Lobby created successfully!');
        // Navigate to CreateMCQ page with lobbyId and email
        navigate(`/create-mcq/${lobbyId}`, { state: { email } });
      }

    } catch (error) {
      console.error('Failed to create lobby:', error);
      alert(`Failed to create lobby: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
      <div className="create-lobby-container">
        <h1>Create Lobby</h1>
        <div className="form-group">
          <label htmlFor="lobbyId">Lobby ID</label>
          <input
              type="text"
              id="lobbyId"
              placeholder="Enter Lobby ID"
              value={lobbyId}
              onChange={(e) => setLobbyId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lobbyName">Lobby Name</label>
          <input
              type="text"
              id="lobbyName"
              placeholder="Enter Lobby Name"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lobbyCreatorEmail">Lobby Creator Email</label>
          <input
              type="email"
              id="lobbyCreatorEmail"
              placeholder="Enter Your Email"
              value={email}
              readOnly
          />
        </div>
        <button className="create-lobby-button" onClick={handleCreateLobby}>Create Lobby</button>
      </div>
  );
};

export default CreateLobby;
*/
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, Typography, TextField } from '@mui/material'; // Added TextField import

import axios from 'axios';
// import { io } from 'socket.io-client';
import { UserContext } from './UserContext'; // Import the UserContext

// const socket = io('http://localhost:8080');

const CreateLobby = () => {
  const { email } = useContext(UserContext); // Access email from UserContext
  const [lobbyId, setLobbyId] = useState('');
  const [lobbyName, setLobbyName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      alert('User email not found. Please log in.');
      navigate('/login'); // Redirect to login if email is not found
    }
  }, [email, navigate]);

  const handleCreateLobby = async () => {
    try {
      const authToken = localStorage.getItem(email); // Get the auth token using email

      if (!authToken) {
        alert('Authentication token not found. Please log in.');
        return;
      }

		const response = await axios.post('https://azhackathon-backend-1.onrender.com/lobbies/createLobby', {
        lid: lobbyId,
        lname: lobbyName,
        lowneremail: email
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}` // Include token in headers
        }
      });

      if (response.status === 201) {
        alert('Lobby created successfully');
        // socket.emit('joinLobbyOwner', { lid: lobbyId, lowneremail: email });

        // Navigate to CreateMCQ page with lobbyId and initial questionId (1)
        navigate(`/create-mcq/${lobbyId}`, { state: { email, questionId: 1 } });
      }

    } catch (error) {
      console.error('Failed to create lobby:', error);
      alert(`Failed to create lobby: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={10} style={{ padding: 20, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Lobby
        </Typography>
        <form onSubmit={(e) => { e.preventDefault(); handleCreateLobby(); }}>
          <TextField
            label="Lobby ID"
            placeholder="Enter lobby ID"
            fullWidth
            required
            value={lobbyId}
            onChange={(e) => setLobbyId(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Lobby Name"
            placeholder="Enter lobby name"
            fullWidth
            required
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Owner Email"
            placeholder="Enter owner email"
            fullWidth
            required
            value={email}
            readOnly
            style={{ marginBottom: 16 }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Create Lobby
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateLobby;
