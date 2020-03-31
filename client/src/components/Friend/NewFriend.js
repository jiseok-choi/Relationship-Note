import React, { Component } from "react"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"

class NewFriend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      name: "",
      relationship: "",
      age: 0,
      gender: "",
      birth: "",
      job: "",
      school: "",
      phoneNum: "",
      portrait: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendNewFriend = this.sendNewFriend.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
  }

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

  sendNewFriend = event => {
    event.preventDefault()

    let form = new FormData()
    form.append("Picture", this.state.portrait)
    let gender = ""
    if (this.state.gender === "남자") {
      gender = "M"
    } else if (this.state.gender === "여자") {
      gender = "W"
    }

    const { name, relationship, age, birth, job, school, phoneNum } = this.state
    form.set("name", name)
    form.set("relationship", relationship)
    form.set("age", age)
    form.set("gender", gender)
    form.set("birth", birth)
    form.set("job", job)
    form.set("school", school)
    form.set("phone_Num", phoneNum)

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }

    axios
      .post(`http://54.180.149.57:8000/friend/newfriend`, form, config)
      .then(res => {
        const newFriend = res.data !== undefined
        if (newFriend) {
          this.setState({ lgShow: false })
          console.log(res.data)
          this.props.getFriend()
          // window.location.reload(); //새로고침
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
              lgShow: true
            })
          }
          class="flex justify-center ml-10 mr-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          지인생성
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
            <Modal.Title id="example-modal-sizes-title-lg">지인 정보 생성</Modal.Title>
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
                  <Form.Control type="text" name="name" onChange={this.handleChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formRelationship">
                <Form.Label column sm="2">
                  관계
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="relationship" onChange={this.handleChange} />
                </Col>
              </Form.Group>
              {/* <Form.Group as={Row} controlId="formAge">
                <Form.Label column sm="2">
                  나이
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" name="age" onChange={this.handleChange} />
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} controlId="formGender">
                <Form.Label column sm="2">
                  성별
                </Form.Label>
                <Col sm="10">
                  {/* <div class="relative">
                    <select
                      class="block appearance-none w-full border border-gray-200 text-gray-700 py-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>남자</option>
                      <option>여자</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div> */}
                  <Form.Control
                    as="select"
                    type="string"
                    name="gender"
                    onChange={this.handleChange}
                  >
                    <option>선택하세요</option>
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
                    placeholder="20xx0x0x"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formJob">
                <Form.Label column sm="2">
                  직업
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="job" onChange={this.handleChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formSchool">
                <Form.Label column sm="2">
                  학교
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="school" onChange={this.handleChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhoneNum">
                <Form.Label column sm="2">
                  전화번호
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="phoneNum" onChange={this.handleChange} />
                </Col>
              </Form.Group>
              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.sendNewFriend} variant="primary" type="submit">
                  확인
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default NewFriend
