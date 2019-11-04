// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import ImageLoader from 'react-image-file';

const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

class VisitPage extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            value: '',
            userid: '',
            name: '',
            celebration: '',
            password: '',
            picture: '',
            selectedFile: null,
            imagePreviewUrl: null,
        };
        this.getVisit = this.getVisit.bind(this);
        this.newVisit = this.newVisit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
    }

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        console.log(binary);
        // return window.btoa(binary);
        return binary;
    };

    fileChangedHandler = eventa => {
        this.setState({
          selectedFile: eventa
        })
     
        let reader = new FileReader();
         
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }
     
        reader.readAsDataURL(eventa)
     
      }

    getVisit = () => {

        axios
            .get(`http://localhost:8000/visit/getVisit`, {
                params: {
                    id : this.props.match.params.id
                }
            })
            .then(res => {
                // console.log(res.data);
                this.setState({
                    // picture: URL.createObjectURL(res.data),
                    picture: res.data,
                })
                // this.fileChangedHandler(this.state.picture);
                // console.log(this.state.picture)
            })
            .catch(err => {

                console.error(err);
            });
    }
    
    newVisit = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:8000/visit/newVisit`, {
                
            })
            .then(res => {
                console.log(res.config.data);

                // if(res.data === 'logout'){

                // } else {
                //     alert(res.data);
                //     console.error(res.data); 
                // }
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.getVisit();
    }

    

    render() {
        return (
            <div>
                {/* {alert(this.props.match.url)} */}
                {/* {console.log(this.props.match.params)} */}
                <h1 align='center'>방명록을 작성해주세요</h1>
                <Container>
                {/* <Card align='center' style={{ width: '30rem' }}>
                <Card.Img variant="top"  src={this.state.picture} />
                </Card> */}
                {/* <ImageLoader file={this.state.picture} alt='some text'/> */}
                {/* <Example data={this.arrayBufferToBase64(this.state.picture)}/> */}
                {/* {this.state.picture} */}
                <img src={this.state.picture}/>
                <Form align='center'>

                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={3}>
                        이 름
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="text" name="name" placeholder="홍길동" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={3}>
                        축의금
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="number" name="celebration" placeholder="10000" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={3}>
                        비밀번호
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="password" placeholder="1234" />
                        </Col>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={this.newVisit}>
                        작성
                    </Button>
                </Form>
                </Container>
            </div>
        );
    }
};

export default VisitPage;