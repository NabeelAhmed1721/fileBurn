const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser());
const cookieExpireTime = 15000;

//Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Upload Init
const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000}
}).single('fileUpload');

router.get('/upload', (req, res)=>{
    //res.clearCookie('accessTicket');
    res.clearCookie('accessDataNewName');
    res.clearCookie('accessDataOriginalName');
    res.clearCookie('accessDataSize');
    res.render('upload');
});

router.post('/upload', (req, res)=>{
    upload(req, res, (err) => {
        if(err){
            res.render('upload', {response: err});
        } else {
            if(req.file === undefined) {
                res.render('upload', {response: "Please Upload a file"});
            } else {
                console.log(req.file);
                //Generate a unique cookie for Authenticity. -> Random HEX (do it soon)
                //res.cookie('accessTicket', (req.file.filename).toString(), {expire: new Date() + 300000});
                res.cookie('accessDataNewName', (req.file.filename).toString(), {expires: new Date(Date.now() + cookieExpireTime)});
                res.cookie('accessDataOriginalName', (req.file.originalname).toString(), {expires: new Date(Date.now() + cookieExpireTime)});
                res.cookie('accessDataSize', (req.file.size).toString(), {expires: new Date(Date.now() + cookieExpireTime)});
                res.redirect('success');
            }
        }
    })
});

module.exports = router;