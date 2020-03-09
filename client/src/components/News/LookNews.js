import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';

class LookNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            contents: '',
            modalShow: false,
        }
        this.close = this.close.bind(this);
        this.changeText = this.changeText.bind(this);
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
            date: this.props.newsInfo.date,
            title: this.props.newsInfo.title,
            contents: this.props.newsInfo.contents,
        })
    }

    changeText = (data) => {
        return(
            data.split('\n').map(line => {
                return( <span>{line}<br/></span>)
            })
        )
        
    }

    render(){

        return (
          <>
            <button onClick={this.open}>
              <img src="../images/paperlook.png" class="h-6 w-6 ml-2" />
            </button>

            <Modal
              // {...props}
              size="lg"
              show={this.state.modalShow}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onClick={this.close}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {this.state.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>날짜 : {this.state.date}</h5>
                <p>{this.changeText(this.state.contents)}</p>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}

export default LookNews;