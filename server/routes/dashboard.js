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
    const date = new Date();
    let regStart = date;
    let regEnd = new Date(date.valueOf() + 1000 * 3600 * 24 * 7);
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
    result.countevents = event.length + schedule.length

    //최근 활동 정보 반환
    result.activity = timeBefore(req);

    //지인 등록 분포도
    const Friends = await Friend.findAll({ attributes: ['relationship'], where: { userid }})
    let query_select = 
    `SELECT relationship as names, ROUND(sum(100) / total) as series, concat(ROUND(sum(100) / total), '%') as labels
    FROM r_note.friends
    cross join (SELECT count(*) as total FROM r_note.friends WHERE userid = :userid order by total asc) x
    where userid = :userid
    group by 1
    order by series desc`;
    await sequelize.query(query_select, {
      replacements: {userid},
      type: Sequelize.QueryTypes.SELECT,
      raw: true
    }).then(board => {
      result.dataPie = new Object();
      result.legendPie = new Object();
      result.dataPie.labels = [];
      result.dataPie.series = [];
      result.legendPie.names = [];
      result.legendPie.types = [];
      let i= 1;
      board.map(raw => {
        result.dataPie.labels.push(raw.labels);
        result.dataPie.series.push(Number(raw.series));
        result.legendPie.names.push(raw.names);
        result.legendPie.types.push('color'+i);
        i= i+1;
      })
      
      console.log("board", result)
    })

    console.log('대쉬보드 테스트 완료', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


module.exports = router;