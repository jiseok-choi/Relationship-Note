import React, { Component } from "react"
import Calendar from "react-calendar"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"
import moment from "moment"

moment.locale("ko")

class MySchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //컴포넌트 자체 값
      date: new Date(),
      value: "",
      lgShow: false,
      //컴포넌트 기입 값
      start: "",
      end: "",
      title: "",
      contents: "",
      //외부에서 받아와야하는 값
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendNewSchedule = this.sendNewSchedule.bind(this)
    this.selectRange = this.selectRange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendNewSchedule = event => {
    event.preventDefault()

    axios
      .post(`http://54.180.149.57:8000/schedule/sendNewSchedule`, {
        data: {
          kinds: "유저일정",
          friendid: null,
          startdate: this.state.start,
          enddate: this.state.end,
          title: this.state.title,
          contents: this.state.contents
        }
      })
      .then(res => {
        const newFriend = res.data !== undefined
        if (newFriend) {
          this.setState({ lgShow: false })
          console.log(res.data)
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

  onChange = date => {
    console.log(date, moment(date[0]).format("YYYY-MM-DD"), moment(date[1]).format("YYYY-MM-DD"))
    this.setState({
      start: moment(date[0]).format("YYYY-MM-DD"),
      end: moment(date[1]).format("YYYY-MM-DD")
    })
  }

  selectRange = date => {
    console.log(date + "selectRange 실행됨")
  }

  render() {
    return (
      <ButtonToolbar>
        <button
          onClick={() =>
            this.setState({
              date: new Date(),
              lgShow: true
            })
          }
          class="block bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
        >
          생성
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
            <div class="flex justify-center">
              <Modal.Title id="example-modal-sizes-title-lg">나의 일정 등록</Modal.Title>
            </div>
          </Modal.Header>

          <Modal.Body>
            <form class="w-full">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/6">
                  <label class="block md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    제목
                  </label>
                </div>
                <div class="md:w-5/6">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                  ></Form.Control>
                </div>
              </div>

              <div class="flex flex-col xs:flex-row items-center mb-6">
                <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
                  selectRange={this.selectRange}
                />
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/6">
                  <label class="block md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    시작 날짜
                  </label>
                </div>
                <div class="md:w-2/6">
                  <Form.Control
                    type="text"
                    name="start"
                    defaultValue={this.state.start}
                    onChange={this.onChange}
                  />
                </div>
                <div class="md:w-1/6">
                  <label class="block md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                    끝 날짜
                  </label>
                </div>
                <div class="md:w-2/6">
                  <Form.Control
                    type="text"
                    name="end"
                    defaultValue={this.state.end}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/6">
                  <label class="block md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    내용
                  </label>
                </div>
                <div class="md:w-5/6">
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="contents"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.sendNewSchedule} variant="primary" type="submit">
                  등록
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    )
  }
}

export default MySchedule
