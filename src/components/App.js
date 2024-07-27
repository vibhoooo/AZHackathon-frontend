import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import FormMCQ from './FormMCQ';
import Quiz from './Quiz';
import Result from './Result';
import Logout from './Logout';
import CreateLobby from './CreateLobby';
import JoinLobby from './JoinLobby';
import CreateMCQ from './CreateMCQ';
import StartGame from './StartGame';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/formMCQ" element={<FormMCQ />} />
          <Route path="/main/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createLobby" element={<CreateLobby />} />
          <Route path="/join-lobby" element={<JoinLobby />} />
          <Route path="/join-lobby/:lobbyId" element={<JoinLobby />} />
          <Route path="/create-mcq/:id" element={<CreateMCQ />} />
          
          <Route path="/startGame/:lobbyId" element={<StartGame />} />
        
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
