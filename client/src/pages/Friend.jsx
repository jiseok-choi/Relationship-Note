// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {  } from 'react-bootstrap';
import FriendTable from '../components/Friend/FriendTable';
import FriendProfile from '../components/Friend/FriendProfile';
import NewFriend from '../components/Friend/NewFriend';
import ReviseFriend from '../components/Friend/ReviseFriend';
import axios from 'axios';


class Friend extends Component {

    state = {
        friendList : [],
        selectFriend : '',
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    getFriend = () => {
        axios.defaults.withCredentials = true;

        axios
        .post(`http://localhost:8000/friend/getfriendList`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                friendList: res.data,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    selectFriend = (friendinfo) => {
        this.setState({
            selectFriend : friendinfo,
        });
        // alert(id);
    }

    componentDidMount(){
        this.getFriend();
    }

    componentDidUpdate(){
        
    }

    render() {
        return (
            <>
            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h3>
                            지인의 기록을 남겨보세요
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <FriendTable friendList={this.state.friendList} selectFriend={this.selectFriend}></FriendTable>
                    </div>
                    <div class="col-md-7">
                        <FriendProfile friendInfo={this.state.selectFriend}/>
                    </div>
                </div>
                {/* <div class="row">
                    <NewFriend/>
                </div> */}
            </div>

            </>
        );
    }
};

export default Friend;