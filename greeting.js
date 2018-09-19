module.exports = function Greeter(pool) {
  var empty = '';
  var tempObj = {};

  async function greet(name, taal) {

    if (!taal) {
      return 'Select a language'
    }

    if (name !== "" && !isNaN(name)) {
      if (taal === 'English') {
        return "Name can't be a number";
      } else if (taal === 'IsiXhosa') {
        return 'Nceda ufake igama elililo';
      } else if (taal === 'Afrikaans') {
        return "Naam kan nie nommer wees nie";
      }

    }

    if (!name) {
      if (taal === 'English') {
        return 'Please enter your name';
      } else if (taal === 'IsiXhosa') {
        return 'Nceda ufake igama lakho';
      } else if (taal === 'Afrikaans') {
        return "Voer asseblief jou naam in";
      }
    }

    //if(Number.isNaN(Number(name))){
    var taken = name.toLowerCase();
    if (tempObj[taken] === undefined) {
      tempObj[taken] = 0;
      await pool.query('insert into names(user_name, counter) values($1, $2)', [taken, tempObj[taken]])
    }
    if (tempObj[taken] === 1) { }
    else {
      tempObj[taken] += 1;
      await pool.query('update names set counter = $1 where user_name = $2', [tempObj[taken], taken])
    }
    if (taal === 'English') {
      return 'Good day ' + name;
    } else if (taal === 'Afrikaans') {
      return 'Goeie daag ' + name;
    } else if (taal === 'IsiXhosa') {
      return 'Molo ' + name;
    }
    //}

  }

  async function getName(name) {
    return name;
  }

  async function getLang(taal) {
    return taal;
  }

  async function getGreetData() {
    return {
      name: getName(),
      language: getLang(),
      timestamp: new Date(),
      count: greetCount()
    }
  }

  async function greetCount() {
    var sum = 0;
    for (var key in tempObj) {
      if (tempObj.hasOwnProperty(key)) {
        sum++;
      }
    }
    return sum;
    //return tempObj.keys.length;
  }
  function returnMap() {
    return tempObj;
  }

  function clean() {

    tempObj = {};
  }
  return {
    greet,
    getGreetData,
    greetCount,
    returnMap,
    clean
  };
}