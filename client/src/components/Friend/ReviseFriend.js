import React, { Component } from "react"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"

class ReviseFriend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      name: "notChange",
      relationship: "notChange",
      age: "notChange",
      gender: "notChange",
      birth: "notChange",
      job: "notChange",
      school: "notChange",
      phoneNum: "notChange",
      id: "",
      portrait: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendReviseFriend = this.sendReviseFriend.bind(this)
  }

  // componentDidMount(){
  //     alert('gghghgh');
  //     const friendInfo = this.props.friendInfo;
  //     this.setState({
  //         name: friendInfo.name,
  //         relationship: friendInfo.relationship,
  //         age: friendInfo.age,
  //         gender: friendInfo.gender,
  //         birth: friendInfo.birth,
  //         job: friendInfo.job,
  //         school: friendInfo.school,
  //         phoneNum: friendInfo.phoneNum,
  //     })
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileInput(e) {
    this.setState({
      portrait: e.target.files[0]
    })
  }

  sendReviseFriend = event => {
    event.preventDefault()

    let form = new FormData()
    form.append("Picture", this.state.portrait)
    let gender = ""
    if (this.state.gender === "남자") {
      gender = "M"
    } else if (this.state.gender === "여자") {
      gender = "W"
    }
    const { name, relationship, age, birth, job, school, phone_Num } = this.state
    form.set("name", name)
    form.set("relationship", relationship)
    form.set("age", age)
    form.set("gender", gender)
    form.set("birth", birth)
    form.set("job", job)
    form.set("school", school)
    form.set("phone_Num", phone_Num)

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }

    axios
      .put(`http://localhost:8000/friend/revisefriend`, form, config)
      .then(res => {
        const newFriend = res.data !== undefined
        if (newFriend) {
          this.setState({ lgShow: false })
          console.log(res.data)
          window.location.reload() //새로고침
        } else {
          alert(res.data)
          console.error(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <>
        <button
          onClick={() =>
            this.setState({
              lgShow: true,
              name: this.props.friendInfo.name,
              relationship: this.props.friendInfo.relationship,
              age: this.props.friendInfo.age,
              gender: this.props.friendInfo.gender,
              birth: this.props.friendInfo.birth,
              job: this.props.friendInfo.job,
              school: this.props.friendInfo.school,
              phoneNum: this.props.friendInfo.phone_num,
              id: this.props.friendInfo.id
            })
          }
          class="flex justify-right mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          수정
        </button>

        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={() =>
            this.setState({
              lgShow: false
            })
          }
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">지인 정보 수정</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm="2">
                  프로필 사진
                </Form.Label>
                <Col sm="10">
                  <input
                    type="file"
                    name="portrait"
                    id="portrait"
                    onChange={e => this.handleFileInput(e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm="2">
                  이름
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.name}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formRelationship">
                <Form.Label column sm="2">
                  관계
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="relationship"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.relationship}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formAge">
                <Form.Label column sm="2">
                  나이
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    name="age"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.age}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formGender">
                <Form.Label column sm="2">
                  성별
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    type="string"
                    name="gender"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.gender}
                  >
                    <option>남자</option>
                    <option>여자</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBirth">
                <Form.Label column sm="2">
                  생년월일
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    name="birth"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.birth}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formJob">
                <Form.Label column sm="2">
                  직업
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="job"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.job}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formSchool">
                <Form.Label column sm="2">
                  학교
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="school"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.school}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPhoneNum">
                <Form.Label column sm="2">
                  전화번호
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="phoneNum"
                    onChange={this.handleChange}
                    defaultValue={this.props.friendInfo.phone_num}
                  />
                </Col>
              </Form.Group>
              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.sendReviseFriend} variant="primary" type="submit">
                  수정
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default ReviseFriend
