const express = require('express');
const router = express.Router();

//Index ~ Homepage
router.get('/', (req, res)=>{
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    res.render('index', {message: 'Welcome! '+("It is "+year + "-" + month + "-" + date)});
});

module.exports = router;