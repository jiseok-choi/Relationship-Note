// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import axios from 'axios';


class Home extends Component {

    sendLogout = (e) => {
        e.preventDefault();

        // const frm = new FormData();
        // frm.append('userid', this.state.id);
        // frm.append('password', this.state.pw);
        axios.defaults.withCredentials = true;

        axios
            // .post(`process.env.HTTP` || `http://localhost:8000/auth/login`, {
            .get(`http://localhost:8000/auth/logout`, {
            // .post(`http://172.30.1.9:8000/auth/login`, {
                
            })
            .then(res => {
                console.log(res);

                if(res.data === 'logout'){
                    // alert('로그아웃 성공');
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
        return (
            <div>
                {/* <AdminNavbar/> */}
                <h2>
                <h1>Home 화면</h1>
                <Button onClick={this.sendLogout}>로그아웃</Button>
                <p>{this.props.match.url}</p>
                </h2>
            </div>
        );
    }
};

export default Home;