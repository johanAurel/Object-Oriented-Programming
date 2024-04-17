const inquirer = require( 'inquirer')


class Pokemon {
    
    constructor (name, num, att, move = ['tackle']) {
        this.name = name
        this.hitPoints = num
        this.attackDamage = att
        this.move = move
    }
    takeDamage(damage){
    this.hitPoints -= damage;
    }
   useMove() {
        inquirer.prompt([
            {
                name: 'moveNumber',
                message: `${this.name} used a move`,
                type: 'input'
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
    hasFainted(){
    if (this.hitPoints <=0 ) {
        console.log(`${this.name} has fainted`)
        return true;
    } else {
        return false;
    }
    }
   
}

class Fire extends Pokemon {
    constructor (name, num, att, move = ['tackle']) {
        super (name, num, att, move = ['tackle']) 
        this.type = 'fire'
    }
    isEffectiveAgainst(name){
        return name.type === 'grass'
    }
    isWeakTo(name) {
        return name.type === 'water'
    }
}

class Water extends Pokemon {
    constructor (name, num, att, move = ['tackle']) {
        super (name, num, att, move = ['tackle']) 
        this.type = 'water'
    }
    isEffectiveAgainst(name){
        return name.type === 'fire'
    }
    isWeakTo(name) {
        return name.type === 'grass'
    }
}

class Grass extends Pokemon {
    constructor (name, num, att, move = ['tackle']) {
        super (name, num, att, move = ['tackle']) 
        this.type = 'grass'
    }
    isEffectiveAgainst(name){
        return name.type === 'water'
    }
    isWeakTo(name) {
        return name.type === 'fire'
    }
}

class Normal extends Pokemon {
    constructor (name, num, att, move = ['tackle']) {
        super (name, num, att, move = ['tackle']) 
        this.type = 'normal'
    }
    isEffectiveAgainst(name){
        return false
    }
    isWeakTo(name) {
        return false
    }
}

class Charmander extends Fire{
    constructor(name, num, att){
        super(name, num, att)
        this.move = ['ember', 'burning feast','ember'];
    }
    
}

class Squirtle extends Water {

    constructor(name, num, att){
        super(name, num, att)
        this.move =['tackle','water gun',"tsunami"] ;
    }
}

class Bulbasaur extends Grass {
    
    constructor(name, num, att){
        super(name, num, att)
        this.move =['tackle', 'vine whip',"mothernature's call"];
    }
}

class Rattata extends Normal {
    
    constructor(name, num, att){
        super(name, num, att)
    }
}

class Pokeball{

    constructor(){
        
       this.pokemon = null;
    }

  throw(pokemoN){
    if(pokemoN) {
        
        if(this.isEmpty()) {            
            this.pokemon = pokemoN;          
            console.log(`You caught ${pokemoN.name}`);  
        } 
        else {
          
            console.log('The Pokeball is already occupied.') ;
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

   isEmpty(){
    return this.pokemon === null;
   }

   contains(){
    return this.isEmpty() ? 'empty...' : this.pokemon.name;
     }   

}

class Trainer {

   constructor(storeN = 6 ) {
        
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
       else {return 'no empty Pokeballs'}
    }

  getPokemon(name) {
    for (const item of this.belt) {
        if (name === item.contains()) {
            return item.throw();}
    }
    console.log(`No Pokemon ${name} found`);
   
    return null;
    }
}

class Battle extends Trainer{
    constructor(){
        super();
        
    }

    fight(attacker,defender){

    for(const pokeball of attacker.belt){
      if(pokeball.contains()){
         pokeball.throw();
      }  
      else{console.log(' pokeball is empty')}
    
    }
    for(const pokeball of defender.belt){
        if(pokeball.contains()){
            setTimeout(()=>{pokeball.throw()},3000)
        }
        else{console.log(' pokeball is empty')}
      
    } 
       
    }

    battleCalculator(attacker,defender){
    
        if(attacker.useMove(2)){
          //  if(attacker.move(2) === 'burning feast' || attacker.move(2)==='tsunami'){}
         defender.hitPoints = defender.hitPoints - 3
         console.log(`${defender.name} is down ${attacker.attackDamage-3}
         and is now ${defender.hitPoints}`);
         return defender

        }

        // else if(attacker.move === "mothernature's call"){
        //  for ( let i = 2; i<attacker.hitPoints; i++){
        //     if(attacker.takeDamage() < attacker.hitPoints){
        //         attacker.hitPoints= attacker.hitPoints
        //     }
        //  }   
        //  }  
     if(attacker.isEffectiveAgainst(defender)){
         if(attacker.useMove(2)){
            defender.hitPoints = defender.hitPoints - ((attacker.attackDamage)*3)
            console.log(`${defender.name} is down ${attacker.attackDamage*3}
            and is now ${defender.hitPoints}`);
            return defender
          } 
        console.log(attacker.useMove());
        defender.hitPoints = defender.hitPoints - ((attacker.attackDamage)*1.25) ;   
        console.log(`${defender.name} is down ${attacker.attackDamage*1.25}
        and is now ${defender.hitPoints}`)
        
        if(defender.hasFainted()){
            return `${defender.name} has fainted`
        }
        return defender
     } 
     else if(attacker.isWeakTo(defender)){
        console.log(attacker.useMove())
        defender.hitPoints = defender.hitPoints - ((attacker.attackDamage)*0.75);
        console.log(`${defender.name} is down ${attacker.attackDamage*0.75}
        and has now ${defender.hitPoints}hp`)
        if(defender.hasFainted()){
            return `${defender.name} has fainted`
        }
        return defender 
     }
    
    else{
        console.log(attacker.useMove())
        defenderP.hitPoints = defender.hitPoints - attacker.attackDamage
        console.log(`${defender} is down ${attacker.attackDamage}
        and is now ${defender.hitPoints}`)
        if(defender.hasFainted()){
            return `${defender.name} has fainted`
        }
       
    }
    }}
  
 



const okk = new Bulbasaur('okk',2,1);
const lady = new Squirtle('lady',3,1);
const johan = new Charmander('johan',85,2);
const pikachu = new Rattata('pikachu',2,1);

const yulia = new Trainer();
const anthony = new Trainer();
const brawl = new Battle();



setTimeout(()=>{yulia.catch(johan)}, 1000)
setTimeout(()=>{anthony.catch(lady)},3000)
.then(()=>{brawl.fight(yulia, anthony)})
.then(()=>{brawl.battleCalculator(lady,johan)})
.then(()=>{ brawl.battleCalculator(lady,johan)})
.then(()=>{brawl.battleCalculator(johan,lady)})
.then(()=>{ brawl.battleCalculator(lady, johan)})


setTimeout(()=>{ brawl.battleCalculator(johan,lady)},17000)





module.exports = {Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer
};