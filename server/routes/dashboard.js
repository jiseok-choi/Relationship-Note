//회원가입 라우터
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); //
const { User, Friend, Event, Schedule, News, Sequelize: { Op }, sequelize } = require('../models');
const Sequelize = require('sequelize');

const router = express.Router();



function timeBefore(req) {
  //현재시간을 가져옴
  let now = new Date();

  //작업한시간 활동시간
  let activityDay = req.user.activitydate;

  if(activityDay === null || activityDay === undefined)
  return "없음"

  let minus;
  //현재 년도랑 활동시간의 년도 비교
  if(now.getFullYear() > activityDay.getFullYear()){
    minus = now.getFullYear() - activityDay.getFullYear();
    //두개의 차이를 구해서 반환
    return minus+'년 전';
  }else if(now.getMonth() > activityDay.getMonth()){
    //연도가 같을때 달 비교 출력
    minus = now.getMonth() - activityDay.getMonth();
    return minus+'월 전';
  }else if(now.getDate() > activityDay.getDate()){
    //같은 달일 때 일자 계산
    minus = now.getDate() - activityDay.getDate();
    return minus+'일 전';
  }else if(now.getDate() === activityDay.getDate()){
    return '오늘'
  }
}




router.get('/', isLoggedIn, async (req, res, next) => { 
  const userid = req.user.id;
  console.log('대쉬보드 요청', userid);
  
  try {
    let result = new Object();
    const exUser = await User.findOne({ where: { id: userid } }); 
    //등록된 지인 정보
    const Frends = await Friend.findAll({ where: {userid}});
    result.countfriends = Frends.length;

    //행사 및 일정
    const date =await new Date();
    let regStart = await new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let regEnd = await new Date(regStart.valueOf() + 1000 * 3600 * 24 * 7);
    console.log('시간계산', regStart, regEnd);
    let event = await Event.findAll({
      where: { 
        userid,
        date: { [Op.between]: [regStart, regEnd] }
      }
    });
    let schedule = await Schedule.findAll({ 
      where: { 
        userid,
        startdate: { [Op.lte]: regEnd },
        enddate: { [Op.gte]: regStart }
      }
    });
    result.countevents = await event.length + schedule.length;

    //최근 활동 정보 반환
    result.activity = timeBefore(req);

    //지인 등록 분포도
    let color = ["#1DC7EA", "#FB404B", "#FFA534", "#9368E9","#87CB16","#1B8DFF","#5E5E5E","#DD4B39","#35485C","#E52D27"];
    const Friends = await Friend.findAll({ attributes: ['relationship'], where: { userid }})
    let query_Acquaintance = `SELECT relationship as names, count(relationship) as count, ROUND(sum(100) / total) as series, concat(ROUND(sum(100) / total), '%') as labels
      FROM r_note.friends
      cross join (SELECT count(*) as total FROM r_note.friends WHERE userid = :userid order by total asc) x
      where userid = :userid
      group by 1
      order by series desc`;
    await sequelize.query(query_Acquaintance, {
      replacements: {userid},
      type: Sequelize.QueryTypes.SELECT,
      raw: true
    }).then(board => {
      result.dataPie = new Object();
      result.legendPie = new Object();
      result.datasetsPie = new Object();
      result.datasetsBar = new Object();
      result.dataPie.labels = [];
      result.dataPie.series = [];
      result.legendPie.names = [];
      result.legendPie.types = [];
      result.datasetsPie.data = [];
      result.datasetsPie.backgroundColor = [];
      result.datasetsBar.data = [];
      result.datasetsBar.backgroundColor = [];
      let i= 1;
      board.map(raw => {
        result.dataPie.labels.push(raw.labels);
        result.dataPie.series.push(Number(raw.series));
        result.legendPie.names.push(raw.names);
        result.legendPie.types.push('color'+i);
        result.datasetsPie.data.push(raw.count);
        result.datasetsPie.backgroundColor.push(color[i-1])
        i= i+1;
      })
    });

    //월별 추가된 지인 소식(labels)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    result.dataBar = await new Object();
    result.dataBar.barlabels = [];
    let indexdate = date.getMonth();
    let tempdate = [];
    for(let i = 0; i < 7; i++){
      if(indexdate < 6){ //1~6월
        await tempdate.push(months[indexdate+6]);
        indexdate += await 1;
      }else{ //7월~12월
        await tempdate.push(months[indexdate-6]);
        indexdate += await 1;
        if(indexdate === 12) indexdate = await 0;
      }
    }
    result.dataBar.barlabels = await tempdate;
    console.log('barlabels', result.dataBar.barlabels);
    //월별 추가된 지인 소식(count)
    // 날짜 더미 데이터 만들기 (오늘일자부터 7개월 전까지 월별 데이터)
    let query_Contacts = `SELECT T.Date, ifnull(A.count, 0) as count FROM (
      SELECT a.Date FROM (
        SELECT
          date_format(curdate() - INTERVAL (a.a) month, '%Y-%m') as date
        FROM (select 0 as a
            union all
              select 1 union all
              select 2 union all
              select 3 union all
              select 4 union all
              select 5 union all
              select 6 union all
              select 7 union all
              select 8 union all
              select 9 union all
              select 10 union all
              select 11 ) as a
              ) a
              where a.Date between date_format( DATE_ADD(now(), INTERVAL - 6 month ), '%Y-%m') and date_format(now(), '%Y-%m')
    ) T LEFT OUTER JOIN
    (
      SELECT date_format(date, '%Y-%m') m, COUNT(*) as count FROM r_note.news where userid = :userid group by m order by date desc
    ) as A
    ON T.date = A.m;`;
    result.dataBar.bardata = [];
    await sequelize.query(query_Contacts, {
      replacements: {userid},
      type: Sequelize.QueryTypes.SELECT,
      raw: true
    }).then(data => {
      for(let i = 6; i >= 0; i--){
        result.dataBar.bardata.push(data[i].count);
      }
    });
    console.log('대쉬보드 result 완료', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


module.exports = router;