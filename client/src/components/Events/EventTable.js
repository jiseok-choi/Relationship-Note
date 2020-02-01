import React, { Component } from 'react';
// import ReviseNews from './ReviseNews';
import LookEvent from './LookEvent';
import {Col, Row} from 'react-bootstrap';
import Visit from './Visit';
import UpdateWedding from '../../components/Events/UpdateWedding';
import UpdateParty from '../../components/Events/UpdateParty';
import DeleteEvent from './DeleteEvent';

class EventTable extends Component {


    state = {
        eventList: [],
    }


    setTable = (eventList) => {
        return eventList.map((contact, i) => {
            let url='';
            let update;
            if(contact.kinds === 'wedding') {
                url = `http://192.168.0.35:3000/weddinginvitation/${contact.id}`
                update = <UpdateWedding eventInfo={contact} getEvents={this.props.getEvents}/> 
            }
            if(contact.kinds === 'party') {
                url = `http://192.168.0.35:3000/partyinvitation/${contact.id}`
                update = <UpdateParty eventInfo={contact} getEvents={this.props.getEvents}/> 
            }
            return(
                <tr key={i} className="table-success">
                    <td>
                        {i+1}
                    </td>
                    <td>
                        {contact.title}
                    </td>
                    <td>
                        {contact.date}
                    </td>
                    <td>
                        {url}
                    </td>
                    <td>
                        <Col>
                        <Row>
                            {/* 이벤트보기 */}
                            {update}
                            {/* 방명록 */}
                            <Visit eventInfo={contact}/>
                            {/* 삭제하기 */}
                            <DeleteEvent eventInfo={contact} getEvents={this.props.getEvents}>삭제</DeleteEvent>
                        </Row>
                        </Col>
                    </td>
                </tr>
            );
        })
    }

    render() {
        return(
            <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            제목
                        </th>
                        <th>
                            날짜
                        </th>
                        <th>
                            초청장
                        </th>
                        <th>
                            기타
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.eventList)}
                </tbody>
            </table>



                    

            {/* <nav className="pagination-sm">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#">Previous</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="../main">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">4</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">5</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav> */}
            </>
        );
    }
}

export default EventTable;