// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from "react"
import { Dropdown, DropdownButton, Modal, Row, Col } from "react-bootstrap"
import EventTable from "../components/Money/EventTable"
import EventInfo from "../components/Money/EventInfo"
import MoneyTable from "../components/Money/MoneyTable"
import axios from "axios"

class Money extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventList: [],
      visitList: [],
      eventInfo: {},
      selectEvent: ""
    }
    this.getEvents = this.getEvents.bind(this)
    this.getVisits = this.getVisits.bind(this)
    this.getEvent = this.getEvent.bind(this)
    this.selectEvent = this.selectEvent.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  getEvents = () => {
    axios.defaults.withCredentials = true
    axios
      .get(`http://54.180.149.57:8000/money/events`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(async res => {
        console.log("money/events", res.data)
        // let temp = await Promise.all( res.data.sort( async (a, b) => {
        //     console.log('하하하하')
        //     return await a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
        // })
        // )
        await this.setState({
          eventList: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  getVisits = () => {
    axios.defaults.withCredentials = true
    axios
      .get(`http://54.180.149.57:8000/money/visits/${this.state.selectEvent.id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          visitList: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  getEvent = () => {
    axios.defaults.withCredentials = true
    axios
      .get(`http://54.180.149.57:8000/money/eventInfo/${this.state.selectEvent.id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          eventInfo: res.data,
          flag: false
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  selectEvent = async eventinfo => {
    try {
      await this.setState({
        selectEvent: eventinfo
      })
      await this.getVisits()
      await this.getEvent()
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    this.getEvents()
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4" align="center">
              <Col>
                {/* {행사 목록 들어갈 자리} */}
                <EventTable eventList={this.state.eventList} selectEvent={this.selectEvent} />
                <br />
                <br />
                <EventInfo eventInfo={this.state.eventInfo} />
              </Col>
            </div>
            <div className="col-md-8" align="center">
              {/* {방명록 들어갈 자리} */}
              <MoneyTable
                getVisits={this.getVisits}
                getEvent={this.getEvent}
                getEvents={this.getEvents}
                visitList={this.state.visitList}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" align="center">
              {/* {행사테이블 들어갈 자리} */}
              {/* < EventTable eventList={this.state.eventList} getEvents={this.getEvents} /> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Money
