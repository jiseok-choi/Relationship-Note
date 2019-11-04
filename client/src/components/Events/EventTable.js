import React, { Component } from 'react';
// import ReviseNews from './ReviseNews';
import LookEvent from './LookEvent';
import {Col, Row} from 'react-bootstrap';
import Visit from './Visit';

class EventTable extends Component {


    state = {
        eventList: [],
    }


    setTable = (eventList) => {
        return eventList.map((contact, i) => {
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
                        <Col>
                        <Row>
                            <LookEvent newsInfo={contact}/> 
                            {/* <ReviseNews newsInfo={contact}/> */}
                            <Visit/>
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
                            기타
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.eventList)}
                </tbody>
            </table>



                    

            <nav className="pagination-sm">
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
            </nav>
            </>
        );
    }
}

export default EventTable;