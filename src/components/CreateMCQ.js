import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import FormMCQ from './FormMCQ'; // Import the FormMCQ component

const CreateMCQ = () => {
  const { id } = useParams();
  const location = useLocation();
  const email = location.state?.email || '';
  const initialQuestionId = location.state?.questionId || 1; // Read initial question ID from location state

  const [questionCount, setQuestionCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [questionId, setQuestionId] = useState(initialQuestionId);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(email);
    if (token) {
      setAccessToken(token);
    } else {
      console.error('No access token found. Please log in.');
    }
  }, [email]);

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setQuestionCount(prevCount => prevCount + 1); // Increment the question count
    setQuestionId(prevId => prevId + 1); // Increment the question ID
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Questions in Lobby {id}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Total Questions: {questionCount}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Current Lobby ID: {id}
          </Typography>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleFormOpen} style={{ marginBottom: 20 }}>
              Create MCQ
            </Button>
          </Grid>
          {showForm && <FormMCQ lid={id} email={email} questionId={questionId} handleClose={handleFormClose} />}
          <Grid container justifyContent="flex-end">
            <Button component={Link} to={`/main`} variant="outlined" color="secondary">
              Go Back
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateMCQ;
