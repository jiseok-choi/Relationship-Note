import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button, Card } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import publicIp from 'public-ip';
import axios from 'axios';

class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            contents: '',
            modalShow: false,
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    close = () => {
        this.setState({
            modalShow: false
        })
    }

    open = (e) => {
        e.preventDefault();
        this.setState({
            modalShow: true,
            // date: this.props.newsInfo.date,
            // title: this.props.newsInfo.title,
            // contents: this.props.newsInfo.contents,
        })
        {(async () => {
            alert(await publicIp.v4());
            //=> '46.5.21.123'
        
            console.log(await publicIp.v6());
            //=> 'fe80::200:f8ff:fe21:67cf'
        })()}
    }

    render(){

        return(
            <ButtonToolbar>
                <Button variant="primary" onClick={this.open}>
                    방명록
                </Button>

                <Modal
                show={this.state.modalShow}
                dialogClassName="modal-95w"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header>
                    <div className="col-md-12" align='center'>                
                        <h2>방명록</h2>
                    </div>    
                </Modal.Header>
                <Modal.Body>
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-5" align='center'>
                            {/* 큐알코드자리 */}
                            <QRCode 
                            value="https://naver.com"
                            size={256}
                            />

                            <h2>
                                
                                {/* QR코드로 방명록을 작성해주세요 */}
                            </h2>
                        </div>
                        <div className="col-md-7">
                            {/* 방명록자리 */}
                            <Card border="primary" style={{ width: '100%' }}>
                                <Card.Body>
                                <Card.Title>Primary Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card border="success" style={{ width: '100%' }}>
                                <Card.Body>
                                <Card.Title>Success Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card border="danger" style={{ width: '100%' }}>
                                <Card.Body>
                                <Card.Title>Danger Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card border="warning" style={{ width: '100%' }}>
                                <Card.Body>
                                <Card.Title>Warning Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card border="info" style={{ width: '100%' }}>
                                <Card.Body>
                                <Card.Title>Info Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                        </div>
                    </div>
                </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>

                </Modal>
            </ButtonToolbar>
        );
    }
}

export default Visit;