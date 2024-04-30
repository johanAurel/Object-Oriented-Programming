// src/components/TrainerSetup.js
import React, { useState } from 'react';

function TrainerSetup({ onTrainersSet }) {
  const [trainer1, setTrainer1] = useState('');
  const [trainer2, setTrainer2] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onTrainersSet(trainer1, trainer2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Trainer 1 Name:
        <input type="text" value={trainer1} onChange={(e) => setTrainer1(e.target.value)} />
      </label>
      <label>
        Trainer 2 Name:
        <input type="text" value={trainer2} onChange={(e) => setTrainer2(e.target.value)} />
      </label>
      <button type="submit">Set Trainers</button>
    </form>
  );
}

export default TrainerSetup;