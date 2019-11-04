var express = require('express');
const path = require('path');
const router = express.Router();
const { Friend, Event, Wedding } = require('../models');


router.post('/newVisit', async (req, res, next) => {
    try{
        const friendList = await Friend.findAll({ where: {userid: req.user.id}})
        return res.status(201).json(friendList);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

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
        return res.status(200).send(path.join(__dirname, '../uploads',FindEvent.mainPicture));
        // console.log('temp ',path.join(__dirname, '../uploads',FindEvent.mainPicture))
        // return temp;
            // return res.status(201).json(friend);
        // }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.get('/getVisit2', async (req, res, next) => {
    try{
        const { name, relationship, age, gender, birth, job, school, phone_Num, id } = req.body.data;
        if(name !== 'notChange' || name !== undefined){
            await Friend.update({ 
                name: name, relationship: relationship, age: age, gender: gender, birth: birth, job: job,
                school: school, phone_num: phone_Num
            }, 
            {where: { userid: req.user.id, id: id }})
            const friend = await Friend.findOne({ where: {userid: req.user.id, id: id}})
            return res.status(201).json(friend);
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/newfriend', async (req, res, next) => {
    try{
        console.log('새친구 등록 '+req.user.id);
        const userid = req.user.id;
        const { name, relationship, age, gender, birth, job, school, phone_Num } = req.body.data; 


        const newFriend = await Friend.create({
            name,
            relationship,
            age, 
            gender, 
            birth, 
            job, 
            school, 
            phone_num : phone_Num,
            userid,
        })
        // const friendList = await Friend.findOne({ where: {userid: req.user.id}})

        return res.status(201).json(true);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
