
const { Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle
} = require('./index.js');

const inquirer = require('inquirer');
const allPokemons = [new Charmander(), new Squirtle(), new Bulbasaur(), new Rattata()]

const trainer = {}
const pokemon = {}

function trainersName() {
    console.log('sorry previously we did not have your name, what are you called?? ')
    return inquirer.prompt({
        name: 'trainer1',
        message: 'PLAYER type your name',
        type: 'input'
    })
        .then(answers => {
            const trainer1 = answers.trainer1
            trainer.trainer1 = trainer1
            console.log(`${answers.trainer1} what is your adversary name?I mean what is your name trainer2?`)
            return inquirer.prompt({
                name: 'trainer2',
                message: 'CHALLENGER type your name',
                type: 'input'
            })
        })
        .then(result => {
            const trainer2 = result.trainer2;
            trainer.trainer2 = trainer2
            if (trainer.trainer1 !== null) {
                const trainer1 = trainer.trainer1
                console.log(`welcome to this new game ${trainer1}`)
                if (trainer.trainer2 !== null) {
                    const trainer2 = trainer.trainer2
                    console.log(`welcome ${trainer2}`)
                    console.log('ALL GET READY FOR THE BATTLE!!!')
                }
                else {
                    console.log('sadly there is no 2nd trainer ')
                        .then(() => {
                            console.log("you'd have to start all over again")
                            trainersName()
                        })

                }
            }
            return trainer
        })
        .catch(error => { console.log(error) })

}

function changeName(allPokemons, pokemonType, name) {
    for (i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        if (pokemonType == pokemon.type) {
            pokemon.name = name;
            console.log(pokemon)
            return pokemon
        }
    }
}

function chooseFirstPokemon() {
    let pokemonType1 = '';
    let pokemonType2 = '';
    return inquirer.prompt([{
        name: 'type',
        message: `${trainer.trainer1} choose the type of your first pokemon`,
        type: 'input'
    }])
        .then(answers => {
             pokemonType1 = answers.pokemon;

            return inquirer.prompt([{
                name: 'name',
                message: `${trainer.trainer1} choose the name of your first pokemon`,
                type: 'input'
        }])
        .then(answer => {
                    console.log(answer.name)
                    return changeName(pokemon, pokemonType1, answer.name)           
        })
        .then(pokemon => {
                  return  trainer1.belt[0].throw(pokemon)
        })
        .catch(err => {
                    return ('problem in the inner function')
        })
        })
        .then(() => {
            return inquirer.prompt([{
                name: 'type',
                message: `${trainer.trainer2} choose the type of your first pokemon`,
                type: 'input'
            }])
        .then(answers => {
                pokemonType2 = answers.pokemon;

                return inquirer.prompt([{
                    name: 'name',
                    message: `${trainer.trainer2} choose the name of your first pokemon`,
                    type: 'input'
                    }])
                    .then(answers => {
                            return changeName(pokemon, pokemonType2, answers.name)
                        })
                    .then(pokemon => {
                       return trainer2.belt[0].throw(pokemon)
                        })
                        .catch(err => {
                            return ('problem in the inner function')
                        })})
                        .catch(err => {
                            return ('problem with outer promise')
                        })
                })
        .catch(err => {
            return ('problem with overall promise')
        })

}



 const okk = new Bulbasaur('okk', 2, 1);
 const lady = new Squirtle('lady', 3, 1);
 const johan = new Charmander('johan', 85, 2);
 const pikachu = new Rattata('pikachu', 2, 1);

 chooseFirstPokemon()


// const pokemons = [okk, lady, johan, pikachu]

// const brawl = new Battle();
 const trainer1 = new Trainer(trainersName().trainer1)
 const trainer2 = new Trainer(trainersName().trainer2)

trainersName()
    .then(() => {
        console.log('They are 4 available pokemons to you which one do you want?')
        console.log('There is a Fire type, Charmander')
        console.log('There is a Water type, Squirtle')
        console.log('There is a Grass type, Bulbasaur')
        console.log('And finally, there is a normal type(boring to me), Ratata')

    })
    .then(() => {
        return chooseFirstPokemon()
    })
    .catch(err => {
        console.log(err)
    })





