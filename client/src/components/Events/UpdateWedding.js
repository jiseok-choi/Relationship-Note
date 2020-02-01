import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MapWithASearchBox from './MapWithASearchBox';
import * as moment from 'moment';


class UpdateWedding extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: '',
            lgShow: false,
            date: moment(new Date()).format('YYYY-MM-DD'),
            time: '',
            groom: '',
            birde: '',
            invite: '',
            groomFather: '',
            groomMother: '',
            birdeFather: '',
            birdeMother: '',
            mainPicture: null,
            subPicture: [],
            center: {
                lat: 37.50735340000001, lng: 127.05585159999998
            },
            post: '',
            weddingHall: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleFileInputs = this.handleFileInputs.bind(this);
        this.changeCenter = this.changeCenter.bind(this);
        this.sendUpdateWedding = this.sendUpdateWedding.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.getWedding = this.getWedding.bind(this);
    }

    changeCenter = (center) => {
      this.setState({
        center: {
          lat: center.lat(),
          lng: center.lng(),
        } 
      })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    open = (e) => {
        e.preventDefault();
        this.setState(prev=>({
            ...prev,
            lgShow: true,
        }))
    }

    close = (e) => {
        e.preventDefault();
        this.setState(prev=>({
            ...prev,
            lgShow: false,
        }))
    }

    handleFileInput(e){
        this.setState({
            mainPicture : e.target.files[0],
        })
        console.log(this.state.mainPicture)
    }

    handleFileInputs(e){
        this.setState({
        //   selectedFiles : [...this.state.selectedFiles, ...e.target.selectedFiles],
            subPicture : e.target.files,
        })
    }

    sendUpdateWedding = (e) => {
      e.preventDefault();

      let form = new FormData();
      // let mainPicture = document.getElementById("mainPicture");
      // let subPicture = document.getElementById("subPicture");
      form.append('Picture', this.state.mainPicture);
      // form.append('Picture', this.state.subPicture);

      const subPicture = Array.from(this.state.subPicture);
      if(subPicture.length > 0){
          subPicture.map((contact, i) => {
              form.append('Pictures', contact);
          })
      }

      console.log(form.get('Picture'))
      console.log(form.get('Pictures'))

      const { date, time, groom, birde, invite, groomFather, groomMother, birdeFather, birdeMother, center, post, weddingHall } = this.state;
      form.set('date', date);
      form.set('time', time);
      form.set('groom', groom);
      form.set('birde', birde);
      form.set('invite', invite);
      form.set('groomFather', groomFather);
      form.set('groomMother', groomMother);
      form.set('birdeFather', birdeFather);
      form.set('birdeMother', birdeMother);
      form.set('lat', center.lat);
      form.set('lng', center.lng);
      form.set('post', post);
      form.set('weddingHall', weddingHall);
      form.set('fk_eventId', this.props.eventInfo.id);
      
      // form.append('subPicture', subPicture[0]);
      const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
      }

      axios
      .put(`http://localhost:8000/event/sendUpdateWedding`, form, config)
      .then(res => {
          alert('url로 청접장을 보내보세요');
        //   return this.props.close
        this.setState({
            lgShow: false
        });
        this.props.getEvents();
      })
      .catch(err => {
          console.error(err);
      })
    }

    getWedding = () => {
        const id = this.props.eventInfo.id;
        axios
            .post(`http://192.168.0.35:8000/event/getInvitation/wedding`, {
                id : id,
            })
            .then(res => {
                const { date, time, groom, birde, invite, 
                    groomFather, groomMother, birdeFather, birdeMother, 
                    mainPicture, subPicture,
                    lat, lng, 
                    post, weddingHall} = res.data;

                const center = {lat: parseFloat(lat), lng: parseFloat(lng)};

                this.setState({
                    date:moment(date).format('YYYY-MM-DD'), time, groom, birde, invite, 
                    groomFather, groomMother, birdeFather, birdeMother, 
                    center,
                    post, weddingHall
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    map = () => {
        if(this.state.center.lat !== ''){
            return(
                <MapWithASearchBox center={this.state.center} changeCenter={this.changeCenter} />
            )
        }
    }
    
    componentDidMount() {
        this.getWedding();
    }

    render() {

        return(
            <>
            <Button onClick={this.open}>수정</Button>

            <Modal
            size="lg"
            show={this.state.lgShow}
            onHide={() => this.close
            }
            aria-labelledby="example-modal-sizes-title-lg"
            >
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                    청첩장 정보 수정하기 
                </Modal.Title>
                <Modal.Dialog>
                    (사진과 지도위치는 입력하지 않으면 변경되지 않습니다)
                </Modal.Dialog>
            </Modal.Header>
            <Modal.Body>
                <Form >

                <Form.Group as={Row} controlId="formDate">
                  <Form.Label column sm="2">
                  날짜
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="date" onChange={this.handleChange} defaultValue={this.state.date}/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTime">
                  <Form.Label column sm="2">
                  시간
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="time" onChange={this.handleChange} defaultValue={this.state.time}/>
                  </Col>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Row} controlId="formGroom">
                        <Form.Label column sm="4">
                        신랑 이름
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="groom" onChange={this.handleChange} defaultValue={this.state.groom}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBirde">
                        <Form.Label column sm="5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신부 이름
                        </Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="groom" onChange={this.handleChange} defaultValue={this.state.groom}/>
                        </Col>
                    </Form.Group>
                </Form.Row>
                

                <Form.Group as={Row} controlId="formInvite">
                    <Form.Label column sm="2">
                    초대의 글
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" type="text" row="10" name="invite" onChange={this.handleChange} defaultValue={this.state.invite}/>
                    </Col>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Row} controlId="formGroomFather">
                        <Form.Label column sm="2">
                        신랑 아버지 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="groomFather" onChange={this.handleChange} defaultValue={this.state.groomFather}/>
                        </Col>
                    {/* </Form.Group>
                    <Form.Group as={Row} controlId="formGroomMother"> */}
                        <Form.Label column sm="2">
                        신랑 어머니 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="groomMother" onChange={this.handleChange} defaultValue={this.state.groomMother}/>
                        </Col>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Row} controlId="formBirdeFather">
                        <Form.Label column sm="2">
                        신부 아버지 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="birdeFather" onChange={this.handleChange} defaultValue={this.state.birdeFather}/>
                        </Col>
                    {/* </Form.Group>
                    <Form.Group as={Row} controlId="formBirdeMother"> */}
                        <Form.Label column sm="2">
                        신부 어머니 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="birdeMother" onChange={this.handleChange} defaultValue={this.state.birdeMother}/>
                        </Col>
                    </Form.Group>
                </Form.Row>

                메인사진 선택
                <div>
                    <input type='file' name='mainPicture' id='mainPicture' onChange={e => this.handleFileInput(e)}/>
                </div>
                <br/>
                사진첩 사진 선택(최대 6개 까지)
                <div>
                    <input type='file' name='subPicture' id='subPicture' multiple onChange={this.handleFileInputs}/>
                </div>
                <br/>
                {/* 지도 띄우기 */}
                장소 선택하기
                {this.map()}
                <br/>
                <Form.Group as={Row} controlId="formPost">
                  <Form.Label column sm="4">
                  상세주소명
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="post" onChange={this.handleChange} defaultValue={this.state.post}/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formWeddingHall">
                  <Form.Label column sm="4">
                  예식장명
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="weddingHall" onChange={this.handleChange} defaultValue={this.state.weddingHall}/>
                  </Col>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Close
                    </Button>
                    <Button onClick={this.sendUpdateWedding} variant="primary" >
                        확인
                    </Button>
                </Modal.Footer>

                </Form>
            </Modal.Body>

            </Modal>
            </>
        );
    }
}

export default UpdateWedding;
