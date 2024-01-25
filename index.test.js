const {Pokemon, Fire, Water, Grass, Normal} = require('./index.js');

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
})