import React, { Component } from "react"
// import BigCalendar from 'react-big-calendar';
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import axios from "axios"
import { Modal, Button } from "react-bootstrap"

moment.locale("ko")
const localizer = momentLocalizer(moment)

class ScheduleCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
      events: [
        {
          title: "출근",
          contents: "내용",
          allDay: false,
          start: new Date(2020, 2, 18, 10, 0),
          end: new Date(2020, 2, 19, 10, 30)
        },
        {
          title: "퇴근",
          contents: "내용",
          allDay: false,
          start: new Date(2020, 2, 20, 17, 30),
          end: new Date(2020, 2, 21, 17, 40)
        }
      ],
      scheduleList: [],
      birthList: [],
      eventList: [],
      modalShow: false,
      eventTitle: "",
      eventContents: "",
      eventDate: ""
    }
    this.clickevent = this.clickevent.bind(this)
    this.onNavigate = this.onNavigate.bind(this)
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
  }

  clickevent = (event, target) => {
    //이벤트 클릭했을때
    // event.preventDefault();

    let obj = target.currentTarget
    const day = new Date(2020, 1, 1, 8, 0).toString()
    let EventDate
    if (moment(event.start).format("YYYY-MM-DD") === moment(event.end).format("YYYY-MM-DD")) {
      EventDate = moment(event.start).format("YYYY-MM-DD")
    } else {
      EventDate =
        moment(event.start).format("YYYY-MM-DD") + " ~ " + moment(event.end).format("YYYY-MM-DD")
    }
    if (event.birth !== undefined) {
      this.setState({
        eventContents: event.contents + " 출생"
      })
    } else {
      this.setState({
        eventContents: event.contents
      })
    }

    this.setState({
      eventTitle: event.title,
      eventDate: EventDate,
      modalShow: !this.state.modalShow
    })
  }

  onNavigate = (date, view, action) => {
    if (action === "NEXT") {
      if (this.state.month !== 11) {
        this.setState({
          month: this.state.month + 1
        })
      } else {
        this.setState({
          year: this.state.year + 1,
          month: 1
        })
      }
    } else if (action === "PREV") {
      if (this.state.month !== 0) {
        this.setState({
          month: this.state.month - 1
        })
      } else {
        this.setState({
          year: this.state.year - 1,
          month: 11
        })
      }
    } else {
      this.setState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      })
    }
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    // return;
    // console.log(event);
    // const backgroundColor = '#' + event.hexColor;
    console.log(event)
    if (event.type === "birth") {
      const style = {
        backgroundColor: "red",
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block"
      }
      return {
        style: style
      }
    } else if (event.type === "event") {
      const style = {
        backgroundColor: "yellow",
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block"
      }
      return {
        style: style
      }
    } else if (event.type === "schedule") {
      const style = {
        backgroundColor: "green",
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block"
      }
      return {
        style: style
      }
    }
  }

  changeSchedule = scheduleList => {
    let temp = scheduleList.map((contact, i) => {
      contact.start = new Date(contact.startdate)
      contact.end = new Date(contact.enddate)
      contact.type = "schedule"
    })
    return temp
  }
  changeBirth = birthList => {
    return birthList.map((contact, i) => {
      let tempbirth = contact.birth.split("-")
      // contact.birth = new Date(this.state.year, tempbirth[1]-1, tempbirth[2]);
      contact.title = contact.name + "의 생일"
      contact.contents = contact.birth
      contact.start = new Date(this.state.year, tempbirth[1] - 1, tempbirth[2])
      contact.end = new Date(this.state.year, tempbirth[1] - 1, tempbirth[2])
      contact.type = "birth"
    })
  }
  changeEvent = eventList => {
    return eventList.map((contact, i) => {
      contact.title = contact.title
      contact.contents = contact.kinds
      contact.start = new Date(contact.date)
      contact.end = new Date(contact.date)
      contact.type = "event"
    })
  }

  getSchedule = () => {
    axios.defaults.withCredentials = true

    axios
      .post(`http://localhost:8000/schedule/getScheduleList`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(async res => {
        console.log(res.data)
        await this.changeSchedule(res.data.scheduleList)
        await this.changeBirth(res.data.birthList)
        await this.changeEvent(res.data.eventList)

        const eevent = await res.data.scheduleList
          .concat(res.data.birthList)
          .concat(res.data.eventList)

        this.setState({
          events: eevent
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.getSchedule()
  }

  close = () => {
    this.setState({
      modalShow: false
    })
  }

  render() {
    return (
      <>
        <div style={{ height: window.innerHeight - 50 }}>
          <Calendar
            localizer={localizer}
            events={this.state.events}
            step={60}
            views={["month"]}
            date={new Date(this.state.year, this.state.month, this.state.day)}
            onSelectEvent={this.clickevent}
            onNavigate={this.onNavigate}
            eventPropGetter={this.eventStyleGetter}
          ></Calendar>
        </div>

        <Modal
          // {...props}
          size="lg"
          show={this.state.modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // onClick={this.close}
          toggle={this.clickevent}
        >
          {/* closeButton */}
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">{this.state.eventTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>날짜 : {this.state.eventDate}</h5>
            <p>{this.state.eventContents}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ScheduleCalendar
