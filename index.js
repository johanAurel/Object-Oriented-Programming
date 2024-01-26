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
        console.log(`${this.name} used ${this.move}`);
        return this.attackDamage;
    }
    hasFainted(){
    if (this.hitPoints <=0 ) {
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
               } else {
            console.log('The Pokeball is already occupied.')
                      }
    } else {
           if (this.isEmpty()) {console.log('The Pokeball is empty')} else {
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
class Trainer extends Pokeball{
constructor(storeN = 6 ) {
   super();
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
  } else {return 'no empty Pokeballs'}
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

const train = new Trainer();
//train.belt = [new Pokeball(), new Pokeball()];
const okk = new Bulbasaur('okk', 2, 1);
const lady = new Squirtle('lady',3 , 5);

train.catch(okk);
// train.catch(lady);
console.log(train.belt);

// const go = train.getPokemon('okk');
// console.log(go);


module.exports = {Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer
};
