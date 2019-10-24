import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MapWithASearchBox from './MapWithASearchBox';


class CreateWedding extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            value: '',
            lgShow: false,
            date: '',
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
    }

    changeCenter = (center) => {
      this.setState({
        center: {
          lat: center.lat(),
          lug: center.lng(),
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

    sendCreateWedding = (e) => {
      e.preventDefault();

      let form = new FormData();
      // let mainPicture = document.getElementById("mainPicture");
      // let subPicture = document.getElementById("subPicture");
      form.append('Picture', this.state.mainPicture);
      // form.append('Picture', this.state.subPicture);

      const subPicture = Array.from(this.state.subPicture);
      if(subPicture.length > 0){
          subPicture.map((contact, i) => {
              form.append('Picture', contact);
          })
      }
      
      // form.append('subPicture', subPicture[0]);
      const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
      }

      axios
      .post(`http://localhost:8000/event/sendCreateWedding`, form, config, {
          
          // picture: form,
          data: {
              date: this.state.date,
              time: this.state.time,
              groom: this.state.groom,
              birde: this.state.birde,
              invite: this.state.invite,
              groomFather: this.state.groomFather,
              groomMother: this.state.groomMother,
              birdeFather: this.state.birdeFather,
              birdeMother: this.state.birdeMother,
              lat: this.state.center.lat,
              lng: this.state.center.lng,
              post: this.state.post,
              weddingHall: this.state.weddingHall,
          }
      })
      .then(res => {
          alert('성공적으로 업로드 했습니다.');
          return this.props.close;
      })
      .catch(err => {
          console.error(err);
      })
    }


    render() {

        return(
            <>
            <Modal
            size="lg"
            show={this.props.show}
            onHide={() => this.props.close
            }
            aria-labelledby="example-modal-sizes-title-lg"
            >
                
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                    청첩장 정보 입력하기
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form >

                <Form.Group as={Row} controlId="formDate">
                  <Form.Label column sm="2">
                  날짜
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="date" onChange={this.handleChange}/>
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

                <Form.Row>
                    <Form.Group as={Row} controlId="formGroom">
                        <Form.Label column sm="4">
                        신랑 이름
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="groom" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBirde">
                        <Form.Label column sm="5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신부 이름
                        </Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="birde" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                </Form.Row>
                

                <Form.Group as={Row} controlId="formInvite">
                    <Form.Label column sm="2">
                    초대의 글
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" type="text" row="10" name="invite" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Row} controlId="formGroomFather">
                        <Form.Label column sm="2">
                        신랑 아버지 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="groomFather" onChange={this.handleChange}/>
                        </Col>
                    {/* </Form.Group>
                    <Form.Group as={Row} controlId="formGroomMother"> */}
                        <Form.Label column sm="2">
                        신랑 어머니 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="groomMother" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Row} controlId="formBirdeFather">
                        <Form.Label column sm="2">
                        신부 아버지 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="birdeFather" onChange={this.handleChange}/>
                        </Col>
                    {/* </Form.Group>
                    <Form.Group as={Row} controlId="formBirdeMother"> */}
                        <Form.Label column sm="2">
                        신부 어머니 성함 입력
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="birdeMother" onChange={this.handleChange}/>
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
                <MapWithASearchBox center={this.state.center} changeCenter={this.changeCenter} />
                <br/>
                <Form.Group as={Row} controlId="formPost">
                  <Form.Label column sm="4">
                  상세주소명
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="post" onChange={this.handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formWeddingHall">
                  <Form.Label column sm="4">
                  예식장명
                  </Form.Label>
                  <Col sm="8">
                  <Form.Control type="text" name="weddingHall" onChange={this.handleChange} />
                  </Col>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>
                        Close
                    </Button>
                    <Button onClick={this.sendCreateWedding} variant="primary" >
                        확인
                    </Button>
                </Modal.Footer>

                </Form>
            </Modal.Body>

            </Modal></>
        );
    }
}

export default CreateWedding;
