const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

//Force a https connection
//Made for Heroku
app.use((req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
});

//Server Initializes
app.set('view engine', 'pug'); // view engine set
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public')); // static public folder

//Index Router
app.get('/',(req,res)=>{
    res.render('index', {message: 'Welcome!'});
});

//404 Router
app.use((req, res, next) => {
    return res.status(404).render('404', { message: req.url+' was not found :(' });
});

//Listen
app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}`);
});