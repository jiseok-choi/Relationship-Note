import React, { Component } from 'react';
// import NewNews from './NewNews';
import ReviseNews from './ReviseNews';
import LookNews from './LookNews';
import {Col, Row} from 'react-bootstrap';

class NewsTable extends Component {


    state = {
        newsList: [],
        id : '',
        date : '',
        name : '',
    }

    friendclick = (name) => {
        alert(name);
    }


    setTable = (newsList) => {
        return newsList.map((contact, i) => {
            return(
                <tr key={i} className="table-success" 
                // onClick={ () =>this.props.selectFriend(contact) }
                >
                    <td>
                        {i+1}
                    </td>
                    <td>
                        {contact.date}
                    </td>
                    <td>
                        {contact.title}
                    </td>
                    <td>
                        <Col>
                        <Row>
                            <LookNews newsInfo={contact}/> 
                            <ReviseNews newsInfo={contact}/>
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
                            #
                        </th>
                        <th>
                            날짜
                        </th>
                        <th>
                            제목
                        </th>
                        <th>
                            기타
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.newsList)}
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

export default NewsTable;