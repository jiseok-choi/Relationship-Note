// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Card, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { birth, birth2, friend, wedding4, schedule, party1 } from '../images';
import CreateWedding from '../components/Events/CreateWedding';
import CreateParty from '../components/Events/CreateParty';
import CreateScedule from '../components/Events/MySchedule';
import EventTable from '../components/Events/EventTable';
import axios from 'axios';


class Event extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventList : [],
        }
        this.getEvents = this.getEvents.bind(this);
    }

    getEvents = () => {
        axios.defaults.withCredentials = true;
        axios
        .get(`http://localhost:8000/event/getEvents`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                eventList: res.data,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount(){
        this.getEvents();
    }
    
    render() {
        
        return (
          <>
            <div>
              <div>
                {/* 결혼식생성 버튼 들어갈 자리 */}
                <div class="p-10 -mb-20 flex flex-wrap items-center justify-center">
                  <div class="flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg">
                    <div class="relative pt-10 px-10 flex items-center justify-center">
                      <img class="relative w-40" src={wedding4} alt="" />
                    </div>
                    <div class="relative text-white px-6 pb-6 mt-6">
                      {/* <span class="block opacity-75 -mb-1">행사</span> */}
                      <div class="flex justify-between">
                        <span class="block font-semibold text-xl">결혼식</span>
                        <CreateWedding getEvents={this.getEvents}/>
                      </div>
                    </div>
                  </div>
                  {/* 행사생성 버튼 들어갈 자리 */}
                  <div class="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
                    <div class="relative pt-10 px-10 flex items-center justify-center">
                      <img class="relative w-40" src={party1} alt="" />
                    </div>
                    <div class="relative text-white px-6 pb-6 mt-6">
                      {/* <span class="block opacity-75 -mb-1">Outdoor</span> */}
                      <div class="flex justify-between">
                        <span class="block font-semibold text-xl">행사</span>
                        <CreateParty getEvents={this.getEvents}/>
                      </div>
                    </div>
                  </div>
                  {/* 일정생성 버튼 들어갈 자리 */}
                  <div class="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
                    <div class="relative pt-10 px-10 flex items-center justify-center">
                      <img class="relative w-40" src={schedule} alt="" />
                    </div>
                    <div class="relative text-white px-6 pb-6 mt-6">
                      {/* <span class="block opacity-75 -mb-1">Outdoor</span> */}
                      <div class="flex justify-between">
                        <span class="block font-semibold text-xl">일정</span>
                        <CreateScedule />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {/* {행사테이블 들어갈 자리} */}
                  <EventTable
                    eventList={this.state.eventList}
                    getEvents={this.getEvents}
                  />
                </div>
              </div>
            </div>
          </>
        );
    }
};

export default Event;