import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';

class EventTable extends Component {


    state = {
        eventList: [],
        id : '',
        date : '',
        name : '',
    }

    friendclick = (name) => {
        alert(name);
    }


    setTable = (eventList) => {
        return eventList.map((contact, i) => {
            let 완료여부 = '미완료';
            if(contact.check === true){
            완료여부 = '완료'}
            return(
                <tr key={i} className="table-success" 
                
                onClick={ () => {this.props.selectEvent(contact);console.log('이것이 내부여',contact)} }
                >
                    <td>
                        {contact.date}
                    </td>
                    <td>
                        {contact.title}
                    </td>
                    <td>
                        {완료여부}
                    </td>
                </tr>
            );
        })
    }

    render() {
        return(
            <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            날짜
                        </th>
                        <th>
                            행사
                        </th>
                        <th>
                            정산여부
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
            </div>
        );
    }
}

export default EventTable;