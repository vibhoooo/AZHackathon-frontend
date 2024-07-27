import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../styles/Main.css';
import AnimatedLetters from "./AnimatedLetters";

const Main = () => {
  const { email } = useContext(UserContext);
  const [lobbies, setLobbies] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(email);
    console.log(email);
    if (token) {
      setAccessToken(token);
      fetchLobbies(token);
    } else {
      console.error('No access token found. Please log in.');
      // Optionally, redirect to login page
    //    navigate('/login');
    }
  }, [email, navigate]);

  const fetchLobbies = async (token) => {
    try {
		const response = await fetch('https://azhackathon-backend-1.onrender.com/lobbies/listLobby', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched lobbies:', data);
      setLobbies(data);
    } catch (error) {
      console.error('Failed to fetch lobbies:', error);
    }
  };

  const handleLobbyClick = (lobbyId) => {
    navigate(`/join-lobby/${lobbyId}`);
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="game-info">
          <AnimatedLetters text="Quiz Combat" />
          <p>Lesss Gooo!</p>
        </div>
        <Link to="/logout">
          <button className="button logout-button">LogOut</button>
        </Link>
      </div>
      <div className="content">
        <div className="left-section">
          <button className="button create-lobby-button" onClick={() => navigate('/createLobby')}>Create Lobby</button>
          <button className="button join-lobby-button" onClick={() => navigate('/join-lobby')}>Join Lobby</button>
        </div>
        <div className="center-section">
          <div className="lobby-list">
            <h2>Lobby List</h2>
            <div className="scrollable-list">
              {lobbies.length > 0 ? (
                lobbies.map(lobby => (
                  <div
                    key={lobby._id}
                    className="lobby-item"
                    onClick={() => handleLobbyClick(lobby.lid)}
                  >
                    {lobby.lname}
                  </div>
                ))
              ) : (
                <p>No lobbies available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
