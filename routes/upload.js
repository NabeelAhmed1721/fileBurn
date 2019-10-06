const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

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
                res.render('upload', {response: "Image Uploaded!", link: req.file.filename});
            }
        }
    })
});

module.exports = router;