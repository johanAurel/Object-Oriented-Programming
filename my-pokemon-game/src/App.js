// src/App.js
import React, { useState } from 'react';
import FreeWill from './components/FreeWill';
import TrainerSetup from './components/TrainerSetup';
import ChoosePokemon from './components/ChoosePokemon';
// Import Battle component

function App() {
  const [gameState, setGameState] = useState('freeWill'); // Other states: 'setupTrainers', 'choosePokemon', 'battle'
  const [trainers, setTrainers] = useState({ trainer1: '', trainer2: '' });

  const handleStartGame = () => {
    setGameState('setupTrainers');
  };

  const handleEndGame = () => {
    // Handle game ending logic
    console.log('Game ended');
  };

  const handleTrainersSet = (trainer1, trainer2) => {
    setTrainers({ trainer1, trainer2 });
    setGameState('choosePokemon');
  };

  // Add more handlers for choosing Pokémon and battling

  return (
    <div className="App">
      {gameState === 'freeWill' && <FreeWill onStartGame={handleStartGame} onEndGame={handleEndGame} />}
      {gameState === 'setupTrainers' && <TrainerSetup onTrainersSet={handleTrainersSet} />}
      {gameState === 'choosePokemon' && <ChoosePokemon onPokemonChosen={handlePokemonChosen} />}
      {/* Render Battle component based on gameState */}
    </div>
  );
}

export default App;