const {Pokemon, Fire, Water, Grass, Normal, Bulbasaur} = require('./index.js');

describe ('tests for Pokemon', ()=> {
    test('testing takeDamage', ()=> {
const fluffy = new Pokemon('fluffy', 2, 3);
fluffy.takeDamage(1);
expect(fluffy.hitPoints).toBe(1);
    })

    test('testing hasFainted', ()=> {
        const fluffy = new Pokemon('fluffy', 1, 3);
        fluffy.takeDamage(1);
        expect(fluffy.hasFainted()).toBe(true);
    })

    test('testing move', ()=> {
        const fluffy = new Pokemon('fluffy', 1, 3);
        expect(fluffy.useMove()).toBe(3);
    })

    test('testing isWeakTo', ()=> {
        const charlie = new Fire('Charlie', 20, 30);
        const mary = new Water('Mary', 10, 10);
    expect(charlie.isWeakTo(mary)).toBe(true);
    })

    test('testing isEffectiveAgainst', ()=> {
        const ted = new Grass('Ted', 4, 10);
        const anthony = new Normal('Anthony', 2, 5);
    expect(ted.isEffectiveAgainst(anthony)).toBe(false);
    })
    test('testing recent extended classes move changes',()=>{
        const tata = new Bulbasaur('tata', 10, 20);
        expect(tata.move).toBe('vine whip') 
    })

})

/*Pokeballs are the containers for Pokemon.
 They are used in the game to catch Pokemon and 
 to release the Pokemon for battle.

Pokeball behaviours include:

being able to store a Pokemon.
throw it to catch a Pokemon.
throw it to release it for battle.
check which Pokemon is in the pokeball.

Methods
throw

Takes a Pokemon object as an argument.
 If the pokeball is empty it will capture the passed Pokemon.
If it isn't empty ,the user should not be allowed to capture
 a pokemon with it!
 
The throw method should also console log something like 
("you caught pokemonX's name") when a Pokemon has been caught.
Additionally, the method can be invoked with no argument.
In this case the method should return the stored Pokemon.
 The throw method should console log something like
  ("GO pokemonX's name!!") in this scenario.
If the ball is empty then the user should be informed accordingly.
isEmpty

Should return a boolean representing whether or not a Pokemon is stored inside it.
contains

Should return the name of the Pokemon that is stored or
If the pokeball is empty is should return "empty ...".
*/