const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'pug'); //view engine set
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',(req,res)=>{
    res.render('index', {title: 'fileburn.', message: 'Welcome!'});
});


app.use((req, res, next) => {
    return res.status(404).render('404', { message: req.url+' was not found :(' });
});


app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}`);
});