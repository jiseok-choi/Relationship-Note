// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Button, Container, Row, Col, Card, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import Carousel, { Modal as Modals, ModalGateway } from 'react-images';
import MapWithAMarker from '../../components/Events/MapWithAMarker';

const style = {
    width: window.innerWidth-50,
    height: window.innerWidth-50
  }

class WeddingInvitation extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            date: '',
            time: '',
            groom: '',
            birde: '',
            invite: '',
            groomFather: '',
            groomMother: '',
            birdeFather: '',
            birdeMother: '',
            mainPicture: '',
            subPicture: [{src:''}],
            lat: '', 
            lng: '', 
            post: '',
            weddingHall: '',
            modalIsOpen: false,
        };
        this.getInvitation = this.getInvitation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.album = this.album.bind(this);
    }

    images = [ ];

    getInvitation = () => {

        axios
            // .get(`http://${process.env.IP}/visit/getVisit`, {
            .post(`http://172.30.1.33:8000/event/getInvitation/wedding`, {
                data: {
                    id : this.props.match.params.id
                }
            })
            .then(res => {
                const { date, time, groom, birde, invite, 
                    groomFather, groomMother, birdeFather, birdeMother, 
                    mainPicture, subPicture,
                    lat, lng, 
                    post, weddingHall} = res.data;
                //첫글자 ';' 제거
                const changeSubPicture = subPicture.slice(1).split(';');
                this.setState({
                    date, time, groom, birde, invite, 
                    groomFather, groomMother, birdeFather, birdeMother, 
                    mainPicture, 
                    // lat:parseFloat(lat), lng:parseFloat(lng), 
                    // lat:String(lat), lng:parseFloat(lng), 
                    lat, lng, 
                    post, weddingHall
                })
                // let images = changeSubPicture.map((text, key) => {this.images[key].src = text });
                changeSubPicture.forEach(element => {
                    this.images.push({src: 'http://172.30.1.33:8000/'+element})
                });
                // console.log(this.state.subPicture);
                this.setState({subPicture: this.images})
                console.log(this.state.subPicture);
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentWillMount() {
        this.getInvitation();
    }

    invite = (text) => {
        return text.split('\n').map(line => {
            return (<span>{line}<br/></span>)
        })
    }

    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    album = (images) => {
        const { modalIsOpen } = this.state;
        // const pictureImg = pictures.map(text => ({ src: `http://172.30.1.33:8000/${text}`}) )
        const temp = 
            // [{ src: `http://172.30.1.33:8000/${this.state.mainPicture}`} ,{src: `http://172.30.1.33:8000/friend_img1572867145195.jpg` }]
            [{ src: ''} ]
        ;
        // if(images.length === 0) return;
        console.log(images)
        return(
            // <ModalGateway>
            //     {modalIsOpen ? (
            //         <Modals onClose={this.toggleModal}>
            //             <Carousel views={images} />
            //         </Modals>
            //     ) : <div onClick={this.toggleModal}> <Carousel views={images} onClickImage={this.toggleModal}/> </div>  }
            // </ModalGateway>
            <Carousel views={images}/>
        )
        
    }
    
    map = () => {
        if(this.state.lat !== ''){
            return (
                <MapWithAMarker lat={this.state.lat } lng={this.state.lng}/>
            )
        }
    }

    render() {
        const { date, time, groom, birde, invite, 
            groomFather, groomMother, birdeFather, birdeMother, 
            mainPicture, subPicture,
            lat, lng, 
            post, weddingHall } = this.state;

        const { modalIsOpen } = this.state;
        const images = [{ src: `http://172.30.1.33:8000/${mainPicture}`} ,{src: `http://172.30.1.33:8000/friend_img1572867145195.jpg` }];
            
        return (
            <>
            <Container align='center'>

                {/* <Card align='center' style={{ width: '15rem' }}> */}
                    <Card.Img variant="top"  src={`http://172.30.1.33:8000/${this.state.mainPicture}`} />
                {/* </Card> */}
            
                <h5>{`${groom} & ${birde}`}</h5>

                {/* <h3>{date}</h3>
                <h4>{time}</h4>
                <h4>{weddingHall}</h4> */}

                <Card border="warning" style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title><strong>{date}</strong></Card.Title>
                    <Card.Text>
                    {time}<br/>{weddingHall}
                    </Card.Text>
                    </Card.Body>
                </Card>
                <br />

            </Container>

            <Container>
                <Card.Header align="center">초대의글</Card.Header><br/>
                <Col>
                <strong>
                    {this.invite(invite)}
                </strong>
                </Col>
                <br /><br />
            </Container>

            <Container align="center">
                <Card.Header>혼주분들</Card.Header><br/>
                <Row>
                <Col>
                    신랑측 혼주
                    <br/><br/>
                    <strong>{`아버지 ${groomFather}`}</strong>
                    <br/><br/>
                    <strong>{`어머니 ${groomMother}`}</strong>
                    <br/>
                </Col>
                <Col>
                    신부측 혼주
                    <br/><br/>
                    <strong>{`아버지 ${birdeFather}`}</strong>
                    <br/><br/>
                    <strong>{`어머니 ${birdeMother}`}</strong>
                    <br/>
                </Col>
                </Row>
                <br/><br/>
            </Container>

            <Container>
                <Card.Header align="center">사진첩</Card.Header><br/>
                
                {this.album(subPicture)}
                
                
                <br /><br />
            </Container>

            <Container>
                <Card.Header align="center">오시는길</Card.Header><br/>
                
                {console.log('위도경도', lat, lng)}
                {/* <MapWithAMarker lat={37.613251 } lng={127.030084}/> */}
                {this.map()}
                <br/>
                <h2>{post}</h2>

                <br /><br />
            </Container>
            </>
        );
    }
};

export default WeddingInvitation;