module.exports = function GreetingsRoute(greetings) {
    async function toGreet(req, res) {
        let textArea = req.body.greetingArea;
        let lang = req.body.language;
        try {
            let myGreet = await greetings.greet(textArea, lang);
            res.render('home', { count: await greetings.greetCount(), greet: myGreet });
        } catch (err) {
            //error
        }

    }

    async function greeted(req, res) {
        try {
            res.render('greeted', {
                greet: await greetings.getGreetData()
            });
        } catch (err) {
            //err
        }
    }

    async function counted(req, res){
        try{
            res.render('home',{count: await greetings.greetCount()});
        } catch(err){
            //err
        }
      }

    async function clear(req, res){
        try{
            res.render('home')
        }catch (err){
            console.log(err);
        }
    }
    //return functions
    return {
        toGreet,
        greeted,
        counted,
        clear
    }

}