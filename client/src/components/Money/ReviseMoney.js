import React, { Component } from "react"
import { Modal, ButtonToolbar, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"
import moment from "moment"
// moment.lang('ko');
moment.locale("kr")

class ReviseMoney extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      visitid: "notChange",
      name: "notChange",
      contents: "notChange",
      celebration: 0,
      date: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeVisit = this.changeVisit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeVisit = event => {
    event.preventDefault()

    axios
      .put(`http://localhost:8000/money/reviseMoney`, {
        visitid: this.state.visitid,
        name: this.state.name,
        celebration: this.state.celebration
      })
      .then(res => {
        const newvisit = res.data !== undefined
        if (newvisit) {
          this.setState({ lgShow: false })
          console.log(res.data)
          this.props.getEvents()
          this.props.getEvent()
          this.props.getVisits()
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
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => {
            console.log(this.props.visitInfo)
            this.setState({
              lgShow: true,
              visitid: this.props.visitInfo.id,
              date: this.props.visitInfo.createdAt,
              name: this.props.visitInfo.name,
              contents: this.props.visitInfo.contents,
              celebration: this.props.visitInfo.celebration
            })
          }}
        >
          수정
        </Button>

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
            <Modal.Title id="example-modal-sizes-title-lg">방명록 수정 하기</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm="2">
                  이름
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    defaultValue={this.props.visitInfo.name}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formComents">
                <Form.Label column sm="2">
                  코멘트
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={this.props.visitInfo.contents} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formCelebration">
                <Form.Label column sm="2">
                  축의금
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    name="celebration"
                    onChange={this.handleChange}
                    defaultValue={this.props.visitInfo.celebration}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formDate">
                <Form.Label column sm="2">
                  일시
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    onChange={this.handleChange}
                    defaultValue={moment(this.props.visitInfo.date).format(
                      "YYYY[년] MM[월] DD[일],  h[시] mm[분]"
                    )}
                  />
                </Col>
              </Form.Group>
              <div class="flex flex-col xs:flex-row items-center">
                <Button onClick={this.changeVisit} variant="primary" type="submit">
                  수정
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    )
  }
}

export default ReviseMoney
