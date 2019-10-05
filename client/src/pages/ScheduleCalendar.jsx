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
        }
        this.clickevent = this.clickevent.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.eventStyleGetter = this.eventStyleGetter.bind(this);
    }
    
    
    clickevent = (event,target) => {
        // event.preventDefault();

        let obj = target.currentTarget;
        const day = (new Date(2019, 1,1,8,0)).toString();
        alert(event.title+ event.contents+day);
        console.log(event);

        // obj.getElementsByTagName('strong')[0].click();

        // return(
        //     this.state.events.map((contact) => {
        //         return(
        //             {title: contact.title},
        //             {allDay: contact.allDay},
        //             {start: contact.start},
        //             {end: contact.end}
        //         )
        //     }
        // ))
    }

    onNavigate = (date, view, action) => {
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
        return;
        console.log(event);
        const backgroundColor = '#' + event.hexColor;
        const style = {
            backgroundColor: 'black',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        }
        
        return {
            style: style
        }
    }
      
    
    render() {
        return(
            <>
            <div style={{ height: window.innerHeight-50 }}>
            <Calendar
                localizer={localizer}
                events={this.state.events}
                step={60}
                views={['month','week']}
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