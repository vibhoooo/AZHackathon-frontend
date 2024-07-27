import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormMCQ = ({ lid, email, handleClose }) => {
  const [formData, setFormData] = useState({
    qid: '',
    qname: '',
    qdiff: '',
    qtopic: '',
    qans: '',
    qscore: '',
    lid: lid, // Automatically fill lobby ID
    qoptions: ['', '', '', '']
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.qoptions];
    newOptions[index] = value;
    setFormData({
      ...formData,
      qoptions: newOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem(email);
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }
    try {
		const response = await axios.post('https://azhackathon-backend-1.onrender.com/mcqs/createMcq', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('MCQ created:', response.data);
      // Call handleClose to update question count in parent component
      handleClose();
      // Reset form for the next MCQ
      setFormData({
        qid: '',
        qname: '',
        qdiff: '',
        qtopic: '',
        qans: '',
        qscore: '',
        lid: lid,
        qoptions: ['', '', '', '']
      });
    } catch (error) {
      console.error('Error creating MCQ:', error.response ? error.response.data : error.message);
    }
  };

  const paperStyle = { padding: 20, width: 600, margin: "50px auto" };
  const btnstyle = { margin: '8px 0' };

  return (
    <Grid container>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Link to={`/main`}>Go Back</Link>
        </Grid>
      </Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Create MCQ</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            name='qid'
            label='Question ID'
            placeholder='Enter question ID'
            fullWidth
            required
            value={formData.qid}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name='qname'
            label='Question Name'
            placeholder='Enter question name'
            fullWidth
            required
            value={formData.qname}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name='qdiff'
            label='Difficulty'
            select
            fullWidth
            required
            value={formData.qdiff}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
          <TextField
            name='qtopic'
            label='Topic'
            placeholder='Enter topic'
            fullWidth
            required
            value={formData.qtopic}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name='qans'
            label='Correct Answer'
            placeholder='Enter correct answer'
            fullWidth
            required
            value={formData.qans}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name='qscore'
            label='Score'
            placeholder='Enter score'
            fullWidth
            required
            type="number"
            value={formData.qscore}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name='lid'
            label='Lobby ID'
            fullWidth
            required
            value={formData.lid}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          {formData.qoptions.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              placeholder={`Enter option ${index + 1}`}
              fullWidth
              required
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              margin="normal"
            />
          ))}
          <Button
            type='submit'
            color='primary'
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Create MCQ
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default FormMCQ;
