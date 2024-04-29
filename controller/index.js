const choices = require('choices');
const inquirer = require('inquirer');
const chosenPokemon = {};



class Pokemon {

    constructor(name, num, att, move = ['tackle']) {
        this.name = name
        this.hitPoints = num
        this.attackDamage = att
        this.move = move
    }
    takeDamage(damage) {
        this.hitPoints = Math.max(0, Math.floor(this.hitPoints - damage));
        console.log(`${this.name} is down ${damage} and is now ${this.hitPoints - damage}`)
        if (this.hitPoints <= 0) {
            this.hasFainted()
        }

        return this.hitPoints

    }

    useMove() {

        return inquirer.prompt([
            {
                name: 'move',
                message: `${this.name} used a move`,
                type: 'list',
                choices: this.move
            }
        ]).then(answers => {
            const pokeMove = answers.move;
            console.log(`${this.name} used ${pokeMove}`);
            return pokeMove
        });

    }

    hasFainted() {
        if (this.hitPoints <= 0) {
            console.log(`${this.name} has fainted`)
        }
        return this.hitPoints
    }

}

class Fire extends Pokemon {
    constructor(name, num, att, move = ['tackle']) {
        super(name, num, att, move = ['tackle'])
        this.type = 'fire'
    }
    isEffectiveAgainst(name) {
        return name.type === 'grass'
    }
    isWeakTo(name) {
        return name.type === 'water'
    }
}

class Water extends Pokemon {
    constructor(name, num, att, move = ['tackle']) {
        super(name, num, att, move = ['tackle'])
        this.type = 'water'
    }
    isEffectiveAgainst(name) {
        return name.type === 'fire'
    }
    isWeakTo(name) {
        return name.type === 'grass'
    }
}

class Grass extends Pokemon {
    constructor(name, num, att, move = ['tackle']) {
        super(name, num, att, move = ['tackle'])
        this.type = 'grass'
    }
    isEffectiveAgainst(name) {
        return name.type === 'water'
    }
    isWeakTo(name) {
        return name.type === 'fire'
    }
}

class Normal extends Pokemon {
    constructor(name, num, att, move = ['tackle']) {
        super(name, num, att, move = ['tackle'])
        this.type = 'normal'
    }
    isEffectiveAgainst(name) {
        return false
    }
    isWeakTo(name) {
        return false
    }
}

class Charmander extends Fire {
    constructor(name, num, att) {
        super(name, num, att)
        this.move = ['tackle', 'ember', 'burning feast'];
    }

}

class Squirtle extends Water {

    constructor(name, num, att) {
        super(name, num, att)
        this.move = ['tackle', 'water gun', "tsunami"];
    }
}

class Bulbasaur extends Grass {

    constructor(name, num, att) {
        super(name, num, att)
        this.move = ['tackle', 'vine whip', "mothernature's call"];
    }
}

class Rattata extends Normal {

    constructor(name, num, att) {
        super(name, num, att)
    }
}

class Pokeball {

    constructor() {

        this.pokemon = null;
    }

    throw(pokemoN) {
        if (pokemoN) {

            if (this.isEmpty()) {
                this.pokemon = pokemoN;
                console.log(`You caught ${pokemoN.name}`);
            }
            else {

                console.log('The Pokeball is already occupied.');
                return this.pokemon
            }

        }
        else {
            if (this.isEmpty()) {
                'no pokemon contained here'
            }

            else {
                console.log(`Go ${this.pokemon.name}!!!`)
                return this.pokemon;
            }
        }

    }

    isEmpty() {
        return this.pokemon === null;
    }

    contains() {
        return this.isEmpty() ? 'empty...' : this.pokemon.name;
    }

}

class Trainer {

    constructor(trainer, storeN = 4) {
        this.name = trainer
        this.belt = [];
        for (let i = 0; i < storeN; i++) {
            this.belt.push(new Pokeball());
        }
    }

    catch(pokemon) {
        const emptyPokeball = this.belt.filter(x => x.isEmpty());
        if (emptyPokeball.length > 0) {
            return emptyPokeball[0].throw(pokemon)
        }
        else { return 'no empty Pokeballs' }
    }

    getPokemon(name) {
        for (const item of this.belt) {
            if (name === item.contains()) {
                return item.throw();
            }
        }
        console.log(`No Pokemon ${name} found`);

        return null;
    }
}

class Battle extends Trainer {
    constructor() {
        super();

    }

    fight(trainer1, trainer2) {
        const pokeballs1 = trainer1.belt;
        const pokeballs2 = trainer2.belt;
        const usedBelt2 = pokeballs2.filter(x => !x.isEmpty());
        const usedBelt1 = pokeballs1.filter(x => !x.isEmpty());
        console.log('we are in the fight')

        return inquirer.prompt([{
            name: 'pokemon',
            message: `${trainer1.name} choose a pokemon`,
            type: 'list',
            choices: usedBelt1.map(pokemon => pokemon.pokemon.name)

        }])
            .then(answers => {

                for (const pokeball of trainer1.belt) {
                    if (answers.pokemon == pokeball.pokemon.name) {
                        console.log(pokeball.pokemon)
                        if (pokeball.pokemon !== null && pokeball.pokemon.hitPoints > 0) {
                            return pokeball.throw();
                        }
                        else if (pokeball.pokemon !== null && pokeball.pokemon.hitPoints <= 0) {
                            console.log(`you can not use ${answers.pokemon}. This pokemon has fainted!!!`)
                            return this.fight(trainer1, trainer2)
                        }
                        else if (answers.pokemon !== null) {
                            console.log(`no pokemon at that location`)
                            setTimeout(() => { return this.fight(trainer1, trainer2) }, 1600)
                        }
                    }
                }

            })
            .then(cP1 => {
                chosenPokemon.pokemon1 = cP1;
                return inquirer.prompt([{
                    name: 'pokemon',
                    message: `${trainer2.name} choose a pokemon`,
                    type: 'list',
                    choices: usedBelt2.map(pokemon => pokemon.pokemon.name)
                }])
                    .then(answers => {
                        for (const pokeball of trainer2.belt) {
                            if (answers.pokemon == pokeball.pokemon.name) {
                                console.log(pokeball.pokemon)
                                if (pokeball.pokemon !== null && pokeball.pokemon.hitPoints > 0) {
                                    return pokeball.throw();
                                }
                                else if (pokeball.pokemon !== null && pokeball.pokemon.hitPoints <= 0) {
                                    console.log(`you can not use ${answers.pokemon}. This pokemon has fainted!!!`)
                                    return this.fight(trainer1, trainer2)
                                }
                                else if (answers.pokemon !== null) {
                                    console.log(`no pokemon at that location`)
                                    setTimeout(() => { return this.fight(trainer1, trainer2) }, 1600)
                                }
                            }
                        }
                    })
            })
            .then(cP2 => {
                chosenPokemon.pokemon2 = cP2
                return chosenPokemon
            })
            .catch(error => {
                console.log('error with throwing pokeballs')
                console.log(error)
            })
    }
    battleCalculator(pokemon1, pokemon2) {
        
        
         if (pokemon2.hitPoints <= 0) {
            return pokemon2.hasFainted()
        }
        // Check if pokemon1 is a fire type and is an instance of Charmander
       
         if (pokemon2.type == 'fire') {
            pokemon2 = new Charmander(pokemon2.name, pokemon2.hitPoints, pokemon2.attackDamage)
        }
        if (pokemon2.type == 'water') {
            pokemon2 = new Squirtle(pokemon2.name, pokemon2.hitPoints, pokemon2.attackDamage);
            
        }
        if (pokemon2.type == 'grass') {
            pokemon2 = new Bulbasaur(pokemon2.name, pokemon2.hitPoints, pokemon2.attackDamage);
         
        }
        if (pokemon2.type == 'normal') {
            pokemon2 = new Rattata(pokemon2.name, pokemon2.hitPoints, pokemon2.attackDamage)
           
         }

        if (pokemon1.type == 'fire') {
            pokemon1 = new Charmander(pokemon1.name, pokemon1.hitPoints, pokemon1.attackDamage)
            return pokemon1.useMove()
            .then(answers=>{  
                if (answers == 'burning feast') {
    
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {            
                      return  pokemon2.takeDamage(pokemon1.attackDamage * 3.75);
    
                    }
    
                    else if (pokemon1.isWeakTo(pokemon2)) {        
                       return pokemon2.takeDamage(pokemon1.attackDamage * 1.5);
    
                    }
                    else {
                        return pokemon2.takeDamage(3);
                    }
                    
    
                }
    
                else {
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {
                      return pokemon2.takeDamage(pokemon1.attackDamage*1.25);
                    }
                    else if (pokemon1.isWeakTo(pokemon2)) {
                        return pokemon2.takeDamage(pokemon1.attackDamage*0.75)
                    }
    
                    else {
                     return pokemon2.takeDamage(pokemon1.attackDamage)
    
                    }
    
                }
             
    
    
            }
    
            )
        }

        if (pokemon1.type == 'water') {
            pokemon1 = new Squirtle(pokemon1.name, pokemon1.hitPoints, pokemon1.attackDamage);

            return pokemon1.useMove()
            .then(answers=>{  
                if (answers == 'tsunami') {
    
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {            
                      return  pokemon2.takeDamage(pokemon1.attackDamage * 3.75);
    
                    }
    
                    else if (pet1.isWeakTo(pet2)) {        
                       return pokemon2.takeDamage(pokemon1.attackDamage * 1.5);
    
                    }
    
                    
                    
                    else{
                        return pokemon2.takeDamage(3)
                    }
                    
    
                }
    
                else {
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {    
                        return pokemon2.takeDamage(pokemon1.attackDamage * 1.25);
                    }
                    else if (pokemon1.isWeakTo(pokemon2)) {
                        return pokemon2.takeDamage(pokemon1.attackDamage*0.75);
                    }
    
                    else {
                    return pokemon2.takeDamage(pokemon1.attackDamage)  
                    }
    
                }
             
    
    
            }
    
            )
        }

        if (pokemon1.type == 'grass') {
            pokemon1 = new Bulbasaur(pokemon1.name, pokemon1.hitPoints, pokemon1.attackDamage);
            return pokemon1.useMove()
            .then(answers=>{  

                    if (pokemon1.useMove() =="mothernature's call" ) {
                    const regenerationAmount = 2; // Amount of hit points to regenerate each iteration
                    let i = 0;
                    while (!pokemon1.hasFainted() && !pokemon2.hasFainted()) {
                        // Calculate the maximum hit points the attacker can have
                        const maxHitPoints = Math.min(pokemon1.hitPoints + regenerationAmount, pokemon1.originalHitPoints);
                        // Calculate the actual regeneration amount without exceeding maxHitPoints
                        const actualRegeneration = maxHitPoints - pokemon1.hitPoints;
                        // Regenerate hit points for the attacker
                        pokemon1.hitPoints += actualRegeneration;
                        console.log(`${pokemon1.name} regenerated ${actualRegeneration} hit points.`);
                        console.log(`${pokemon1.name} now has ${pokemon1.hitPoints} hit points.`);
    
                        i++; // Increment the loop counter
                    }
                }
    
                else {
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {
                        return pokemon2.takeDamage(pokemon1.attackDamage * 1.25);
                    }
                    else if (pokemon1.isWeakTo(pokemon2)) {
                        return pokemon2.takeDamage(pokemon1.attackDamage*0.75);
                    }
    
                    else {
                        return pokemon2.takeDamage(pokemon1.attackDamage)
                    }
    
                }
             
    
    
            }
    
            )
        }
        if (pokemon1.type == 'normal') {
            const pet1 = new Rattata(pokemon1.name, pokemon1.hitPoints, pokemon1.attackDamage);
            return pet1.useMove()
            .then(answers=>{ 
                
                    if (pokemon1.isEffectiveAgainst(pokemon2)) {
                       return pokemon2.takeDamage(pokemon1.attackDamage *1.25)
                    }
                    else if (pokemon1.isWeakTo(pokemon2)) {
                        return pokemon2.takeDamage(pokemon1.attackDamage * 0.75)
                    }
    
                    else {
                         return pokemon2.takeDamage(pokemon1.attackDamage)
                    }
    
                }
             
    
    
            
    
            )
         }

       
        
      }

    }

    const allPokemons = [new Charmander('', 85, 2), new Squirtle('', 3, 1), new Bulbasaur('', 2, 1), new Rattata('', 2, 1)]

module.exports = {
    Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle, chosenPokemon, allPokemons
};