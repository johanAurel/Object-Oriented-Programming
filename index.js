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
       this.pokemon
    }
   isEmpty(){
    if(this.contains){return false}
    return true
   }
   throw(pokemon){
   if(this.pokemon){
    console.log(`Go pokemon`)
   }
   else{
    console.log(`you caught ${pokemon.name}`)
    return pokemon
   }
   }
}

const poke= new Pokeball;
const ok= new Bulbasaur('ok',2,1);

console.log(poke.throw());
console.log(poke.throw('ok'));



module.exports = {Pokemon, Fire, Water, Grass, Normal,
    Charmander, Squirtle, Bulbasaur, Rattata
};
