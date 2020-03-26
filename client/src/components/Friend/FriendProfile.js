import React, { Component } from "react"
import NewFriend from "./NewFriend"
import ReviseFriend from "./ReviseFriend"
import FriendSchedule from "./FriendSchedule"
import axios from "axios"
import { Col, Row } from "react-bootstrap"

class FriendProfile extends Component {
  state = {
    friendInfo: "",
    flag: true
  }

  getFriend = friendID => {
    if (friendID !== "" && this.state.flag) {
      alert(friendID)
      axios.defaults.withCredentials = true
      axios
        .post(`http://localhost:8000/friend/getfriend`, {
          friendID: friendID,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(res => {
          console.log(res.data)
          this.setState({
            friendInfo: res.data,
            flag: false
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  // shouldComponentUpdate(newProps, newState){
  //     if(this.props.data === newProps.data){
  //         return false;
  //     }
  //     return true;
  // }

  info = friendInfo => {
    return (
      <div className="card-body">
        <p className="card-text">이름 : {friendInfo.name}</p>
        <p className="card-text">나이 : {friendInfo.age}</p>
        <p className="card-text">성별 : {friendInfo.gender}</p>
        <p className="card-text">생년월일 : {friendInfo.birth}</p>
        <p className="card-text">관계 : {friendInfo.relationship}</p>
        <p className="card-text">직업 : {friendInfo.job}</p>
        <p className="card-text">학교 : {friendInfo.school}</p>
        <p className="card-text">연락처 : {friendInfo.phone_num}</p>
      </div>
    )
  }

  render() {
    const friendInfo = this.props.friendInfo
    return (
      <>
        <div className="card">
          <h5 className="card-header">지인 정보</h5>
          {this.info(friendInfo)}
          <div className="card-footer">
            <Col>
              <Row>
                <ReviseFriend friendInfo={friendInfo} />
                <FriendSchedule friendInfo={friendInfo} />
              </Row>
            </Col>
          </div>
        </div>
        {/* <div className="btn-group" role="group">
                
                
                <NewFriend/>
            </div> */}
      </>
    )
  }
}

export default FriendProfile
