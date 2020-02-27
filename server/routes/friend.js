var express = require('express');
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require('./middlewares');
const router = express.Router();
const { Friend } = require('../models');


router.post('/friendList/:page', isLoggedIn, async (req, res, next) => {
    try{
        console.log('친구목록요청'+req.user.id);
        let page = parseInt(req.params.page);
        const friendList = await Friend.findAll({ where: {userid: req.user.id}})
        return res.status(201).json(friendList);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.put('/revisefriend', isLoggedIn, isUpdateActivity, async (req, res, next) => {
    try{
        const { name, relationship, age, gender, birth, job, school, phone_Num, id } = req.body.data;
        if(name !== 'notChange' || name !== undefined){
            console.log('친구정보수정'+req.user.id+name);
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

router.post('/getfriend', isLoggedIn, async (req, res, next) => {
    try{
        const { friendID } = req.body;
        if(friendID !== ''){
            console.log('친구정보요청'+req.user.id+friendID);
            const friend = await Friend.findOne({ where: {userid: req.user.id, id: friendID}})
            return res.status(201).json(friend);
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/newfriend', isLoggedIn, isUpdateActivity, async (req, res, next) => {
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
