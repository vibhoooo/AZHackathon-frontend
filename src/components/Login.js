// src/Login.js
import React, { useContext, useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import AnimatedLetters from "./AnimatedLetters";

function LogIn() {
  const { setEmail } = useContext(UserContext);
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmailState(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('All fields are mandatory!');
      return;
    }
    try {
		const response = await fetch('https://azhackathon-backend-1.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        const accessToken = json.accessToken;
        localStorage.setItem(email, accessToken); // Store token with email as the key
        setEmail(email); // Set the email in the context
        navigate('/main'); // Navigate to Main
      } else {
        throw new Error(json.message || 'Log In failed!');
      }
    } catch (error) {
      console.error('Log In error:', error.message);
      alert(error.message); // Display error message as alert
    }
  };

  const paperStyle = { padding: 20, height: '40vh', width: 500, margin: '50px auto' };
  const btnStyle = { margin: '8px 0' };

  return (
      <div className="login-page">
        <AnimatedLetters text="Ready, Set, Quiz!!" />
        <div className="login-form-container">
          <h1 style={{color: 'black'}}>Log In</h1>
          <TextField
              label='Email id'
              placeholder='Enter email id'
              fullWidth
              required
              value={email}
              onChange={handleEmailChange}
              margin="normal"
          />
          <TextField
              label='Password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
          />
          <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              onClick={handleLogIn}
              style={{marginTop: '20px'}}
          >
            Log In
          </Button>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Link to='/signup' color='inherit'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
  );
}

export default LogIn;
