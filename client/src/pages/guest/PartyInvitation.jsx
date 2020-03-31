// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from "react"
import { Button, Container, Row, Col, Card, CardColumns } from "react-bootstrap"
import axios from "axios"
import Carousel, { Modal as Modals, ModalGateway } from "react-images"
import MapWithAMarker from "../../components/Events/MapWithAMarker"
import * as moment from "moment"
import dotenv from "dotenv"
dotenv.config()

class PartyInvitation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      mainCharacter: "",
      title: "",
      invite: "",
      date: "",
      time: "",
      mainPicture: "",
      subPicture: [{ src: "" }],
      lat: "",
      lng: "",
      post: "",
      location: "",
      modalIsOpen: false
    }
    this.getInvitation = this.getInvitation.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.album = this.album.bind(this)
  }

  images = []

  getInvitation = () => {
    axios
      // .get(`http://${process.env.IP}/visit/getVisit`, {
      .post(`http://54.180.149.57:8000/event/getInvitation/party`, {
        id: this.props.match.params.id
      })
      .then(res => {
        const {
          date,
          time,
          mainCharacter,
          title,
          invite,
          mainPicture,
          subPicture,
          lat,
          lng,
          post,
          location
        } = res.data
        //첫글자 ';' 제거
        const changeSubPicture = subPicture.slice(1).split(";")
        this.setState({
          date,
          time,
          mainCharacter,
          title,
          invite,
          mainPicture,
          lat,
          lng,
          post,
          location
        })
        changeSubPicture.forEach(element => {
          if (element.length > 4) {
            this.images.push({
              src: `https://rnotestorage.s3.ap-northeast-2.amazonaws.com/` + element
            })
          }
        })
        this.setState({ subPicture: this.images })
        console.log(this.state.subPicture)
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentWillMount() {
    this.getInvitation()
  }

  invite = text => {
    return text.split("\n").map(line => {
      return (
        <span>
          {line}
          <br />
        </span>
      )
    })
  }

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }))
  }

  album = images => {
    return <Carousel views={images} />
  }

  map = () => {
    if (this.state.lat !== "") {
      return <MapWithAMarker lat={this.state.lat} lng={this.state.lng} />
    }
  }

  render() {
    const {
      date,
      time,
      mainCharacter,
      title,
      invite,
      mainPicture,
      subPicture,
      lat,
      lng,
      post,
      location
    } = this.state

    return (
      <>
        <Container align="center">
          <Card.Img
            variant="top"
            src={`https://rnotestorage.s3.ap-northeast-2.amazonaws.com/${mainPicture}`}
          />

          <h3>
            {mainCharacter}님의 {title}에
          </h3>
          <br />
          <h1>초대합니다</h1>

          <br />
        </Container>

        <Container align="center">
          <Card.Header>초대의글</Card.Header>
          <br />
          <Col>
            <strong>{this.invite(invite)}</strong>
          </Col>
          <br />
          <br />
        </Container>

        <Container>
          <Card.Header align="center">사진</Card.Header>
          <br />

          {this.album(subPicture)}

          <br />
          <br />
        </Container>

        <Container>
          <Card.Header align="center">시간 및 장소</Card.Header>
          <br />

          <h3>
            일시: {moment(date).format("YYYY-MM-DD")} {time}
          </h3>
          <h3>
            장소: {post} {location}
          </h3>
          {console.log("위도경도", lat, lng)}
          {this.map()}
          <br />
          <br />
          <br />
        </Container>
      </>
    )
  }
}

export default PartyInvitation
