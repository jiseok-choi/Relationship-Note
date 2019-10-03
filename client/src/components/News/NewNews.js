import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class NewNews extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            value: '',
            lgShow: false,
            friendid: this.props.friendInfo.id,
            date: this.props.today,
            title: '',
            contents: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendNewNews = this.sendNewNews.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendNewNews = (event) => {
        event.preventDefault();

        // this.setState({
        //     friendid: this.props.friendInfo.id,
        // });

        axios
        .post(`http://localhost:8000/news/newNews`, {
            data: {
                friendid: this.props.friendInfo.id,
                date: this.state.date,
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

    open = (e) => {
        e.preventDefault();
        this.setState(prev=>({
                ...prev,
            lgShow: true,
        }))
    }

    


    render() {
        const friendInfo  = this.props.friendInfo;
        return(
            <ButtonToolbar>
                <Button 
                onClick={this.open}
                >소식추가</Button>
        
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
                        {friendInfo.name}의 새 소식 적기
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                    <Form.Group as={Row} controlId="formDate">
                        <Form.Label column sm="2">
                        날짜
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="date" name="date" onChange={this.handleChange} defaultValue={this.props.today}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formTitle">
                        <Form.Label column sm="2">
                        제목
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="title" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formContents">
                        <Form.Label column sm="2">
                        내용
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="textarea" type="text" row="10" name="contents" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Button onClick={this.sendNewNews} variant="primary" type="submit">
                        확인
                    </Button>
                    </Form>
                </Modal.Body>

                </Modal>
            </ButtonToolbar>
        );
    }
}

export default NewNews;