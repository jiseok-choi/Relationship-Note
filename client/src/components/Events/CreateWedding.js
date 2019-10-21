import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Geosuggest, { Suggest } from "react-geosuggest";
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";


const MapWithAMarker = withGoogleMap(props => 
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            <Marker
                position = {{ lat: -34.397, lng: 150.644 }} 
            />
        </GoogleMap>
);


class CreateWedding extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            value: '',
            lgShow: false,
            mainPicture: null,
            subPicture: [],
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleFileInputs = this.handleFileInputs.bind(this);

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
                <Form>

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
                        <Form.Label column sm="4">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신부 이름
                        </Form.Label>
                        <Col sm="8">
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
                

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>
                        Close
                    </Button>
                    <Button onClick={this.sendCreateWedding} variant="primary" type="submit">
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
