import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import MapWithASearchBox from './MapWithASearchBox';
import * as moment from 'moment';


class CreateParty extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: '',
            lgShow: false,
            date: moment(new Date()).format('YYYY-MM-DD'),
            time: '',
            mainCharacter: '',
            title: '',
            invite: '',
            mainPicture: null,
            subPicture: [],
            center: {
                lat: 37.50735340000001, lng: 127.05585159999998
            },
            post: '',
            location: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleFileInputs = this.handleFileInputs.bind(this);
        this.changeCenter = this.changeCenter.bind(this);
        this.sendCreateParty = this.sendCreateParty.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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

    sendCreateParty = (e) => {
      e.preventDefault();

      let form = new FormData();
      form.append('Picture', this.state.mainPicture);

      const subPicture = Array.from(this.state.subPicture);
      if(subPicture.length > 0){
          subPicture.map((contact, i) => {
              form.append('Pictures', contact);
          })
      }

      const { date, time, mainCharacter, title, invite, center, post, location } = this.state;
      form.set('date', date);
      form.set('time', time);
      form.set('mainCharacter', mainCharacter);
      form.set('title', title);
      form.set('invite', invite);
      form.set('lat', center.lat);
      form.set('lng', center.lng);
      form.set('post', post);
      form.set('location', location);
      
      // form.append('subPicture', subPicture[0]);
      const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
      }

      axios
      .post(`http://localhost:8000/event/sendCreateParty`, form, config)
      .then(res => {
        this.setState({
            lgShow: false
        });
        this.props.getEvents();
        return(
            <Alert variant={'success'}>url로 초대장을 보내보세요</Alert>
        )
        //   return this.props.close
        
      })
      .catch(err => {
          console.error(err);
      })
    }


    render() {

        return(
            <>
            <Button onClick={this.open}>행사</Button>

            <Modal
            size="lg"
            show={this.state.lgShow}
            onHide={() => this.close
            }
            aria-labelledby="example-modal-sizes-title-lg"
            >
                
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                    행사 정보 입력하기
                </Modal.Title>
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
                  <Form.Control type="text" name="time" onChange={this.handleChange} placeholder="12:00"/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                    행사 주인공 이름
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" name="mainCharacter" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                    행사명
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" name="title" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>
                

                <Form.Group as={Row} controlId="formInvite">
                    <Form.Label column sm="2">
                    초대의 글
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" type="text" row="10" name="invite" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>

                
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
                <MapWithASearchBox center={this.state.center} changeCenter={this.changeCenter} />
                <br/>
                <Form.Group as={Row} controlId="formPost">
                  <Form.Label column sm="4">
                  상세주소
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="post" onChange={this.handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} >
                  <Form.Label column sm="4">
                  행사 장소명
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="location" onChange={this.handleChange} />
                  </Col>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Close
                    </Button>
                    <Button onClick={this.sendCreateParty} variant="primary" >
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

export default CreateParty;
