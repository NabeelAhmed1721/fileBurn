const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.get('/success', (req, res)=>{
    res.render('success');
    console.log(req.cookies);
});

module.exports = router;