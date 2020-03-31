// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from "react"
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"
import axios from "axios"
import * as moment from "moment"

import dotenv from "dotenv"
dotenv.config()

// import testImage from '../../../server/uploads/visit_img1572859573171.jpg';
// import testImage1 from '../../../server/uploads/visit_img1572859573171.jpg';

const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

class VisitPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      userid: "",
      name: "",
      contents: "",
      celebration: "",
      password: "",
      picture: "",
      selectedFile: null,
      imagePreviewUrl: null
    }
    this.getVisit = this.getVisit.bind(this)
    this.newVisit = this.newVisit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
  }

  getVisit = () => {
    axios
      // .get(`http://${process.env.IP}/visit/getVisit`, {
      .get(`http://54.180.149.57:8000/visit/getVisit`, {
        params: {
          id: this.props.match.params.id
        }
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          // picture: URL.createObjectURL(res.data),
          picture: res.data
        })
        // this.fileChangedHandler(this.state.picture);
        // console.log(this.state.picture)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  newVisit = e => {
    e.preventDefault()

    axios
      .post(`http://54.180.149.57:8000/visit/newVisit`, {
        data: {
          name: this.state.name,
          contents: this.state.contents,
          celebration: this.state.celebration,
          password: this.state.password,
          id: this.props.match.params.id
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data === true) {
          window.location.reload()
          alert("방명록이 등록되었습니다")
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.getVisit()
  }

  render() {
    return (
      <div>
        {/* {alert(this.props.match.url)} */}
        {/* {console.log(this.props.match.params)} */}
        <h3 align="center">방명록을 작성해주세요</h3>
        <Container align="center">
          <Card align="center" style={{ width: "15rem" }}>
            <Card.Img
              variant="top"
              src={`https://rnotestorage.s3.ap-northeast-2.amazonaws.com/${this.state.picture}`}
            />
          </Card>
          {/* <ImageLoader file={this.state.picture} alt='some text'/> */}
          {/* <ImageLoader file={'http://temp/visit_img1572859573171.jpg'} alt='some text'/> */}
          {/* <Example data={this.arrayBufferToBase64(this.state.picture)}/> */}
          {/* {this.state.picture} */}
          {/* <img src={this.state.picture}/> */}
          {/* <img src={'http://temp/visit_img1572859573171.jpg'}/> */}
          <Form>
            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={3}>
                이 름
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="홍길동"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalContents">
              <Form.Label column sm={3}>
                덕담한마디
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="contents"
                  placeholder="축하합니다"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalCelebration">
              <Form.Label column sm={3}>
                축의금
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  name="celebration"
                  placeholder="방명록 대장에 보이지 않습니다"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={3}>
                비밀번호
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="1234"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.newVisit}>
              작성
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default VisitPage
