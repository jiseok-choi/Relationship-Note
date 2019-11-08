const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Event, Wedding } = require('../models');

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
    limits: { fileSize: 5000 * 1024 * 1024 }, //파일 사이즈 (500mb)
});

// router.post('/sendCreateWedding', isLoggedIn, upload.single([{ name: 'mainPicture' }, { name: 'subPicture' }]), async (req, res, next) => {
router.post('/sendCreateWedding', isLoggedIn, upload.array('Picture', 7), async (req, res, next) => {
    try{
        console.log('결혼행사 생성');
        // const { date, time, groom, birde, invite, groomFather, groomMother, birdeFather, birdeMother, lat, lng, post, weddingHall } = req.body.data;
        // let form = new FormData();
        // for(var key in req.body.data) {
        //     console.log('key: ' + key + 'value: '+req.body.data[key])
        // }
        const { date, time, groom, birde, invite, groomFather, groomMother, birdeFather, birdeMother, lat, lng, post, weddingHall } = req.body;

        const Picture = req.files;
        const userid = req.user.id;
        const MainPicture = await Picture.pop().filename;
        let SubPicture = '';
        
        await Picture.forEach((element) => {
            SubPicture = SubPicture + ';' + element.filename;
        });

        const newEvent = await Event.create({
            kinds : 'wedding',
            title : `${groom} 님과 ${birde} 님의 결혼식`,
            date: date,
            userid: userid,
        });

        const newWedding = await Wedding.create({
            date, time, groom, birde, invite, 
            groomFather, groomMother, birdeFather, birdeMother, 
            mainPicture:MainPicture, subPicture: SubPicture,
            lat, lng, 
            post, weddingHall, userid, 
            fk_eventId: newEvent.id
        });

        return res.status(201).json(true);

    } catch(e) {
        console.error(e);
        return next(e);
    }
});


router.get('/getEvents', isLoggedIn, async (req,res,next) => {
    try{
        const eventList = await Event.findAll({ 
            where: {userid: req.user.id},
            order: [['date', 'DESC']]
        });
        console.log(eventList);
        return res.status(200).json(eventList);
    }catch(e) {
        console.error(e);
        return next(e);
    }
});


router.post('/getInvitation/wedding', async (req,res,next) => {
    try{
        const wedding = await Wedding.findOne({ 
            where: {fk_eventId: req.body.data.id}
        });
        return res.status(200).json(wedding);
    }catch(e) {
        console.error(e);
        return next(e);
    }
});


module.exports = router;