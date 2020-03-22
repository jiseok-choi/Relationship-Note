import React, { Component } from "react"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"
import * as moment from "moment"

class NewNews extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      lgShow: false,
      friendid: this.props.friendInfo.id,
      date: moment(new Date()).format("YYYY-MM-DD"),
      title: "",
      contents: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendNewNews = this.sendNewNews.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendNewNews = event => {
    event.preventDefault()

    axios
      .post(`http://localhost:8000/news/newNews`, {
        data: {
          friendid: this.props.friendInfo.id,
          date: this.state.date,
          title: this.state.title,
          contents: this.state.contents
        }
      })
      .then(res => {
        const newFriend = res.data !== undefined
        if (newFriend) {
          this.setState({ lgShow: false })
          console.log(res.data)
          this.props.addNews()
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

  open = e => {
    e.preventDefault()
    this.setState(prev => ({
      ...prev,
      lgShow: true
    }))
  }

  render() {
    const friendInfo = this.props.friendInfo
    return (
      <>
        <button
          onClick={this.open}
          class="flex justify-right mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          소식추가
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
            <Modal.Title id="example-modal-sizes-title-lg">
              {friendInfo.name}의 새 소식 적기
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formDate">
                <Form.Label column sm="2">
                  날짜
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={this.handleChange}
                    defaultValue={this.state.date}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formTitle">
                <Form.Label column sm="2">
                  제목
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="title" onChange={this.handleChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formContents">
                <Form.Label column sm="2">
                  내용
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    type="text"
                    row="10"
                    name="contents"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.sendNewNews} variant="primary" type="submit">
                  작성
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default NewNews
