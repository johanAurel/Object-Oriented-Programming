class Pokemon {
    
    constructor (name, num, att, move = 'tackle') {
        this.name = name
        this.hitPoints = num
        this.attackDamage = att
        this.move = move
    }
    takeDamage(damage){
    this.hitPoints -= damage;
    }
    useMove(){
        return`${this.name} used ${this.move}`;
        
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
    constructor (name, num, att, move = 'tackle') {
        super (name, num, att, move = 'tackle') 
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
    constructor (name, num, att, move = 'tackle') {
        super (name, num, att, move = 'tackle') 
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
    constructor (name, num, att, move = 'tackle') {
        super (name, num, att, move = 'tackle') 
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
    constructor (name, num, att, move = 'tackle') {
        super (name, num, att, move = 'tackle') 
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
        this.move = 'ember';
    }
    
}

class Squirtle extends Water {

    constructor(name, num, att){
        super(name, num, att)
        this.move = 'water gun';
    }
}

class Bulbasaur extends Grass {
    
    constructor(name, num, att){
        super(name, num, att)
        this.move = 'vine whip';
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
            //  console.log('The Pokeball is empty')
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
//console.log(emptyPokeball);
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
         pokeball.throw()
      } 
    }
    for(const pokeball of defender.belt){
        if(pokeball.contains()){
            pokeball.throw()
        }
    } 
       
    }

    battleCalculator(attackerP,defenderP){
        
     if(attackerP.isEffectiveAgainst(defenderP)){
        console.log(attackerP.useMove());
        defenderP.hitPoints = defenderP.hitPoints - ((attackerP.attackDamage)*1.25) ;   
        console.log(`${defenderP} is down ${attackerP.attackDamage*1.25}
        and is now ${defenderP.hitPoints}`)
        if(defenderP.hasFainted()){
            return `${defenderP.name} has fainted`
        }
        return defenderP
     } 
     else if(attackerP.isWeakTo(defenderP)){
        console.log(attackerP.useMove())
        defenderP.hitPoints = defenderP.hitPoints - ((attackerP.attackDamage)*0.75);
        console.log(`${defenderP.name} is down ${attackerP.attackDamage*0.75}
        and has now ${defenderP.hitPoints}hp`)
        if(defenderP.hasFainted()){
            return `${defenderP.name} has fainted`
        }
        return defenderP 
     }
    
    else{
        console.log(attackerP.useMove())
        defenderP.hitPoints = defenderP.hitPoints - attackerP.attackDamage
        console.log(`${defenderP} is down ${attackerP.attackDamage}
        and is now ${defenderP.hitPoints}`)
        if(defenderP.hasFainted()){
            return `${defenderP.name} has fainted`
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


yulia.catch(johan)
anthony.catch(lady)
brawl.fight(yulia, anthony)
brawl.battleCalculator(lady,johan)
// brawl.battleCalculator(lady,johan)
// brawl.battleCalculator(johan,lady)
// brawl.battleCalculator(lady, johan)
// brawl.battleCalculator(johan,lady)





module.exports = {Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer
};
