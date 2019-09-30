import React, { Component } from 'react';
import Loginform from './Loginform';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { money, visit, meeting, birth, friend } from '../images';


class joinindex extends Component {

    render() {
        return(
            <>
                <Loginform/>
                <Container>
                    <Row>
                        <Col>
                            <Image src={money} roundedCircle />
                        </Col>
                        <Col>
                            <h1><br/><br/>경조사비 관리</h1>
                            <h5>당신이 놓치지 말아야 할 경조사비를<br/>좀 더 체계적으로 관리 할 수 있습니다.</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1><br/><br/>방명록 기능</h1>
                            <h5>누가 참석했는지 놓칠 수 있는 방명록을<br/>QR코드를 통해 웹사이트에서 관리하세요!</h5>
                        </Col>
                        <Col>
                            <Image src={visit} rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image src={meeting} roundedCircle  />
                        </Col>
                        <Col>
                            <h1><br/><br/>일정 잡기 기능</h1>
                            <h5>많은 사람들이 모임을 가질 때 신경을 줄여드립니다<br/>주최자 입장에서 쉽게 일정을 잡아드립니다</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1><br/><br/>생일 캘린더 기능</h1>
                            <h5>당신의 지인들의 생일, 기념일 등을 놓치지 마세요!</h5>
                        </Col>
                        <Col>
                            <Image src={birth} rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image src={friend} rounded />
                        </Col>
                        <Col>
                            <h1><br/><br/>친구소식 기억하기</h1>
                            <h5>지인의 소식을 듣고 까먹는 일이 많았나요?<br/>
                            지인의 특별한 순간을 기억해 놓고<br/>
                            섭섭한 순간을 극복해 보아요!</h5>
                        </Col>
                    </Row>

                </Container>
            </>
        );
    }
}

export default joinindex;