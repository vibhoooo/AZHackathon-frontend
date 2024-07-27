import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Questions from './Questions';

const Lobby = () => {
  const { lobbyId } = useParams();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = useSelector(state => state.questions.queue);
  const trace = useSelector(state => state.questions.trace);

  useEffect(() => {
    // Fetch questions or initiate game start
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to result page
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="lobby">
      <h1>Lobby {lobbyId}</h1>
      <Questions question={questions[currentQuestion]} />
      <div>
        {currentQuestion > 0 && (
          <button onClick={handlePrevQuestion}>Previous</button>
        )}
        {currentQuestion < questions.length - 1 && (
          <button onClick={handleNextQuestion}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
