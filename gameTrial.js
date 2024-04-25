
const { Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle
} = require('./index.js');

const inquirer = require('inquirer');

const allPokemons = [new Charmander('',85,2), new Squirtle('',3,1), new Bulbasaur('',2,1), new Rattata('',2,1)]
const types = [/fire/i, /water/i, /grass/i, /normal/i]
const trainer = {};
const brawl = new Battle();



function trainersName() {
    console.log('sorry previously we did not have your name, what are you called?? ')
    return inquirer.prompt({
        name: 'trainer1_name',
        message: 'PLAYER type your name',
        type: 'input'
    })
    .then(answers => {
            const trainer1_name = answers.trainer1_name
            trainer.trainer1 = trainer1_name
            console.log(`${trainer1_name} what is your adversary name?I mean what is your name trainer2?`)
            return inquirer.prompt({
                name: 'trainer2_name',
                message: 'CHALLENGER type your name',
                type: 'input'
            })
    })
    .then(result => {
            const trainer2_name = result.trainer2_name;
            trainer.trainer2 = trainer2_name
            if (trainer.trainer1 !== null) {
                const trainer1_name = trainer.trainer1
                console.log(`welcome to this new game ${trainer1_name}`)
                if (trainer.trainer2 !== null) {
                    const trainer2_name = trainer.trainer2
                    console.log(`welcome ${trainer2_name}`)
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

function changeName( pokemonType, chosenName) {

    for (let i = 0; i < allPokemons.length ; i++) {
        const pokemon = allPokemons[i];
        if (pokemonType == pokemon.type) {
            pokemon.name = chosenName;
            console.log(pokemon)
            return pokemon
        }
    }
}

function showcasePokemon() {
    function logWithDelay(message, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(message);
                resolve();
            }, delay);
        });
    }

    // Define messages and their respective delays
    const messages = [
        { message: 'They are 4 available pokemons to you which one do you want?', delay: 1500 },
        { message: 'There is a Fire type, Charmander', delay: 2000 },
        { message: 'There is a Water type, Squirtle', delay: 2500 },
        { message: 'There is a Grass type, Bulbasaur', delay: 3000 },
        { message: 'And finally, there is a normal type(boring to me), Ratata', delay: 3500 },
        {message: 'HAHAHA!!!', delay: 3800},
        {message: '....' , delay: 4000},
        {message: 'Excuse me', delay: 4200},
        {message: 'so...what type would you like to have?',delay:4300}
    ];

    // Loop through each message and display with appropriate delay
    async function displayMessages() {
        for (const { message, delay } of messages) {
            await logWithDelay(message, delay);
        }
    }

    // Call the function to display messages sequentially
    displayMessages();
}

 function chooseFirstPokemonT1(player){
    let pokemonType1 = '';
    
    return inquirer.prompt([{
        name: 'type',
        message: `${player.name} choose the type of your first pokemon`,
        type: 'list',
        choices:['fire','water','grass','normal']
    }])

        .then(answers => {
          pokemonType1 = answers.type;

          for(const value of types){
            
             if(value.test(pokemonType1)){ return inquirer.prompt([{
                name: 'name',
                message: `${player.name} choose the name of your first pokemon`,
                type: 'input'
               }])
               .then(answer => {
                    console.log(`pokemon type is ${pokemonType1} and name ${answer.name}`)
                    return changeName(pokemonType1, answer.name)           
               })
                .then(pokemon => {
                  return  player.belt[0].throw(pokemon)
                })
                .catch(err => {
                    console.log(err)
                })}

               

            }   return chooseFirstPokemonT1(player)
})}

function chooseFirstPokemonT2(player){
            let pokemonType2 = '';
            return inquirer.prompt([{
                name: 'type',
                message: `${player.name} choose the type of your first pokemon`,
                type: 'list',
                choices:['fire','water','grass','normal']
            }])
            .then(answers => {
                pokemonType2 = answers.type;

                for(const value of types){
                    
                    if(value.test(pokemonType2)){ 
                       
                       return inquirer.prompt([{
                       name: 'name',
                       message: `${player.name} choose the name of your first pokemon`,
                       type: 'input'
                       }])
                        .then(answers => {
                            console.log(`pokemon type is ${pokemonType2} and name ${answers.name}`)
                            return changeName(pokemonType2, answers.name)
                        })
                        .then(pokemon => {
                            return player.belt[0].throw(pokemon)
                        })
                        .catch(err => {
                            console.log(err)
                        })}
                    
                     
                }console.log(`sorry there is no ${answers.type} type`)
                 return chooseFirstPokemonT2(player)
            })
               
                        .catch(err => {
                            return ('problem with outer promise')
                        })
                        
}

function choosePokemon(player){
    return inquirer.prompt([{
        name:'boolean',
        message:`hey ${player.name},do you want another pokemon??There are more left`,
        type:'list',
        choices:['no','yes']
    }])
    .then(answer=>{
        if(answer.boolean === 'yes'){

            return inquirer.prompt([{
                name:'type',
                message:`please ${player.name}choose another type of pokemon`,
                type:'list',
                choices:['fire','water','grass','normal']
                },{
                    name:'name',
                    message:`${player.name}!!!!name the pokemon, preferrably a different name to the other`,
                    type:'input' 
                }
                ])
                .then(answer=>{
                for(const pokemon of allPokemons){
                for(let i = 0; i < player.belt.length; i++){
                const element = player.belt[i]
                if(element.pokemon.type==answer.type){
                console.log(`${answer.name} is just another version of ${player.belt[0].pokemon.name}, choose another one please`)
                return choosePokemon(player)
                 }
                else if(element.pokemon.type!== answer.type){
                    return changeName(answer.type, answer.name) 
                     }
                }
            
                }  
                })
                .then(pokemon => {
                    return player.catch(pokemon)
                })
                .catch(err=>{
                    console.log(err)
                })
         
            
        }
        else{
            return 'ok...your choice'
        } 
    })
    .catch(err=>{
        console.log(err)
    })
}



trainersName()      // - choose names of 2 players
.then(trainer => {
     player1 = new Trainer(trainer.trainer1);
     player2 = new Trainer(trainer.trainer2);    
})
// .then(()=>{showcasePokemon()}) // - kinda have a problem with because it comes up simultaneously with the next fxn
.then(()=>{return chooseFirstPokemonT1(player1)})// - name your pokemon or let it be default
.then(()=>{return chooseFirstPokemonT2(player2)})// - name your pokemon or let it be default
.then(()=>{return choosePokemon(player1)})
.then(()=>{return choosePokemon(player2)})
.then(()=>{console.log(player1);
console.log(player2)})
.then(()=>{return brawl.fight(player1,player2)})// - initiate fight
.catch(err=>{console.log(err)})























