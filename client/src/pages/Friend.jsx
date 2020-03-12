// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from "react"
import FriendTable from "../components/Friend/FriendTable"
import FriendProfile from "../components/Friend/FriendProfile"
import NewFriend from "../components/Friend/NewFriend"
import ReviseFriend from "../components/Friend/ReviseFriend"
import NewsTable from "../components/News/NewsTable"
import axios from "axios"
import * as moment from "moment"

class Friend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendList: [],
      friendCurrentPage: 0,
      friendPostPerPage: 0,
      newsList: [],
      selectFriend: "",
      today: moment(new Date()).format("YYYY-MM-DD")
    }

    this.getFriend = this.getFriend.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  getFriend = () => {
    axios.defaults.withCredentials = true

    axios
      .post(`http://localhost:8000/friend/friendList/1/10`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          friendList: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  getNews = () => {
    axios.defaults.withCredentials = true
    // alert(this.state.selectFriend.id);
    axios
      .post(`http://localhost:8000/news/getNewsList`, {
        data: {
          friendid: this.state.selectFriend.id
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          newsList: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  selectFriend = async friendinfo => {
    try {
      await this.setState({
        selectFriend: friendinfo
      })
      await this.getNews()
    } catch (e) {
      console.error(e)
    }
  }

  addNews = () => {
    this.getNews()
  }

  componentDidMount() {
    this.getFriend()
  }

  componentDidUpdate() {}

  render() {
    // const today = new Date(),
    // date = today.getFullYear() +'-'+ (today.getMonth() + 1)  +'-'+ today.getDate();
    const date = this.state.today

    return (
      <>
        <div>
          <div class="flex justify-between m-10">
            <div>
              <p class=" text-3xl ">지인 목록</p>
            </div>
            <div class=" ">
              <NewFriend getFriend={this.getFriend} />
            </div>
          </div>

          <FriendTable friendList={this.state.friendList} selectFriend={this.selectFriend} />

          {/* <div className="text-right">
                <NewNews
                  friendInfo={this.state.selectFriend}
                  addNews={this.addNews}
                  today={date}
                />
              </div> */}
          <div className="row">{/* <NewsTable newsList={this.state.newsList} /> */}</div>
        </div>
      </>
    )
  }
}

export default Friend
