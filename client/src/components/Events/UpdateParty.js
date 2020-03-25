import React, { Component } from "react"
import { Button, Modal, Form, Row, Col } from "react-bootstrap"
import axios from "axios"
import MapWithASearchBox from "./MapWithASearchBox"
import * as moment from "moment"
import dotenv from "dotenv"
dotenv.config()

class UpdateParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      date: moment(new Date()).format("YYYY-MM-DD"),
      time: "",
      mainCharacter: "",
      title: "",
      invite: "",
      mainPicture: null,
      subPicture: [],
      center: {
        lat: 37.50735340000001,
        lng: 127.05585159999998
      },
      post: "",
      location: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.handleFileInputs = this.handleFileInputs.bind(this)
    this.changeCenter = this.changeCenter.bind(this)
    this.sendUpdateParty = this.sendUpdateParty.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.getParty = this.getParty.bind(this)
  }

  changeCenter = center => {
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      }
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  open = e => {
    e.preventDefault()
    this.setState(prev => ({
      ...prev,
      lgShow: true
    }))
  }

  close = e => {
    e.preventDefault()
    this.setState(prev => ({
      ...prev,
      lgShow: false
    }))
  }

  handleFileInput(e) {
    this.setState({
      mainPicture: e.target.files[0]
    })
    console.log(this.state.mainPicture)
  }

  handleFileInputs(e) {
    this.setState({
      //   selectedFiles : [...this.state.selectedFiles, ...e.target.selectedFiles],
      subPicture: e.target.files
    })
  }

  sendUpdateParty = e => {
    e.preventDefault()

    let form = new FormData()
    form.append("Picture", this.state.mainPicture)

    const subPicture = Array.from(this.state.subPicture)
    if (subPicture.length > 0) {
      subPicture.map((contact, i) => {
        form.append("Pictures", contact)
      })
    }

    console.log(form.get("Picture"))
    console.log(form.get("Pictures"))

    const { date, time, mainCharacter, title, invite, center, post, location } = this.state
    form.set("date", date)
    form.set("time", time)
    form.set("mainCharacter", mainCharacter)
    form.set("title", title)
    form.set("invite", invite)
    form.set("lat", center.lat)
    form.set("lng", center.lng)
    form.set("post", post)
    form.set("location", location)
    form.set("fk_eventId", this.props.eventInfo.id)

    // form.append('subPicture', subPicture[0]);
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }

    axios
      // .put(`http://localhost:8000/event/sendUpdateParty`, form, config)
      .put(`http://54.180.149.57:8000/event/sendUpdateParty`, form, config)
      .then(res => {
        alert("url로 청접장을 보내보세요")
        //   return this.props.close
        this.setState({
          lgShow: false
        })
        this.props.getEvents()
      })
      .catch(err => {
        console.error(err)
      })
  }

  getParty = () => {
    const id = this.props.eventInfo.id
    axios
      .post(`http://${process.env.REACT_APP_IP}:8000/event/getInvitation/party`, {
        id: id
      })
      .then(res => {
        const { date, time, mainCharacter, title, invite, lat, lng, post, location } = res.data

        const center = { lat: parseFloat(lat), lng: parseFloat(lng) }

        this.setState({
          date: moment(date).format("YYYY-MM-DD"),
          time,
          mainCharacter,
          title,
          invite,
          center,
          post,
          location
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  map = () => {
    if (this.state.center.lat !== "") {
      return <MapWithASearchBox center={this.state.center} changeCenter={this.changeCenter} />
    }
  }

  componentDidMount() {
    this.getParty()
  }

  render() {
    return (
      <>
        <button onClick={this.open}>
          <img src="./images/edit.png" class="h-6 w-6 ml-2" />
        </button>
        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={() => this.close}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">행사 정보 수정하기</Modal.Title>
            <Modal.Dialog>(사진과 지도위치는 입력하지 않으면 변경되지 않습니다)</Modal.Dialog>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formDate">
                <Form.Label column sm="2">
                  날짜
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="date"
                    onChange={this.handleChange}
                    defaultValue={this.state.date}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formTime">
                <Form.Label column sm="2">
                  시간
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="time"
                    onChange={this.handleChange}
                    defaultValue={this.state.time}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  행사 주인공 이름
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="mainCharacter"
                    onChange={this.handleChange}
                    defaultValue={this.state.mainCharacter}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  행사명
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    defaultValue={this.state.title}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formInvite">
                <Form.Label column sm="2">
                  초대의 글
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    type="text"
                    row="10"
                    name="invite"
                    onChange={this.handleChange}
                    defaultValue={this.state.invite}
                  />
                </Col>
              </Form.Group>
              메인사진 선택
              <div>
                <input
                  type="file"
                  name="mainPicture"
                  id="mainPicture"
                  onChange={e => this.handleFileInput(e)}
                />
              </div>
              <br />
              사진첩 사진 선택(최대 6개 까지)
              <div>
                <input
                  type="file"
                  name="subPicture"
                  id="subPicture"
                  multiple
                  onChange={this.handleFileInputs}
                />
              </div>
              <br />
              {/* 지도 띄우기 */}
              장소 선택하기
              {this.map()}
              <br />
              <Form.Group as={Row} controlId="formPost">
                <Form.Label column sm="4">
                  상세주소
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="post"
                    onChange={this.handleChange}
                    defaultValue={this.state.post}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formLocation">
                <Form.Label column sm="4">
                  장소명
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={this.handleChange}
                    defaultValue={this.state.location}
                  />
                </Col>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>
                  Close
                </Button>
                <Button onClick={this.sendUpdateParty} variant="primary">
                  확인
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default UpdateParty
