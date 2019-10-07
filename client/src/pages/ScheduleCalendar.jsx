import React, { Component } from 'react';
// import BigCalendar from 'react-big-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//     Calendar,
//     DateLocalizer,
//     momentLocalizer,
//     globalizeLocalizer,
//     move,
//     Views,
//     Navigate,
//     components,
//   } from 'react-big-calendar'
import moment from 'moment';
import axios from 'axios';
import LookEvent from '../components/Events/LookEvent';
import { Modal, Button } from 'react-bootstrap';


moment.locale("ko");
const localizer = momentLocalizer(moment);



// const localizer = BigCalendar.momentLocalizer(moment)

class ScheduleCalendar extends Component {

    constructor(props) {
        super(props);
        this.state={
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDay(),
            events: [
                {
                    title: "출근",
                    contents: "내용",
                    allDay: false,
                    start: new Date(2019,9,4,10,0),
                    end: new Date(2019, 9, 4, 10, 30),
                },
                {
                    title: "퇴근",
                    contents: "내용",
                    allDay: false,
                    start: new Date(2019, 9, 4, 17, 30),
                    end: new Date(2019, 9, 5, 17, 40),
                }
            ],
            scheduleList: [],
            birthList: [],
            propsShow: false,
            LookEventProp: '',
        }
        this.clickevent = this.clickevent.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.eventStyleGetter = this.eventStyleGetter.bind(this);
        // this.changeSchedule = this.changeSchedule.bind(this);
    }
    
    lookevent = (event) => {
        
    }
    
    clickevent = (event,target) => { //이벤트 클릭했을때
        // event.preventDefault();

        let obj = target.currentTarget;
        const day = (new Date(2019, 1,1,8,0)).toString();
        // alert(event.title+ event.contents+day);
        // console.log(event);

        this.setState({
            LookEventProp: event,
            propsShow: true,
        })
        // return this.lookevent(event);
    }

    onNavigate = (date, view, action) => {
        // if(date.getFullYear() !== this.state.year){
        //     this.setState({
        //         year : date.getFullYear()
        //     })
        // }
        if (action === 'NEXT') {
            this.setState({
                month : this.state.month + 1,
            })
        } else if (action === 'PREV') {
            this.setState({
                month : this.state.month - 1,
            })
        } else {
            this.setState({
                month : new Date().getMonth(),
            })
        }
      
        // this.setState({ date: today.month+1 });
      };

    
    eventStyleGetter = (event, start, end, isSelected) => {
        // return;
        // console.log(event);
        // const backgroundColor = '#' + event.hexColor;
        if(event.birth !== undefined){
            const style = {
                backgroundColor: 'red',
                borderRadius: '0px',
                opacity: 0.8,
                color: 'black',
                border: '0px',
                display: 'block'
            }
            return {
                style: style
            }
        } else {

        }
        
        
        
    }

    changeSchedule = (scheduleList) => {
        const temp = scheduleList.map((contact, i) => {
            let tempstart = contact.startdate.split('-');
            let tempend = contact.enddate.split('-');
            contact.start = new Date(tempstart[0], tempstart[1]-1, tempstart[2]);
            contact.end = new Date(tempend[0], tempend[1]-1, tempend[2]);
            // alert(contact.enddate);
        })
        return temp;
    }
    changeBirth = (birthList) => {
        return birthList.map((contact, i) => {
            let tempbirth = contact.birth.split('-');
            // contact.birth = new Date(this.state.year, tempbirth[1]-1, tempbirth[2]);
            contact.title = contact.name+'의 생일';
            contact.contents = contact.birth;
            contact.start = new Date(this.state.year, tempbirth[1]-1, tempbirth[2]);
            contact.end = new Date(this.state.year, tempbirth[1]-1, tempbirth[2]);
        })
    }

    getSchedule = () => {
        axios.defaults.withCredentials = true;

        axios
        .post(`http://localhost:8000/schedule/getScheduleList`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data);
            this.changeSchedule(res.data.scheduleList);
            this.changeBirth(res.data.birthList);

            const eevent = res.data.scheduleList.concat(res.data.birthList);


            this.setState({
                events: eevent,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    componentDidMount(){
        this.getSchedule();
    }
      
    
    render() {
        return(
            <>
            <LookEvent propsShow={this.state.propsShow} events={this.LookEventProp}/>
            <div style={{ height: window.innerHeight-50 }}>
            <Calendar
                localizer={localizer}
                events={this.state.events}
                step={60}
                views={['month']}
                date={new Date(this.state.year, this.state.month, this.state.day)}
                onSelectEvent={this.clickevent}
                onNavigate={this.onNavigate}
                eventPropGetter={this.eventStyleGetter}
            ></Calendar>
            {/* <DateLocalizer></DateLocalizer>,
            <Views></Views>,
            <Navigate></Navigate>, */}
            </div>
            </>
        );
    }
}

export default ScheduleCalendar;