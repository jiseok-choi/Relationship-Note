const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Event, Visit, Wedding, Party } = require('../models');

const router = express.Router();

//이벤트 리스트 가져오기(Money.js)
router.get('/events', isLoggedIn, async (req,res,next) => {
    try{
        console.log('이벤트 리스트 가져오기 요청');
        let result = new Object();
        result.result = [];
        let visitlist;
        result.eventList = await Event.findAll({ 
            where: {userid: req.user.id},
            order: [['date', 'DESC']]
        });
        await Promise.all( 
            result.eventList.map(async (event) => {
                let resultevent = new Object();
                resultevent.check = true;
                resultevent.id = event.id;
                resultevent.title = event.title;
                resultevent.date = event.date;
                visitlist = await Visit.findAll({
                    where: {fk_eventId: event.id}
                })
                await visitlist.map(async(visit) => {
                    if(!visit.check){ resultevent.check = false; }
                    console.log(visit.name,visit.check)
                })
                await console.log('resultevent.check',resultevent.check)
                await result.result.push(await resultevent)
            })
        )
        console.log('result.result',result.result)
        await res.status(200).json(result.result);

    }catch(e) {
        console.error(e);
        res.status(500).json(false);
        return next(e);
    }
});

//방명록 가져오기(Money.js)
router.get('/visits/:eventid', isLoggedIn, async (req,res,next) => {
    try{
        const eventid = req.params.eventid;
        console.log('방명록 가져오기 요청',eventid);
        let result = await Visit.findAll({ 
            where: {fk_eventId: eventid},
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(result);
    }catch(e) {
        console.error(e);
        res.status(500).json(false);
        return next(e);
    }
});

//이벤트 종합 정보 가져오기(EventInfo.js)
router.get('/eventInfo/:eventid', async (req,res,next) => {
    try{
        const eventid = req.params.eventid;
        console.log('이벤트 종합 정보 요청', eventid);

        const exEvent = await Event.findOne({ 
            where: {id: eventid},
        });
        const exVisit = await Visit.findAll({
            where: {fk_eventId: eventid}
        })

        let result = new Object();
        result.name = '';
        result.kinds = '';
        if(exEvent !== null || exEvent !== undefined){
            result.name = await exEvent.title;
            if(exEvent.kinds === 'wedding'){
                result.kinds = '결혼식'
            }else {result.kinds = '파티'}
            result.date = exEvent.createdAt;
            result.totalmoney = 0;
            await exVisit.map((cele) => {
                result.totalmoney += cele.celebration
            })
        }
        
        console.log(result);
        return res.status(200).json(result);
    }catch(e) {
        console.error(e);
        res.status(500).json(false);
        return next(e);
    }
});

//방명록 수정
router.put('/reviseMoney', isLoggedIn, async (req,res,next) => {
    try{
        const { visitid, name, celebration } = req.body;

        const beforeVisit = await Visit.findOne({
            where: {id: visitid}
        });

        let tempVisit = new Object();
        if (name || name !== beforeVisit.name) {
            tempVisit.name = await name;
        } else { tempVisit.name = await beforeVisit.name; }

        if (celebration || celebration !== beforeVisit.celebration) {
            tempVisit.celebration = await celebration;
        } else { tempVisit.celebration = await beforeVisit.celebration; }

        await Visit.update({
            name: tempVisit.name, 
            celebration: tempVisit.celebration,
            check: false
        },{ where: {id: visitid} })

        return res.status(200).json(true);
    }catch(e) {
        console.error(e);
        res.status(500).json(false);
        return next(e);
    }
});

//방명록 한명 확인
router.patch('/check/:id', isLoggedIn, async (req,res,next) => {
    try{
        const visitid = req.params.id;

        const beforeVisit = await Visit.findOne({
            where: {id: visitid}
        });

        if(beforeVisit.check){
            await Visit.update({
                check: false
            },{ where: {id: visitid} })
        }else {
            await Visit.update({
                check: true
            },{ where: {id: visitid} })
        }

        return res.status(200).json(true);
    }catch(e) {
        console.error(e);
        res.status(500).json(false);
        return next(e);
    }
});

// router.delete('/delete:id', isLoggedIn, async (req, res, next) => {
//     try{
//         console.log(req.params.id)
//         // 1. 이벤트 조회
//         const id = req.params.id;
//         const event = await Event.findOne({where: {id}});
//         console.log('1번실행')
//         // 2. 정보확인
//         if(event.kinds === 'wedding'){
//             console.log('2번실행')

//             // 3. 사진삭제
//             const wedding = await Wedding.findOne({where: {fk_eventId: id}});
//             await fs.unlink(`uploads/${wedding.mainPicture}`, (e)=> {
//                 console.log('메인사진삭제완료');
//             });
//             let subPicture = wedding.subPicture.slice(1).split(';');
//             await subPicture.map((contact) => {
//                 fs.unlink(`uploads/${contact}`, (e)=>{
//                     console.log('서브사진삭제완료');
//                 });
//             });
//             console.log('3번실행')

//             // 4. 이벤트 삭제
//             await Event.destroy({
//                 where: {id}
//             })
//             console.log('4번실행')
            
//             return res.status(200).json(true);
//         }
//         if(event.kinds === 'party'){
//             console.log('2번실행')

//             // 3. 사진삭제
//             const Party = await Party.findOne({where: {fk_eventId: id}});
//             await fs.unlink(`uploads/${Party.mainPicture}`, (e)=> {
//                 console.log('메인사진삭제완료');
//             });
//             let subPicture = Party.subPicture.slice(1).split(';');
//             await subPicture.map((contact) => {
//                 fs.unlink(`uploads/${contact}`, (e)=>{
//                     console.log('서브사진삭제완료');
//                 });
//             });
//             console.log('3번실행')

//             // 4. 이벤트 삭제
//             await Event.destroy({
//                 where: {id}
//             })
//             console.log('4번실행')
            
//             return res.status(200).json(true);
//         }
//     } catch(e) {
//         console.error(e);
//         return next(e);
//     }
// });

// router.post('/sendCreateParty', isLoggedIn, upload.fields([{ name: 'Picture' }, { name: 'Pictures' }]), async (req, res, next) => {
//     try{
//         console.log('행사 생성');
//         const { date, time, mainCharacter, title, invite, lat, lng, post, location } = req.body;

//         const userid = req.user.id;
//         const MainPicture = await req.files.Picture[0].filename;
//         const Pictures = req.files.Pictures;
//         let SubPicture = '';
        
//         await Pictures.forEach((element) => {
//             SubPicture = SubPicture + ';' + element.filename;
//         });

//         const newEvent = await Event.create({
//             kinds : 'party',
//             title : `${title}`,
//             date: date,
//             userid: userid,
//         });

//         const newParty = await Party.create({
//             date, time, mainCharacter, title, invite,  
//             mainPicture:MainPicture, subPicture: SubPicture,
//             lat, lng, 
//             post, location, userid, 
//             fk_eventId: newEvent.id
//         });

//         return res.status(201).json(true);

//     } catch(e) {
//         console.error(e);
//         return next(e);
//     }
// });

// router.put('/sendUpdateParty', isLoggedIn, upload.fields([{ name: 'Picture' }, { name: 'Pictures' }]), async (req,res,next) => {
//     try{
//         const { date, time, mainCharacter, title, invite, lat, lng, post, location, fk_eventId } = req.body;

//         const beforeParty = await Party.findOne({
//             where: {fk_eventId: fk_eventId}
//         });

//         await Event.update({
//             date, title,
//         },{ where: {id: fk_eventId} })

//         const afterParty = await Party.update({
//             date, time, mainCharacter, title, invite, lat, lng, post, location
//         },
//         {
//             where: {fk_eventId: fk_eventId}
//         });
//         if(req.files.Picture !== undefined){
//             const mainFile = req.files.Picture[0];
//             await fs.unlink(`uploads/${beforeParty.mainPicture}`, (e)=> {
//                 console.log('메인사진삭제완료');
//             })
//             console.log(mainFile.filename)
//             await Party.update({mainPicture: mainFile.filename}, {where: {fk_eventId:fk_eventId}})
//         }
//         if(req.files.Pictures !== undefined ){
//             let subPicture = beforeParty.subPicture.slice(1).split(';');
//             await subPicture.map((contact) => {
//                 fs.unlink(`uploads/${contact}`, (e)=>{
//                     console.log('서브사진삭제완료');
//                 });
//             });
//             let sub = '';
//             await req.files.Pictures.forEach((element) => {
//                 sub = sub + ';' + element.filename;
//             });
//             await Party.update({subPicture: sub}, {where: {fk_eventId: fk_eventId}});
//         }

//         return res.status(200).json(true);
//     }catch(e) {
//         console.error(e);
//         return next(e);
//     }
// });

// router.post('/getInvitation/party', async (req,res,next) => {
//     try{
//         const party = await Party.findOne({ 
//             where: {fk_eventId: req.body.id}
//         });
//         return res.status(200).json(party);
//     }catch(e) {
//         console.error(e);
//         return next(e);
//     }
// });

module.exports = router;