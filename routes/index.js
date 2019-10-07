const express = require('express');
const fs = require('fs');
const router = express.Router();
const directoryPath = './public/uploads/';

const cookieParser = require('cookie-parser');
router.use(cookieParser());

//Index ~ Homepage
router.get('/', (req, res)=>{
    //res.clearCookie('accessTicket');
    res.clearCookie('accessDataNewName');
    res.clearCookie('accessDataOriginalName');
    res.clearCookie('accessDataSize');
    const uploadList = [];
    fs.readdirSync(directoryPath).forEach(file => {
        uploadList.push(file);
    });
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    res.render('index', {
        message: 'Welcome! '+("It is "+year + "-" + month + "-" + date),
        uploadList: uploadList.filter(upload => upload != "blank") //Make sure blank doesn't get added to list
    });
});

module.exports = router;