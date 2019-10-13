import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class NewFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            lgShow: false,
            name: '',
            relationship: '',
            age: '',
            gender: '',
            birth: '',
            job: '',
            school: '',
            phoneNum: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendNewFriend = this.sendNewFriend.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendNewFriend = (event) => {
        event.preventDefault();



        axios
        .post(`http://localhost:8000/friend/newfriend`, {
            data: {
                name: this.state.name,
                relationship: this.state.relationship,
                age: this.state.age,
                gender: this.state.gender,
                birth: this.state.birth,
                job: this.state.job,
                school: this.state.school,
                phone_Num: this.state.phoneNum,
            }
        })
        .then(res => {
            const newFriend = res.data !== undefined;
            if(newFriend){
                this.setState({lgShow: false});
                console.log(res.data);
                this.props.getFriend();
                // window.location.reload(); //새로고침
            } else {
                alert(res.data);
                console.error(res.data);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }


    render() {
        return(
            <ButtonToolbar>
                <Button onClick={() => this.setState({
                lgShow: true,
                })}>지인생성</Button>
        
                <Modal
                size="lg"
                show={this.state.lgShow}
                onHide={() => this.setState({
                    lgShow: false,
                })}
                aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    지인 정보 생성
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                        이름
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="name" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formRelationship">
                        <Form.Label column sm="2">
                        관계
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="relationship" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formAge">
                        <Form.Label column sm="2">
                        나이
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="number" name="age" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formGender">
                        <Form.Label column sm="2">
                        성별
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="string" name="gender" onChange={this.handleChange}></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBirth">
                        <Form.Label column sm="2">
                        생년월일
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="date" name="birth" placeholder="20xx0x0x" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formJob">
                        <Form.Label column sm="2">
                        직업
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="job" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSchool">
                        <Form.Label column sm="2">
                        학교
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="school" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPhoneNum">
                        <Form.Label column sm="2">
                        전화번호
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="phoneNum" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                    <Button onClick={this.sendNewFriend} variant="primary" type="submit">
                        확인
                    </Button>
                    </Form>
                </Modal.Body>

                </Modal>
            </ButtonToolbar>
        );
    }
}

export default NewFriend;