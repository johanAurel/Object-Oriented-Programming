const inquirer = require('inquirer');


class Pokemon {

    constructor(name, num, att, move = ['tackle']) {
        this.name = name
        this.hitPoints = num
        this.attackDamage = att
        this.move = move
    }
    takeDamage(damage) {
        this.hitPoints -= damage;
    }
    useMove() {
        if (this.name) {
            inquirer.prompt([
                {
                    name: 'moveNumber',
                    message: `${this.name} used a move`,
                    // type: 'input'
                }
            ]).then(answers => {
                const moveNumber = parseInt(answers.moveNumber);
                if (!isNaN(moveNumber) && moveNumber >= 0 && moveNumber < this.move.length) {
                    console.log(`${this.name} used ${this.move[moveNumber]}`);
                } else {
                    console.log("Invalid move number. Please enter a valid number.");
                }
            });
        }

    }
    hasFainted() {
        if (this.hitPoints <= 0) {
            console.log(`${this.name} has fainted`)
            return true;
        } else {
            return false;
        }
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
        this.move = ['ember', 'burning feast', 'ember'];
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
            this.belt.push(new Pokeball()); // possibly instead of (new Pokeball()) -> ((new Pokeball).throw())
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
        console.log(trainer1, trainer2)
        for (let i = 0; i < trainer1.belt.length; i++) {
            const pokemon_t1 = trainer1.belt[i]
            const pokemon_t2 = trainer2.belt[i]
            
                return inquirer.prompt([{
                    name: 'pokemon',
                    message: `${trainer1.name} choose a pokemon`,
                    type: 'input'
                }])
                    .then(answers => {
                        if (answers.pokemon === Object.values(pokemon_t1)[0].name && Object.values(pokemon_t1)[0].hitPoints > 0) {
                            return trainer1.belt[i].throw();
                        }
                        else if(answers.pokemon === Object.values(pokemon_t1)[0].name && Object.values(pokemon_t1)[0].hitPoints <= 0){
                            console.log(`you can not use ${answers.pokemon} this pokemon has fainted!!!`)
                            return this.fight(trainer1, trainer2)
                        }
                        else if (pokemon_t1.pokemon !== null) {console.log(`no pokemon of the name ${answers.pokemon}`)
                        setTimeout(()=>{return this.fight(trainer1, trainer2)},3000)}
                    })
                    .then(() => {
                        return inquirer.prompt([{
                            name: 'pokemon',
                            message: `${trainer2.name} choose a pokemon`,
                            type: 'input'
                        }])
                            .then(answers => {
                                if (answers.pokemon === Object.values(pokemon_t2)[0].name && Object.values(pokemon_t2)[0].hitPoints > 0) {
                                    return trainer2.belt[i].throw();
                                }
                                else if(answers.pokemon === Object.values(pokemon_t2)[0].name && Object.values(pokemon_t2)[0].hitPoints <= 0){
                                    console.log(`you can not use ${answers.pokemon} this pokemon has fainted!!!`)
                                    return this.fight(trainer1, trainer2)
                                }
                                else if (pokemon_t2.pokemon !== null) {console.log(`no pokemon of the name ${answers.pokemon}`);
                                return this.fight(trainer1, trainer2)}
                            })
                    })
                    .catch(error => {

                        console.log('error with throwing pokeballs')
                    })
            
            // else if (pokemon_t1.pokemon==null){console.log(`${trainer1.name}you do not have this pokemon`)}
            
        }



        return [trainer1, trainer2]
    }


    battleCalculator(pokemon1, pokemon2) {

        if (pokemon1.useMove(2) && pokemon1.type === 'fire' || pokemon1.useMove(2) && pokemon1.type === 'water') {

            if (pokemon1.isEffectiveAgainst(pokemon2)) {
                console.log(pokemon1.useMove());
                pokemon2.takeDamage(pokemon1.attackDamage * 3.75);
                console.log(`${pokemon2.name} is down ${pokemon1.attackDamage * 3.75}
                and is now ${pokemon2.hitPoints}`)

                if (pokemon2.hasFainted()) {
                    return `${pokemon2.name} has fainted`
                }
                return pokemon2
            }

            else if (pokemon1.isWeakTo(pokemon2)) {
                console.log(pokemon1.useMove())
                pokemon2.takeDamage(pokemon1.attackDamage * 1.5);
                console.log(`${pokemon2.name} is down ${pokemon1.attackDamage * 1.5} and has now ${pokemon2.hitPoints}hp`)
                if (pokemon2.hasFainted()) {
                    return `${pokemon2.name} has fainted`
                }
                return pokemon2
            }

            pokemon2.takeDamage(3)
            console.log(`${pokemon2.name} is down ${pokemon1.attackDamage - 3}
         and is now ${pokemon2.hitPoints}`);
            return pokemon2

        }

        else if (pokemon1.useMove(2) && pokemon1.type === 'grass') {
            const regenerationAmount = 2; // Amount of hit points to regenerate each iteration
            let i = 0;
            while (!pokemon1.hasFainted() && !pokemon2.hasFainted()) {
                if (pokemon2.useMove()) {
                    // Logic for defender's move
                }
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
                console.log(pokemon1.useMove());
                pokemon2.hitPoints = pokemon2.hitPoints - ((pokemon1.attackDamage) * 1.25);
                console.log(`${pokemon2.name} is down ${pokemon1.attackDamage * 1.25}
         and is now ${pokemon2.hitPoints}`)

                if (pokemon2.hasFainted()) {
                    return `${pokemon2.name} has fainted`
                }
                return pokemon2
            }
            else if (pokemon1.isWeakTo(pokemon2)) {
                console.log(pokemon1.useMove())
                pokemon2.hitPoints = pokemon2.hitPoints - ((pokemon1.attackDamage) * 0.75);
                console.log(`${pokemon2.name} is down ${pokemon1.attackDamage * 0.75}
        and has now ${pokemon2.hitPoints}hp`)
                if (pokemon2.hasFainted()) {
                    return `${pokemon2.name} has fainted`
                }
                return pokemon2
            }

            else {
                console.log(pokemon1.useMove())
                defenderP.hitPoints = pokemon2.hitPoints - pokemon1.attackDamage
                console.log(`${pokemon2} is down ${pokemon1.attackDamage}
        and is now ${pokemon2.hitPoints}`)
                if (pokemon2.hasFainted()) {
                    return `${pokemon2.name} has fainted`
                }
            }

        }
    }
}

// const trainersName=()=>{
//     const trainer = {}
//     console.log('sorry previously we did not have your name, what are you called?? ') 
//   return inquirer.prompt({
//         name:'trainer1',
//         message:'trainer1 type your name',
//         type:'input'
//     })
//     .then(answers=>{
//        const trainer1 = answers.trainer1 
//        trainer.trainer1 = trainer1
//         console.log(`${answers.trainer1} what is your adversary name?`)
//         return inquirer.prompt({
//         name:'trainer2',
//         message:'trainer type your name',
//         type:'input'
//     })})
//     .then(result=>{
//         const trainer2 = result.trainer2;
//        trainer.trainer2 = trainer2
//        console.log(trainer)
//     })
//     .catch(error=>{console.log(error)})
    
// }

// trainersName()


// const lady = new Squirtle('lady', 3, 1);
// const johan = new Charmander('johan', 85, 2);
// const pikachu = new Rattata('pikachu', 2, 1);

// const yulia = new Trainer('yulia');
// const anthony = new Trainer('anthony');
// const brawl = new Battle();

// if(trainersName.trainer1 !==null)=
//  yulia.catch(johan)
// console.log(yulia.belt[0].pokemon.hitPoints)
// setTimeout(() => { anthony.catch(lady) }, 2000);
// setTimeout(() => { yulia.catch(okk) }, 4000)
// setTimeout(() => { anthony.catch(pikachu) }, 6000);
// setTimeout(() => { brawl.fight(yulia, anthony) }, 7000)
// setTimeout(()=>{brawl.battleCalculator(lady,johan)},10000)
// .then(()=>{ brawl.battleCalculator(lady,johan)})
// .then(()=>{brawl.battleCalculator(johan,lady)})
// .then(()=>{ brawl.battleCalculator(lady, johan)})


// setTimeout(()=>{ brawl.battleCalculator(johan,lady)},17000)





module.exports = {
    Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle
};