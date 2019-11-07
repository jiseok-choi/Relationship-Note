var express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const { Friend, Event, Wedding, Visit } = require('../models');


router.use('uploads', express.static(path.join(__dirname, '../uploads')));

router.get('/getVisit', async (req, res, next) => {
    try{
        // const { params } = req.body;
        console.log('queryid',req.query.id);
        // if(id !== ''){
        let FindEvent;
        let Picture;
        const kind = await Event.findOne({ where: {id: req.query.id}})
        // console.log(kind);
        if(kind.kinds === 'wedding'){
            FindEvent = await Wedding.findOne({ where: {fk_eventId: req.query.id}})
        }
        // console.log('FindEvent',FindEvent.mainPicture);
        // console.log('__dirname',__dirname);
        // const temp = res.sendFile(FindEvent.mainPicture, {root: path.join(__dirname, '../uploads')});
        // Picture = <img src={path.join(__dirname, '../uploads',FindEvent.mainPicture)}/>
        // Picture = 
        
        return res.status(200).json(FindEvent.mainPicture);
        
        // console.log('temp ',path.join(__dirname, '../uploads',FindEvent.mainPicture))
        // return temp;
            // return res.status(201).json(friend);
        // }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});


router.post('/getVisitList', async (req, res, next) => {
    try{
        console.log('방명록 목록 getVisitList')
        const { id } = req.body.data;

        const visitList = await Visit.findAll({ 
            where: { fk_eventId: id },
            order: [['id', 'DESC']]
        });
        return res.status(201).json(visitList);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});


router.post('/newVisit', async (req, res, next) => {
    try{
        console.log('방명록작성 newVisit')
        const { name, contents, celebration, password, id } = req.body.data;

        const newVisit = await Visit.create({
            name,
            contents,
            celebration,
            password,
            fk_eventId: id
        });

        return res.status(201).json(true);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
