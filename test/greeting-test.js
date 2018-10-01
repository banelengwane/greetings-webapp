const assert = require('assert');
const Greeter = require('../greeting');
const pg = require('pg');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost/greetings';

const pool = new Pool({
    connectionString
});

describe('Greeting widget', function () {
    
    beforeEach( async function () {
        await pool.query('delete from names;');
    });
    it('Should return a greeting for a name entered', async function () {
        let greetings = Greeter(pool);
        let greeting1 = await greetings.greet('banele', 'English');
        assert.strictEqual(greeting1, 'Good day banele');
    });

    it('should have a counter of 1 after greeting 1 user twice', async function () {
        let greetings = Greeter(pool);
        await greetings.greet('banele', 'English');
        await greetings.greet('banele', 'English');

        let counter = await greetings.greetCount();
        assert.strictEqual(1, counter);
    // assert.strictEqual(greeting1, 'Good day banele');
    });

    it('Should return a greeting and count the number of greetings', async function () {
        let greetings = Greeter(pool);
        let greeting = await greetings.greet('Busisile', 'IsiXhosa');
        let greeting2 = await greetings.greet('Banele', 'English');
        let count = await greetings.greetCount();
        assert.strictEqual(greeting, 'Molo Busisile');
        assert.strictEqual(greeting2, 'Good day Banele');
        assert.strictEqual(count, 2);
    });

    it('Should clear the database', async function () {
        let greetings = Greeter(pool);
        let greeting = await greetings.greet('Busisile', 'IsiXhosa');
        let greeting2 = await greetings.greet('Banele', 'English');
        let count = await greetings.greetCount();
        assert.strictEqual(greeting, 'Molo Busisile');
        assert.strictEqual(greeting2, 'Good day Banele');
        assert.strictEqual(count, 2);
        assert.deepStrictEqual(await greetings.clearValues(), { reset: [], id: [] });
    });

    it('should return all names in the db', async function () {
        let greetings = Greeter(pool);
        let greeting = await greetings.greet('Busisile', 'IsiXhosa');
        let greeting2 = await greetings.greet('Banele', 'English');
        let count = await greetings.greetCount();
        assert.strictEqual(greeting, 'Molo Busisile');
        assert.strictEqual(greeting2, 'Good day Banele');
        assert.strictEqual(count, 2);
        assert.deepStrictEqual(await greetings.greetedUsers(), [ { user_name: 'busisile' }, { user_name: 'banele' } ]);
    });

    after(function () {
        pool.end();
    });
});
