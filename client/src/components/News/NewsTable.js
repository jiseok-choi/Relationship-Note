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
                <tr key={i} class="table-success" 
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
            <table class="table table-bordered table-hover">
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



                    

            <nav class="pagination-sm">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#">Previous</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="../main">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">4</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">5</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
            </>
        );
    }
}

export default NewsTable;