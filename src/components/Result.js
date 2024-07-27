// Result.js
import React from 'react';

const Result = ({ score }) => {
  return (
    <div className="result">
      <h1>Result</h1>
      <p>Your score: {score}</p>
    </div>
  );
};

export default Result;
