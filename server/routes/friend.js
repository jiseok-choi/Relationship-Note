var express = require("express")
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require("./middlewares")
const router = express.Router()
const { Friend } = require("../models")
const { deleteS3Obj, upload_s3 } = require("./S3")
const multer = require("multer")

let type = "friend_portrait"
let fileSize = 50 * 1024 * 1024

router.post("/friendList/:page/:countPerPage", isLoggedIn, async (req, res, next) => {
  try {
    console.log("친구목록요청" + req.user.id)
    let page = parseInt(req.params.page)
    let countPerPage = 10
    if (parseInt(req.params.countPerPage) != 0) countPerPage = parseInt(req.params.countPerPage)

    let totalPage
    // totalPage = Math.ceil(count/countPerPage)

    const friendList = await Friend.findAll({
      where: { userid: req.user.id },
      order: [["createdAt", "DESC"]]
    })
    return res.status(201).json(friendList)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.put(
  "/revisefriend",
  isLoggedIn,
  isUpdateActivity,
  upload_s3(type, fileSize).fields([{ name: "Picture" }]),
  async (req, res, next) => {
    try {
      const { name, relationship, age, gender, birth, job, school, phone_Num, id } = req.body

      const beforefriend = await Friend.findOne({ where: { userid: req.user.id, id: id } })

      if (name !== "notChange" || name !== undefined) {
        console.log("친구정보수정" + req.user.id + name)
        await Friend.update(
          {
            name: name,
            relationship: relationship,
            age: age,
            gender: gender,
            birth: birth,
            job: job,
            school: school,
            phone_num: phone_Num
          },
          { where: { userid: req.user.id, id: id } }
        )

        let deleteItems = []
        if (req.files.Picture !== undefined) {
          //s3 파일삭제
          if (beforefriend.portrait !== null) {
            deleteItems.push({ Key: beforefriend.portrait })
            await deleteS3Obj(deleteItems)
          }

          const mainFile = req.files.Picture[0].key
          console.log(mainFile)
          await Friend.update({ portrait: mainFile }, { where: { userid: req.user.id, id: id } })
        }
        const friend = await Friend.findOne({ where: { userid: req.user.id, id: id } })
        return res.status(201).json(friend)
      }
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

router.post("/getfriend", isLoggedIn, async (req, res, next) => {
  try {
    const { friendID } = req.body
    if (friendID !== "") {
      console.log("친구정보요청" + req.user.id + friendID)
      const friend = await Friend.findOne({ where: { userid: req.user.id, id: friendID } })
      return res.status(201).json(friend)
    }
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.post(
  "/newfriend",
  isLoggedIn,
  isUpdateActivity,
  upload_s3(type, fileSize).fields([{ name: "Picture" }]),
  async (req, res, next) => {
    try {
      console.log("새친구 등록 " + req.user.id)
      const userid = req.user.id
      const { name, relationship, age, gender, birth, job, school, phone_Num } = req.body

      let portrait = null
      if (req.files.Picture !== undefined) portrait = await req.files.Picture[0].key

      const newFriend = await Friend.create({
        name,
        relationship,
        age,
        gender,
        birth,
        job,
        school,
        phone_num: phone_Num,
        userid,
        portrait
      })
      // const friendList = await Friend.findOne({ where: {userid: req.user.id}})

      return res.status(201).json(true)
    } catch (e) {
      console.error(e)
      return next(e)
    }
  }
)

module.exports = router
