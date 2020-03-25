import React, { Component } from "react"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"

class ReviseNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      friendid: "notChange",
      date: "notChange",
      title: "notChange",
      contents: "notChange",
      id: ""
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
      // .put(`http://localhost:8000/news/reviseNews`, {
      .put(`http://54.180.149.57:8000/news/reviseNews`, {
        data: {
          friendid: this.state.friendid,
          date: this.state.date,
          title: this.state.title,
          contents: this.state.contents,
          id: this.state.id
        }
      })
      .then(res => {
        const newNews = res.data !== undefined
        if (newNews) {
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

  render() {
    return (
      <>
        <button
          onClick={() =>
            this.setState({
              lgShow: true,
              friendid: this.props.newsInfo.friendid,
              date: this.props.newsInfo.date,
              title: this.props.newsInfo.title,
              contents: this.props.newsInfo.contents,
              id: this.props.newsInfo.id
            })
          }
        >
          <img src="../images/edit.png" class="h-6 w-6 ml-2" />
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
            <Modal.Title id="example-modal-sizes-title-lg">소식 수정 하기</Modal.Title>
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
                    defaultValue={this.props.newsInfo.date}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formTitle">
                <Form.Label column sm="2">
                  제목
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    defaultValue={this.props.newsInfo.title}
                  />
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
                    defaultValue={this.props.newsInfo.contents}
                  />
                </Col>
              </Form.Group>

              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.sendNewNews} variant="primary" type="submit">
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

export default ReviseNews
