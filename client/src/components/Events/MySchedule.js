import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Modal, ButtonToolbar, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';


moment.locale("ko");

class MySchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //컴포넌트 자체 값
            date: new Date(),
            value: '',
            lgShow: false,
            //컴포넌트 기입 값
            start: '',
            end: '',
            title: '',
            contents: '',
            //외부에서 받아와야하는 값
            name: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendNewSchedule = this.sendNewSchedule.bind(this);
        this.selectRange = this.selectRange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendNewSchedule = (event) => {
        event.preventDefault();

        axios
        .post(`http://localhost:8000/schedule/sendNewSchedule`, {
            data: {
                kinds: '유저일정',
                friendid : null,
                startdate: this.state.start,
                enddate: this.state.end,
                title: this.state.title,
                contents: this.state.contents,
            }
        })
        .then(res => {
            const newFriend = res.data !== undefined;
            if(newFriend){
                this.setState({lgShow: false});
                console.log(res.data);
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
    
    onChange = (date) => {
        console.log( date, moment(date[0]).format("YYYY-MM-DD"),moment(date[1]).format("YYYY-MM-DD") );
        this.setState({ 
            start: moment(date[0]).format("YYYY-MM-DD"),
            end: moment(date[1]).format("YYYY-MM-DD"),
         })
    }

    selectRange = (date) => {
        console.log(date+'selectRange 실행됨');
    }
    
    render() {
        return (

            <ButtonToolbar>
                <button onClick={() => this.setState({
                    date: new Date(),
                    lgShow: true,
                    })}
                    class="block bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">생성
                </button>
        
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
                        나의 일정 등록
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
                                selectRange={this.selectRange}
                            />
                            
                            <Form.Group as={Row} controlId="formStart">
                                <Form.Label column sm="2">
                                시작 날짜
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" name="start" defaultValue={this.state.start} onChange={this.onChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formEnd">
                                <Form.Label column sm="2">
                                끝 날짜
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" name="end" defaultValue={this.state.end} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formContents">
                                <Form.Label column sm="2">
                                내용
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control as="textarea" type="text" name="contents" onChange={this.handleChange} />
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

export default MySchedule;