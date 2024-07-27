import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

const JoinLobby = () => {
  const { lobbyId } = useParams();
  const [lobbyCode, setLobbyCode] = useState(lobbyId || '');
  const userEmail = 'user2@gmail.com'; // This should be dynamically set based on the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('joinRequest', ({ lid, userEmail }) => {
      console.log(`User ${userEmail} requested to join lobby ${lid}`);
    });
  }, []);

  const handleJoinLobby = async () => {
	  const response = await fetch('https://azhackathon-backend-1.onrender.com/lobbies/requestJoinLobby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lid: lobbyCode, userEmail })
    });
    const data = await response.json();

    if (data.message === 'Join request sent') {
      socket.emit('joinLobby', { lid: lobbyCode, userEmail });
      navigate(`/waiting`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="join-lobby">
      <h1>Join Lobby</h1>
      <input
        type="text"
        placeholder="Enter Lobby Code"
        value={lobbyCode}
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      <button onClick={handleJoinLobby}>Join</button>
    </div>
  );
};

export default JoinLobby;
