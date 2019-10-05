import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Modal, ButtonToolbar, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
 
class FriendSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //컴포넌트 자체 값
            date: new Date(),
            value: '',
            lgshow: false,
            //컴포넌트 기입 값
            start: '',
            end: '',
            title: '',
            contents: '',
            //외부에서 받아와야하는 값
            name: '',
            friendid: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendNewSchedule = this.sendNewSchedule.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendNewSchedule = (event) => {
        event.preventDefault();

        axios
        .put(`http://localhost:8000/friend/sendNewSchedule`, {
            data: {
                name: this.state.name,
                relationship: this.state.relationship,
                age: this.state.age,
                gender: this.state.gender,
                birth: this.state.birth,
                job: this.state.job,
                school: this.state.school,
                phone_Num: this.state.phoneNum,
                id : this.state.id,
            }
        })
        .then(res => {
            const newFriend = res.data !== undefined;
            if(newFriend){
                this.setState({lgShow: false});
                console.log(res.data);
                window.location.reload(); //새로고침
            } else {
                alert(res.data);
                console.error(res.data);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }
    
    onChange = date => this.setState({ date })
    
    render() {
        return (

            <ButtonToolbar>
                <Button onClick={() => this.setState({
                    date: new Date(),
                    lgShow: true,
                    // name: this.props.friendInfo.name,
                    // friendid: this.props.friendInfo.id,
                    })}>친구일정
                </Button>
        
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
                        {this.state.name}의 일정 등록
                    </Modal.Title>
                </Modal.Header>

                    <Modal.Body>
                        <Form>

                            <Form.Group as={Row} controlId="formTitle">
                                <Form.Label column sm="2">
                                제목
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" name="title" onChange={this.handleChange} ></Form.Control>
                                </Col>
                            </Form.Group>

                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                            
                            <Form.Group as={Row} controlId="formStart">
                                <Form.Label column sm="2">
                                시작 날짜
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" name="start" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formEnd">
                                <Form.Label column sm="2">
                                끝 날짜
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="number" name="end" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formContents">
                                <Form.Label column sm="2">
                                내용
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" name="contents" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Button onClick={this.sendNewSchedule} variant="primary" type="submit">
                                등록
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </ButtonToolbar>


        );
    }
}

export default FriendSchedule;