import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button, Card, CardColumns } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import axios from 'axios';
import dotenv from 'dotenv';
const env = dotenv.config();

class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            contents: '',
            modalShow: false,
            visitList: [],
            cardver: ['primary', 'success', 'danger', 'warning', 'info'],
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.getVisitList = this.getVisitList.bind(this);
    }

    getVisitList = () => {
        axios
            .post(`http://192.168.0.35:8000/visit/getVisitList`, {
                data: {
                    id: this.props.eventInfo.id,
                }
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    visitList: res.data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    open = (e) => {
        e.preventDefault();
        this.setState({
            modalShow: true,
            // date: this.props.newsInfo.date,
            // title: this.props.newsInfo.title,
            // contents: this.props.newsInfo.contents,
        });
        this._interval = setInterval(this.getVisitList, 3000);
    }

    close = () => {
        this.setState({
            modalShow: false
        })
        if(this._interval){
            clearInterval(this._interval);
        }
        
    }

    componentDidMount() {
    }

    showVisits = (visitList) => {

        return visitList.map((contact, i) => {
            return(
                <Card className='text-center' key={i} border={this.state.cardver[i%10]} style={{ width: '100%' }}>
                    <Card.Body>
                    <Card.Title>{contact.name}</Card.Title>
                    <Card.Text>
                        {contact.contents}
                    </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
        
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
                            // value={`https://${process.env.IP}/visitPage/6`}
                            value={`http://192.168.0.35:3000/visitPage/${this.props.eventInfo.id}`}
                            size={256}
                            />

                            <h2>
                                QR코드로 방명록을 작성해주세요
                            </h2>
                        </div>
                        <div className="col-md-7">
                            {/* 방명록자리 */}
                            <CardColumns>
                            {this.showVisits(this.state.visitList)}
                            </CardColumns>
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