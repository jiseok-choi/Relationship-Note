const express = require("express")
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require("./middlewares")
const path = require("path")
const { Event, Wedding, Party } = require("../models")
const { deleteS3Obj, upload_s3 } = require("./S3")

const router = express.Router()

let type = "event"
let fileSize = 50 * 1024 * 1024

router.post(
  "/sendCreateWedding",
  isLoggedIn,
  isUpdateActivity,
  upload_s3(type, fileSize).fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      console.log("결혼행사 생성")
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
      // const MainPicture = await req.files.Picture[0].filename

      let MainPicture = null
      if (req.files.Picture !== undefined) MainPicture = await req.files.Picture[0].key

      let Pictures = req.files.Pictures
      let SubPicture = null
      if (Pictures !== undefined) {
        console.log(req.files)
        await Pictures.forEach(element => {
          SubPicture = SubPicture + ";" + element.key
        })
      }

      const newEvent = await Event.create({
        kinds: "wedding",
        title: `${groom} 님과 ${birde} 님의 결혼식`,
        date: date,
        userid: userid
      })

      await Wedding.create({
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
  upload_s3(type, fileSize).fields([{ name: "Picture" }, { name: "Pictures" }]),
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

      let deleteItems = []

      if (req.files.Picture !== undefined) {
        const mainFile = req.files.Picture[0].key
        deleteItems.push({ Key: beforeWedding.mainPicture })
        console.log(mainFile)
        await Wedding.update({ mainPicture: mainFile }, { where: { fk_eventId: fk_eventId } })
      }
      if (req.files.Pictures !== undefined) {
        let subPicture = beforeWedding.subPicture.slice(1).split(";")
        await subPicture.map(contact => {
          deleteItems.push({ Key: contact })
        })
        let sub = ""
        await req.files.Pictures.forEach(element => {
          sub = sub + ";" + element.filename
        })
        await Wedding.update({ subPicture: sub }, { where: { fk_eventId: fk_eventId } })
      }
      //파일 삭제
      await deleteS3Obj(deleteItems)
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
    let deleteItems = []
    // 2. 정보확인
    if (event.kinds === "wedding") {
      console.log("2번실행")

      // 3. 사진삭제
      const wedding = await Wedding.findOne({ where: { fk_eventId: id } })
      //메인사진삭제담기
      deleteItems.push({ Key: wedding.mainPicture })
      let subPicture = wedding.subPicture.slice(1).split(";")
      await subPicture.map(contact => {
        deleteItems.push({ Key: contact })
      })
      console.log("3번실행")

      // 4. 이벤트 삭제
      await Event.destroy({
        where: { id }
      })
      console.log("4번실행")
      await deleteS3Obj(deleteItems)
      res.status(200).json(true)
    }
    if (event.kinds === "party") {
      console.log("2번실행")

      // 3. 사진삭제
      const beforeParty = await Party.findOne({ where: { fk_eventId: id } })
      //메인사진삭제담기
      deleteItems.push({ Key: beforeParty.mainPicture })
      let subPicture = beforeParty.subPicture.slice(1).split(";")
      await subPicture.map(contact => {
        deleteItems.push({ Key: contact })
      })
      console.log("3번실행")

      // 4. 이벤트 삭제
      await Event.destroy({
        where: { id }
      })
      console.log("4번실행")
      await deleteS3Obj(deleteItems)
      res.status(200).json(true)
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
  upload_s3(type, fileSize).fields([{ name: "Picture" }, { name: "Pictures" }]),
  async (req, res, next) => {
    try {
      console.log("행사 생성")
      const { date, time, mainCharacter, title, invite, lat, lng, post, location } = req.body

      const userid = req.user.id
      let MainPicture = null
      if (req.files.Picture !== undefined) MainPicture = await req.files.Picture[0].key

      let Pictures = req.files.Pictures
      let SubPicture = null
      if (Pictures !== undefined) {
        console.log(req.files)
        await Pictures.forEach(element => {
          SubPicture = SubPicture + ";" + element.key
        })
      }

      const newEvent = await Event.create({
        kinds: "party",
        title: `${title}`,
        date: date,
        userid: userid
      })

      await Party.create({
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
  upload_s3(type, fileSize).fields([{ name: "Picture" }, { name: "Pictures" }]),
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

      let deleteItems = []

      if (req.files.Picture !== undefined) {
        const mainFile = req.files.Picture[0].key
        deleteItems.push({ Key: beforeParty.mainPicture })
        console.log(mainFile)
        await Party.update({ mainPicture: mainFile }, { where: { fk_eventId: fk_eventId } })
      }
      if (req.files.Pictures !== undefined) {
        let subPicture = beforeParty.subPicture.slice(1).split(";")
        await subPicture.map(contact => {
          deleteItems.push({ Key: contact })
        })
        let sub = ""
        await req.files.Pictures.forEach(element => {
          sub = sub + ";" + element.key
        })
        await Party.update({ subPicture: sub }, { where: { fk_eventId: fk_eventId } })
      }

      //파일 삭제
      await deleteS3Obj(deleteItems)
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
