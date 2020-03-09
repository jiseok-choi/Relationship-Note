var express = require('express');
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require('./middlewares');
const router = express.Router();
const { Schedule, Friend, Event } = require('../models');


router.post('/sendNewSchedule', isLoggedIn, isUpdateActivity, async (req, res, next) => {
    try{
        const userid = req.user.id;
        const { kinds, friendid, startdate, enddate, title, contents } = req.body.data; 
        console.log('새일정 등록 '+req.user.id, kinds, friendid, startdate, enddate, title, contents);


        const newSchedule = await Schedule.create({
            kinds,
            friendid,
            startdate, 
            enddate, 
            title, 
            contents, 
            userid,
        });

        return res.status(201).json(true);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/getScheduleList', isLoggedIn, async (req, res, next) => {
    try{
        console.log('일정목록요청'+req.user.id);
        const scheduleList = await Schedule.findAll({ 
            include: [{
                model: Friend,
                attributes: ['id', 'name'],
            }],
            where: {userid: req.user.id}, 
        })
        const birthList = await Friend.findAll({
            attributes: ['name', 'birth'],
            where: { 
                // birth: {ne: ""},
                userid: req.user.id
            },
        })
        const eventList = await Event.findAll({
            where: { userid: req.user.id }
        })
        let returnData = {};
        returnData.scheduleList = scheduleList;
        returnData.birthList = birthList;
        returnData.eventList = eventList;
        console.log('returnData', returnData.scheduleList);
        return res.status(201).json(returnData);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
