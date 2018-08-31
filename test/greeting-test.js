describe('The Greetings function' , function(){
    it('Should return the name entered by the user on the selected language' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      greetList.greet('Banele', 'English')
      assert.equal(greetList.greet('Banele', 'English'), 'Good day Banele');
      assert.equal(greetList.greetCount(), 1);
    });

    it('Should return the number of names entered by the user' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      greetList.greet('Banele', 'English');
      greetList.greet('Phindi', 'English');
      assert.equal(greetList.greetCount(), 2);
    });

    it('Should should not greet numbers, i.e return a message if the input is not a string' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      assert.equal(greetList.greet(1000, 'English'), "Name can't be a number");
      assert.equal(greetList.greet(1000, 'Afrikaans'), "Naam kan nie nommer wees nie");
      assert.equal(greetList.greet(1000, 'IsiXhosa'), "Nceda ufake igama elililo");
      assert.equal(greetList.greetCount(), 0);
    });

    it('Should should return a message if both inputs are empty' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      assert.equal(greetList.greet('', ''), 'Select a language');
      assert.equal(greetList.greetCount(), 0);
    });

    it('Should return the items inside the object' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      greetList.greet('Banele', 'English');
      greetList.greet('Phindi', 'English');
      assert.deepEqual(greetList.returnMap(), {banele: 1, phindi: 1} );
      assert.equal(greetList.greetCount(), 2);
    });

    it('Should return a message if the name is null, the message will be on the selected language' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      assert.equal(greetList.greet("",'English'), 'Please enter your name');
      assert.equal(greetList.greet("",'IsiXhosa'), 'Nceda ufake igama lakho');
      assert.equal(greetList.greet("",'Afrikaans'), 'Voer asseblief jou naam in');
      assert.equal(greetList.greetCount(), 0);
    });

    it('Should not greet a name twice regardless of the case (uppercase/lowercase)' , function(){
      var Obj = {};
      var greetList = Greeter(Obj);
      greetList.greet('Banele', 'English');
      greetList.greet('BANELE', 'English');
      assert.equal(greetList.greetCount(), 1);
    });

});
