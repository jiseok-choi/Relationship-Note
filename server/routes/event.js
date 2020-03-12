const express = require("express")
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require("./middlewares")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { Event, Wedding, Party } = require("../models")

const router = express.Router()

fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.")
    fs.mkdirSync("uploads")
  }
})

const upload = multer({
  //멀터를 사용하면 upload 객체를 받을 수 있다.
  storage: multer.diskStorage({
    //어디에 저장할지? 서버디스크에 이미지를 저장하겠다는 의미
    destination(req, file, cb) {
      //파일이 저장될 경로
      cb(null, "uploads/") //cb(에러, 결과값)
    },
    filename(req, file, cb) {
      //파일이름
      const ext = path.extname(file.originalname) //확장자 가져오기
      const basename = path.basename(file.originalname, ext)
      cb(null, basename + new Date().valueOf() + ext) //basename 은 확장자 이외 이름
    }
  }),
  limits: { fileSize: 5000 * 1024 * 1024 } //파일 사이즈 (500mb)
})

// router.post('/sendCreateWedding', isLoggedIn, upload.single([{ name: 'mainPicture' }, { name: 'subPicture' }]), async (req, res, next) => {
router.post(
  "/sendCreateWedding",
  isLoggedIn,
  isUpdateActivity,
  upload.fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      console.log("결혼행사 생성")
      // const { date, time, groom, birde, invite, groomFather, groomMother, birdeFather, birdeMother, lat, lng, post, weddingHall } = req.body.data;
      // let form = new FormData();
      // for(var key in req.body.data) {
      //     console.log('key: ' + key + 'value: '+req.body.data[key])
      // }
      const {
        date,
        time,
        groom,
        birde,
        invite,
        groomFather,
        groomMother,
        birdeFather,
        birdeMother,
        lat,
        lng,
        post,
        weddingHall
      } = req.body

      const userid = req.user.id
      // const MainPicture = await Picture.pop().filename;
      const MainPicture = await req.files.Picture[0].filename
      const Pictures = req.files.Pictures
      let SubPicture = ""
      console.log(req.files)
      await Pictures.forEach(element => {
        SubPicture = SubPicture + ";" + element.filename
      })

      const newEvent = await Event.create({
        kinds: "wedding",
        title: `${groom} 님과 ${birde} 님의 결혼식`,
        date: date,
        userid: userid
      })

      const newWedding = await Wedding.create({
        date,
        time,
        groom,
        birde,
        invite,
        groomFather,
        groomMother,
        birdeFather,
        birdeMother,
        mainPicture: MainPicture,
        subPicture: SubPicture,
        lat,
        lng,
        post,
        weddingHall,
        userid,
        fk_eventId: newEvent.id
      })

      return res.status(201).json(true)
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

router.get("/getEvents", isLoggedIn, async (req, res, next) => {
  try {
    console.log("이벤트 리스트 요청")
    let eventList = await Event.findAll({
      where: { userid: req.user.id },
      order: [["date", "DESC"]],
      raw: true
    })
    await eventList.map((prop, key) => (prop.index = key + 1))
    return await res.status(200).json(eventList)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.post("/getInvitation/wedding", async (req, res, next) => {
  try {
    const wedding = await Wedding.findOne({
      where: { fk_eventId: req.body.id }
    })
    return res.status(200).json(wedding)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.put(
  "/sendUpdateWedding",
  isLoggedIn,
  isUpdateActivity,
  upload.fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      const {
        date,
        time,
        groom,
        birde,
        invite,
        groomFather,
        groomMother,
        birdeFather,
        birdeMother,
        lat,
        lng,
        post,
        weddingHall,
        fk_eventId
      } = req.body

      const beforeWedding = await Wedding.findOne({
        where: { fk_eventId: fk_eventId }
      })

      await Event.update(
        {
          date,
          title: `${groom} 님과 ${birde} 님의 결혼식`
        },
        { where: { id: fk_eventId } }
      )

      const afterWedding = await Wedding.update(
        {
          date,
          time,
          groom,
          birde,
          invite,
          groomFather,
          groomMother,
          birdeFather,
          birdeMother,
          lat,
          lng,
          post,
          weddingHall
        },
        {
          where: { fk_eventId: fk_eventId }
        }
      )
      if (req.files.Picture !== undefined) {
        const mainFile = req.files.Picture[0]
        await fs.unlink(`uploads/${beforeWedding.mainPicture}`, e => {
          console.log("메인사진삭제완료")
        })
        console.log(mainFile.filename)
        await Wedding.update(
          { mainPicture: mainFile.filename },
          { where: { fk_eventId: fk_eventId } }
        )
      }
      if (req.files.Pictures !== undefined) {
        let subPicture = beforeWedding.subPicture.slice(1).split(";")
        await subPicture.map(contact => {
          fs.unlink(`uploads/${contact}`, e => {
            console.log("서브사진삭제완료")
          })
        })
        let sub = ""
        await req.files.Pictures.forEach(element => {
          sub = sub + ";" + element.filename
        })
        await Wedding.update({ subPicture: sub }, { where: { fk_eventId: fk_eventId } })
      }

      return res.status(200).json(true)
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

router.delete("/delete:id", isLoggedIn, isUpdateActivity, async (req, res, next) => {
  try {
    console.log("이벤트 삭제 요청", req.params.id)
    // 1. 이벤트 조회
    const id = req.params.id
    const event = await Event.findOne({ where: { id } })
    console.log("1번실행")
    // 2. 정보확인
    if (event.kinds === "wedding") {
      console.log("2번실행")

      // 3. 사진삭제
      const wedding = await Wedding.findOne({ where: { fk_eventId: id } })
      await fs.unlink(`uploads/${wedding.mainPicture}`, e => {
        console.log("메인사진삭제완료")
      })
      let subPicture = wedding.subPicture.slice(1).split(";")
      await subPicture.map(contact => {
        fs.unlink(`uploads/${contact}`, e => {
          console.log("서브사진삭제완료")
        })
      })
      console.log("3번실행")

      // 4. 이벤트 삭제
      await Event.destroy({
        where: { id }
      })
      console.log("4번실행")

      return res.status(200).json(true)
    }
    if (event.kinds === "party") {
      console.log("2번실행")

      // 3. 사진삭제
      const Party = await Party.findOne({ where: { fk_eventId: id } })
      await fs.unlink(`uploads/${Party.mainPicture}`, e => {
        console.log("메인사진삭제완료")
      })
      let subPicture = Party.subPicture.slice(1).split(";")
      await subPicture.map(contact => {
        fs.unlink(`uploads/${contact}`, e => {
          console.log("서브사진삭제완료")
        })
      })
      console.log("3번실행")

      // 4. 이벤트 삭제
      await Event.destroy({
        where: { id }
      })
      console.log("4번실행")

      return res.status(200).json(true)
    }
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.post(
  "/sendCreateParty",
  isLoggedIn,
  isUpdateActivity,
  upload.fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      console.log("행사 생성")
      const { date, time, mainCharacter, title, invite, lat, lng, post, location } = req.body

      const userid = req.user.id
      const MainPicture = await req.files.Picture[0].filename
      const Pictures = req.files.Pictures
      let SubPicture = ""

      await Pictures.forEach(element => {
        SubPicture = SubPicture + ";" + element.filename
      })

      const newEvent = await Event.create({
        kinds: "party",
        title: `${title}`,
        date: date,
        userid: userid
      })

      const newParty = await Party.create({
        date,
        time,
        mainCharacter,
        title,
        invite,
        mainPicture: MainPicture,
        subPicture: SubPicture,
        lat,
        lng,
        post,
        location,
        userid,
        fk_eventId: newEvent.id
      })

      return res.status(201).json(true)
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

router.put(
  "/sendUpdateParty",
  isLoggedIn,
  isUpdateActivity,
  upload.fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      const {
        date,
        time,
        mainCharacter,
        title,
        invite,
        lat,
        lng,
        post,
        location,
        fk_eventId
      } = req.body

      const beforeParty = await Party.findOne({
        where: { fk_eventId: fk_eventId }
      })

      await Event.update(
        {
          date,
          title
        },
        { where: { id: fk_eventId } }
      )

      const afterParty = await Party.update(
        {
          date,
          time,
          mainCharacter,
          title,
          invite,
          lat,
          lng,
          post,
          location
        },
        {
          where: { fk_eventId: fk_eventId }
        }
      )
      if (req.files.Picture !== undefined) {
        const mainFile = req.files.Picture[0]
        await fs.unlink(`uploads/${beforeParty.mainPicture}`, e => {
          console.log("메인사진삭제완료")
        })
        console.log(mainFile.filename)
        await Party.update(
          { mainPicture: mainFile.filename },
          { where: { fk_eventId: fk_eventId } }
        )
      }
      if (req.files.Pictures !== undefined) {
        let subPicture = beforeParty.subPicture.slice(1).split(";")
        await subPicture.map(contact => {
          fs.unlink(`uploads/${contact}`, e => {
            console.log("서브사진삭제완료")
          })
        })
        let sub = ""
        await req.files.Pictures.forEach(element => {
          sub = sub + ";" + element.filename
        })
        await Party.update({ subPicture: sub }, { where: { fk_eventId: fk_eventId } })
      }

      return res.status(200).json(true)
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

router.post("/getInvitation/party", async (req, res, next) => {
  try {
    const party = await Party.findOne({
      where: { fk_eventId: req.body.id }
    })
    return res.status(200).json(party)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

module.exports = router
