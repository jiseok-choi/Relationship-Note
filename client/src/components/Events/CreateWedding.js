import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Form, Row, Col } from 'react-bootstrap';

class CreateWedding extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: '',
            lgShow: false,
            selectedFile: null,
        }
        this.handleChange = this.handleChange.bind(this);

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
          selectedFile : e.target.files[0],
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
                    <input type='file' name='file' onChange={e => this.handleFileInput(e)}/>
                </div>
                




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