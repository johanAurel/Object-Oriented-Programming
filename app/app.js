const {
    trainersName , changeName, showcasePokemon, chooseFirstPokemonT1, chooseFirstPokemonT2, choosePokemon, freeWill
} = require('./gameTrial');

const express = require('express');

const app = express();




 app.get('/api/teams', freeWill);
 
app.listen(9090, (err) => {
  if (err){console.log(err)}
  else {console.log('server listening on port 9090...')}
})
