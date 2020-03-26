var express = require("express")
const { isLoggedIn, isNotLoggedIn, isUpdateActivity } = require("./middlewares")
const router = express.Router()
const { Friend } = require("../models")
const multer = require("multer")

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

router.post("/friendList/:page/:countPerPage", isLoggedIn, async (req, res, next) => {
  try {
    console.log("친구목록요청" + req.user.id)
    let page = parseInt(req.params.page)
    let countPerPage = 10
    if (parseInt(req.params.countPerPage) != 0) countPerPage = parseInt(req.params.countPerPage)

    let totalPage
    // totalPage = Math.ceil(count/countPerPage)

    const friendList = await Friend.findAll({ where: { userid: req.user.id } })
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
  upload.fields([{ name: "Picture" }]),
  async (req, res, next) => {
    try {
      const { name, relationship, age, gender, birth, job, school, phone_Num, id } = req.body
      console.log(
        "req revisefriend",
        name,
        relationship,
        age,
        gender,
        birth,
        job,
        school,
        phone_Num,
        id
      )
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

        if (req.files.Picture !== undefined) {
          const mainFile = req.files.Picture[0]
          await fs.unlink(`uploads/${beforefriend.portrait}`, e => {
            console.log("메인사진삭제완료")
          })
          console.log(mainFile.filename)
          await Friend.update(
            { portrait: mainFile.filename },
            { where: { userid: req.user.id, id: id } }
          )
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
  upload.fields([{ name: "Picture" }]),
  async (req, res, next) => {
    try {
      console.log("새친구 등록 " + req.user.id)
      const userid = req.user.id
      const { name, relationship, age, gender, birth, job, school, phone_Num } = req.body

      let portrait = null
      if (req.files.Picture !== undefined) portrait = await req.files.Picture[0].filename

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
