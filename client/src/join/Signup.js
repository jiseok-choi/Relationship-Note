import React, { Component } from "react"
import { ButtonToolbar, Modal, Button, Form, Row, Col } from "react-bootstrap"
import axios from "axios"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      lgShow: false,
      email: "",
      userid: "",
      password: "",
      name: ""
    }
    this.sendSignup = this.sendSignup.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendSignup = event => {
    event.preventDefault()

    // const frm = new FormData();
    // frm.append('email', this.state.email);
    // frm.append('userid', this.state.id);
    // frm.append('password', this.state.pw);
    // frm.append('name', this.state.name);

    console.log(this.state.password)
    axios
      .post(`http://localhost:8000/auth/signup`, {
        data: {
          email: this.state.email,
          userid: this.state.userid,
          password: this.state.password,
          name: this.state.name
        }
      })
      .then(res => {
        const newUser = res.data.id !== undefined
        if (newUser) {
          alert("회원가입이 완료되었습니다 로그인 해주세요")
          this.setState({ lgShow: false }) //화면 닫기
          console.log(res.data)
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
          onClick={() =>
            this.setState({
              lgShow: true
            })
          }
        >
          회원가입
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
            <Modal.Title id="example-modal-sizes-title-lg">회원가입</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column sm="2">
                  이메일
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="email" onChange={this.handleChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formId">
                <Form.Label column sm="2">
                  아이디
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="userid" onChange={this.handleChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPassword">
                <Form.Label column sm="2">
                  비밀번호
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    onChange={this.handleChange}
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

              <Button onClick={this.sendSignup} variant="primary" type="submit">
                확인
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    )
  }
}

export default Signup
