import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Questions = ({ question, selectedOption, handleOptionChange }) => {
  if (!question || !question.qoptions) {
    return <Typography variant="h6" align="center">No question available</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        {question.qname}
      </Typography>
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        style={{ marginBottom: 16 }}
      >
        {question.qoptions.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default Questions;
