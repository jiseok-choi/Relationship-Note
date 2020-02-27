const express = require('express');
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require('./middlewares');
const router = express.Router();
const { News, Sequelize: { Op } } = require('../models');

router.post('/newNews', isLoggedIn, isUpdateActivity, async (req, res, next) => {
    try{
        console.log('새소식 등록 '+req.user.id);
        const userid = req.user.id;
        const { friendid, date, title, contents } = req.body.data; 
        console.log('소식정보'+friendid, date, title, contents);

        const newNews = await News.create({
            friendid,
            date,
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

router.post('/getNewsList', isLoggedIn, async (req, res, next) => {
    try{
        const { friendid } = req.body.data;
        console.log('소식목록요청'+req.user.id, friendid);
        const newsList = await News.findAll({ 
            where: {userid: req.user.id, friendid: friendid},
            order: [['createdAt', 'DESC']],
        })
        return res.status(201).json(newsList);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.put('/reviseNews', isLoggedIn, isUpdateActivity, async (req, res, next) => {
    try{
        const { friendid, date, title, contents, id} = req.body.data; 
        console.log('소식정보수정'+req.user.id+friendid,id);
        if(friendid !== undefined){
            await News.update({ 
                // friendid, date, title, contents
                friendid:friendid, date:date, title:title, contents:contents
            }, 
            {where: { userid: req.user.id, id: id }})
            const news = await News.findOne({ where: {userid: req.user.id, id: id}})
            return res.status(201).json(news);
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
