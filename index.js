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

const charlie = new Fire('Charlie', 20, 30);
const mary = new Water('Mary', 10, 10);
const ted = new Grass('Ted', 4, 10);
const anthony = new Normal('Anthony', 2, 5);

console.log(charlie.isWeakTo(mary)); //true
console.log(charlie.isWeakTo(ted)); // false
console.log(mary.isWeakTo(ted)); // true
console.log(anthony.isWeakTo(ted)); //false

module.exports = {Pokemon, Fire, Water, Grass, Normal};
