import React, { Component } from 'react';
// import NewFriend from './NewFriend';
// import ReviseFriend from './ReviseFriend';
// import FriendSchedule from './FriendSchedule';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

class EventInfo extends Component {

    state = {
        eventInfo : {},
        flag : true,
    }


    
    componentDidMount(){
    }
    // shouldComponentUpdate(newProps, newState){
    //     if(this.props.data === newProps.data){
    //         return false;
    //     }
    //     return true;
    // }

    info = () => {
        return(
            <div className="card-body">
                <p className="card-text">
                    행사명 : {this.props.eventInfo.name}
                </p>
                <p className="card-text">
                    행사종류 : {this.props.eventInfo.kinds}
                </p>
                <p className="card-text">
                    일시 : {moment(this.props.eventInfo.date).format('YYYY[-]MM[-]DD')}
                </p>
                <p className="card-text">
                    총 축의금 : {this.props.eventInfo.totalmoney} 원
                </p>
            </div>
        )
    }

    render() {
        // const eventInfo  = this.props.eventInfo;
        return(
            <>
            <div className="card">
                {/* <h5 className="card-header">
                    지인 정보
                </h5> */}
                {this.info()}
                {/* <div className="card-footer">
                    <Col><Row>
                    <ReviseFriend friendInfo={eventInfo}/>
                    <FriendSchedule friendInfo={eventInfo}/>
                    </Row></Col>
                </div> */}
            </div>
            {/* <div className="btn-group" role="group">
                
                
                <NewFriend/>
            </div> */}
            </>
        );
    }
}

export default EventInfo;