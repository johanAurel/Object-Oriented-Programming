const {Pokemon, Fire, Water, Grass, Normal, Bulbasaur, Pokeball, Trainer, Rattata, Squirtle, Charmander} = require('./index.js');

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

    test('class Pokeball testing - isEmpty',()=>{
        const poke = new Pokeball();
        const okk = new Bulbasaur('okk',2,1);
        poke.throw(okk)
        expect(poke.isEmpty()).toBe(false);
    })
    test('class Pokeball testing - contains',()=>{
        const poke = new Pokeball();
        const okk = new Bulbasaur('okk',2,1);
        poke.throw(okk)
        expect(poke.contains()).toBe('okk');
    })

    test('class Pokeball testing - trow',()=>{
        const poke = new Pokeball();
        expect(poke.throw()).toBe(undefined);
    })

    xtest('class Pokeball testing - trow(something)',()=>{
        const poke = new Pokeball();
        const okk = new Bulbasaur('okk',2,1);
        poke.throw('okk');
        expect(console.log).toBe('You caught okk');
    })})
// tests for Trainer
describe("Trainer's test",()=>{
    test('to know if belt is an instance of pokeball',()=>{
    const train = new Trainer();
    // const okk = new Bulbasaur('okk', 2, 1);
    // train.catch(okk);
    expect(train.belt.every((item)=> item instanceof Pokeball)).toBe(true);
    })
     test('to know if you are catching a pokemon',()=>{
        const train = new Trainer();
        const okk = new Bulbasaur('okk', 2, 1);
        train.catch(okk);
        expect(train.belt.some((item)=>!item.isEmpty())).toBe(true);
        })
    test("to know when we didn't catch a pokemon",()=>{
            const train = new Trainer();
            const okk = new Bulbasaur('okk', 2, 1);
            const lady = new Rattata('lady',1,2);
            const not=new Squirtle('not',3,9);
            const naimh=new Charmander('naimh',1);
            const finalOne=new Charmander('finalOne',87,90);
            const realFinalOne=new Squirtle('realFinalOne',100,100);
            const anthony=new Rattata('anthony',1,1)
            train.catch(okk);
            train.catch(lady);
            train.catch(not)
            train.catch(naimh)
            train.catch(finalOne)
            train.catch(realFinalOne)

            expect(train.catch(anthony)).toBe('no empty Pokeballs');
            })
    test('try and catch a non existent pokemon',()=>{
        const train = new Trainer();
        
        expect(train.getPokemon(okk)).toEqual(new Error);
        })
    })    
        
     





