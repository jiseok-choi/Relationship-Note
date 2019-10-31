// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Card, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { money, visit, meeting, birth, friend } from '../images';
import CreateWedding from '../components/Events/CreateWedding';
import EventTable from '../components/Events/EventTable';
import axios from 'axios';


class Event extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventList : [],
        }
        this.getEvents = this.getEvents.bind(this);
    }

    getEvents = () => {
        axios.defaults.withCredentials = true;
        axios
        .post(`http://localhost:8000/event/getEvents`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                eventList: res.data,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount(){
        this.getEvents();
    }
    
    render() {
        
        return (
            <>
            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6" align="center">
                        {/* {행사생성 버튼 들어갈 자리} */}
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top"  src={birth} />
                            <Card.Body>
                                <Card.Title><h3>행사를 생성해 보세요</h3></Card.Title>
                                <Card.Text>
                                결혼식, 잔치, 생일파티 등 행사를 만들어 보세요
                                </Card.Text>

                                {/* <DropdownButton id="dropdown-basic-button" title="행사 만들기">
                                    <Dropdown.Item onClick={this.createWedding}><CreateWedding show={this.state.show} close={this.close}/>결혼식</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton> */}

                            <CreateWedding/>


                            </Card.Body>
                        </Card>
                    </div>
                    <div class="col-md-6" align="center">
                        {/* {일정생성 버튼 들어갈 자리} */}
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top"  src={meeting} />
                            <Card.Body>
                                <Card.Title><h3>일정을 생성해 보세요</h3></Card.Title>
                                <Card.Text>
                                약속, 만남, 소모임 등의 일정을 만들 수 있습니다.
                                </Card.Text>

                                <DropdownButton id="dropdown-basic-button" title="일정 만들기">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>

                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" align="center">
                        {/* {행사테이블 들어갈 자리} */}
                        < EventTable eventList={this.state.eventList} />
                    </div>
                </div>
            </div>


            </>
        );
    }
};

export default Event;