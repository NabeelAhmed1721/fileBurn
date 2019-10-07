const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.get('/success', (req, res)=>{
    /*Make a function to check for cookie authenticity -> in case someone injects fraud
    cookies, check if they are in a Database or JSON.*/

    //CHANGE THIS SOON! CHANGE TO TICKET!
    if(req.cookies.accessDataNewName){
        res.render('success', {
            link: '/uploads/'+(req.cookies.accessDataNewName),
            newName: req.cookies.accessDataNewName,
            originalName: req.cookies.accessDataOriginalName,
            size: req.cookies.accessDataSize
        });
        console.log(req.cookies.accessTicket);
    } else {
        res.redirect('./');
    }
});

module.exports = router;