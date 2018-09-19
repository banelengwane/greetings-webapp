// let assert = require('assert');
// let Greeter = require('../greeting');

// describe('The Greetings function' , function(){
//     it('Should return the name entered by the user on the selected language' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       greetList.greet('Banele', 'English')
//       assert.equal(greetList.greet('Banele', 'English'), 'Good day Banele');
//       assert.equal(greetList.greetCount(), 1);
//     });

//     it('Should return the number of names entered by the user' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       greetList.greet('Banele', 'English');
//       greetList.greet('Phindi', 'English');
//       assert.equal(greetList.greetCount(), 2);
//     });

//     it('Should should not greet numbers, i.e return a message if the input is not a string' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       assert.equal(greetList.greet(1000, 'English'), "Name can't be a number");
//       assert.equal(greetList.greet(1000, 'Afrikaans'), "Naam kan nie nommer wees nie");
//       assert.equal(greetList.greet(1000, 'IsiXhosa'), "Nceda ufake igama elililo");
//       assert.equal(greetList.greetCount(), 0);
//     });

//     it('Should should return a message if both inputs are empty' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       assert.equal(greetList.greet('', ''), 'Select a language');
//       assert.equal(greetList.greetCount(), 0);
//     });

//     it('Should return the items inside the object' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       greetList.greet('Banele', 'English');
//       greetList.greet('Phindi', 'English');
//       assert.deepEqual(greetList.returnMap(), {banele: 1, phindi: 1} );
//       assert.equal(greetList.greetCount(), 2);
//     });

//     it('Should return a message if the name is null, the message will be on the selected language' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       assert.equal(greetList.greet("",'English'), 'Please enter your name');
//       assert.equal(greetList.greet("",'IsiXhosa'), 'Nceda ufake igama lakho');
//       assert.equal(greetList.greet("",'Afrikaans'), 'Voer asseblief jou naam in');
//       assert.equal(greetList.greetCount(), 0);
//     });

//     it('Should not greet a name twice regardless of the case (uppercase/lowercase)' , function(){
//       var Obj = {};
//       var greetList = Greeter(Obj);
//       greetList.greet('Banele', 'English');
//       greetList.greet('BANELE', 'English');
//       assert.equal(greetList.greetCount(), 1);
//     });

// });
const assert = require('assert');
const Greeter = require('../greeting');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost/greetings';

const pool = new Pool({
  connectionString
});

describe('Greeting widget', function () {
  beforeEach(async function () {
      await pool.query('delete from names');
  });

  it('Should return users greeted', async function () {
      let greetings = Greeter(pool);
      await greetings.greet('banele', 'English');
      await greetings.greet('zuko', 'English');
      await greetings.greet('george', 'English');
      let greeted = await greetings.greetCounter();

      assert.strictEqual(greeted, 3);
  });

  after(function () {
      pool.end();
  });
});