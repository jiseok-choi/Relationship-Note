const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

fs.readdir('uploads', (error) => {
    if (error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({ //멀터를 사용하면 upload 객체를 받을 수 있다.
    storage: multer.diskStorage({ //어디에 저장할지? 서버디스크에 이미지를 저장하겠다는 의미
        destination(req, file, cb) { //파일이 저장될 경로
            cb(null, 'uploads/'); //cb(에러, 결과값)
        },
        filename(req, file, cb) { //파일이름
            const ext = path.extname(file.originalname); //확장자 가져오기
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext); //basename 은 확장자 이외 이름
        },
    }),
    limits: { fileSize: 50 * 1024 * 1024 }, //파일 사이즈 (5mb)
});

// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

// router.post('/sendCreateWedding', isLoggedIn, upload.single([{ name: 'mainPicture' }, { name: 'subPicture' }]), async (req, res, next) => {
router.post('/sendCreateWedding', isLoggedIn, upload.array('Picture', 7), async (req, res, next) => {
    try{
        console.log('결혼행사 생성');
        
        const formdata = req.body;
        
        console.log(req.files);
        console.log(req.body.data);


    } catch(e) {
        console.error(e);
        return next(e);
    }
});




module.exports = router;