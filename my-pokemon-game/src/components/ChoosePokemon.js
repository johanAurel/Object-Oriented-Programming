// src/components/ChoosePokemon.js
import React, { useState } from 'react';

function ChoosePokemon({ onPokemonChosen }) {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [pokemon3, setPokemon3] = useState('');
  const [pokemon4, setPokemon4] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    onPokemonChosen(pokemon1,pokemon2,pokemon3,pokemon4);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose your Pokémon1:
        <input type="text" value={pokemon1} onChange={(e) => setPokemon1(e.target.value)} />
      </label>
      <label>
        Choose your Pokémon2:
        <input type="text" value={pokemon2} onChange={(e) => setPokemon2(e.target.value)} />
      </label>
      <label>
        Choose your Pokémon3:
        <input type="text" value={pokemon3} onChange={(e) => setPokemon3(e.target.value)} />
      </label>
      <label>
        Choose your Pokémon4:
        <input type="text" value={pokemon4} onChange={(e) => setPokemon4(e.target.value)} />
      </label>
      <button type="submit">Choose Pokemon</button>
    </form>
  );
}

export default ChoosePokemon;