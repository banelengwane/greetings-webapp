module.exports = function Greeter (pool) {
    async function greet (name, taal) {
        if (!taal) {
            return 'Select a language';
        }

        if (name !== '' && !isNaN(name)) {
            if (taal === 'English') {
                return "Name can't be a number";
            } else if (taal === 'IsiXhosa') {
                return 'Nceda ufake igama elililo';
            } else if (taal === 'Afrikaans') {
                return 'Naam kan nie nommer wees nie';
            }
        }

        if (!name) {
            if (taal === 'English') {
                return 'Please enter your name';
            } else if (taal === 'IsiXhosa') {
                return 'Nceda ufake igama lakho';
            } else if (taal === 'Afrikaans') {
                return 'Voer asseblief jou naam in';
            }
        }

        // if(Number.isNaN(Number(name))){
        var taken = name.toLowerCase();

        // ask the db is the user in there ?
        const userCountResult = await pool.query('select count(*) from names where user_name = $1', [taken]);
        const userCount = Number(userCountResult.rows[0].count);
        if (userCount === 0) {
            // if not there add the user in the database with a counter of 1
            await pool.query('insert into names(user_name, counter) values($1, 1)', [taken]);
        } else {
            await pool.query('update names set counter = counter + 1 where user_name = $1', [taken]);
        }
        // if yes increment the counter for the user with 1

        if (taal === 'English') {
            return 'Good day ' + name;
        } else if (taal === 'Afrikaans') {
            return 'Goeie daag ' + name;
        } else if (taal === 'IsiXhosa') {
            return 'Molo ' + name;
        }
        // }
    }

    async function getName (name) {
        return name;
    }

    async function getLang (taal) {
        return taal;
    }

    async function getGreetData () {
        return {
            name: getName(),
            language: getLang(),
            timestamp: new Date(),
            count: greetCount()
        };
    }

    async function greetCount () {
        let countResults = await pool.query('select count(*) from names');
        let sum = Number(countResults.rows[0].count);
        return sum;
    }

    // function returnMap () {
    //     return tempObj;
    // }

    // function clean () {
    //     tempObj = {};
    // }

    return {
        greet,
        getGreetData,
        greetCount
    };
};
