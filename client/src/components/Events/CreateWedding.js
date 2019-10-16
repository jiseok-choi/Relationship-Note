import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';

class CreateWedding extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
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
                        의 새 소식 적기
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                    <Form.Row>
                        <Form.Group as={Row} controlId="formGroom">
                            <Form.Label column sm="2">
                            신랑 이름
                            </Form.Label>
                            <Col sm="4">
                            <Form.Control type="text" name="groom" onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBirde">
                            <Form.Label column sm="2">
                            신부 이름
                            </Form.Label>
                            <Col sm="4">
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
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGroomMother">
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
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBirdeMother">
                            <Form.Label column sm="2">
                            신부 어머니 성함 입력
                            </Form.Label>
                            <Col sm="4">
                            <Form.Control type="text" name="birdeMother" onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>
                    </Form.Row>

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

export default CreateWedding;