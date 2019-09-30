import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Signup from './Signup';
import axios from 'axios';


class Loginform extends Component {

    state = {
        userid: '',
        password: '',
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendLogin = (e) => {
        e.preventDefault();

        // const frm = new FormData();
        // frm.append('userid', this.state.id);
        // frm.append('password', this.state.pw);
        axios.defaults.withCredentials = true;

        axios
            .post(`http://localhost:8000/auth/login`, {
                userid: this.state.userid,
                password: this.state.password,
            })
            .then(res => {
                console.log(res.data);

                const mainUser = res.data.userid !== undefined;
                if(mainUser){
                    alert('로그인 성공'+res.data.userid);
                    // return this.loged();
                    window.location.reload(); //새로고침
                } else {
                    alert(res.data);
                    console.error(res.data); 
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return(
            <>
            
            <Form>
                <Form.Row>
                    <Col md={{ offset: 1}}>
                    <Signup></Signup>
                    </Col>
                    <Col md={{ span: 2, offset: 4 }}>
                        <Form.Control name="userid" placeholder="아이디" onChange={this.handleChange.bind(this)} />
                        <Form.Control name="password" placeholder="패스워드" onChange={this.handleChange.bind(this)} />
                        
                    </Col>
                    <Button onClick={this.sendLogin.bind(this)} variant="primary" type="submit">
                        로그인
                    </Button>
                </Form.Row>
            </Form>
            </>
        );
    }
}


export default Loginform;