import { Grid, Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedLetters from "./AnimatedLetters";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      alert('All fields are mandatory!');
      return;
    }

    try {
		const response = await fetch('https://azhackathon-backend-1.onrender.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        alert('Sign Up successful!');
        navigate(`/login`);
      } else {
        throw new Error(json.message || 'Sign Up failed!');
      }
    } catch (error) {
      alert(`Sign Up error: ${error.message}`);
    }
  };

  return (
      <div className="login-page">
        <AnimatedLetters text="Let's Sign Up First" />
        <div className="login-form-container">
          <h1 style={{ color: 'black' }}>Sign Up</h1>
          <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              value={username}
              onChange={handleUsernameChange}
              margin="normal"
          />
          <TextField
              label="Email id"
              placeholder="Enter email id"
              fullWidth
              required
              value={email}
              onChange={handleEmailChange}
              margin="normal"
          />
          <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
          />
          <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleSignUp}
              style={{ marginTop: '20px' }}
          >
            Sign Up
          </Button>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/login" color="inherit">
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
  );
}

export default SignUp;
