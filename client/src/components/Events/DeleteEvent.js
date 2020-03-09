import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

class DeleteEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lgShow: false,
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    open = (e) => {
        e.preventDefault();
        this.setState(prev=>({
            ...prev,
            lgShow: true,
        }))
    }

    close = (e) => {
        e.preventDefault();
        this.setState(prev=>({
            ...prev,
            lgShow: false,
        }))
    }

    deleteEvent = () => {
        axios
        .delete(`http://localhost:8000/event/delete${this.props.eventInfo.id}`)
        .then(res => {
            if(res.data === true){
                this.setState({
                    lgShow: false
                });
                this.props.getEvents();
            }
        })
    }

    render() {
        return (
          <>
            <button onClick={this.open}>
              <img src="./images/delete.png" class="h-6 w-6 ml-2" />
            </button>
            <Modal size="lg" show={this.state.lgShow} onHide={this.close}>
              <Modal.Header>
                <Modal.Title>삭제 확인!!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                해당 이벤트와 관련된 내용도 같이 사라집니다 계속하시겠습니까?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>
                  취소
                </Button>
                <Button variant="warning" onClick={this.deleteEvent}>
                  삭제
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}

export default DeleteEvent;