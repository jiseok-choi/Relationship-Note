import React, { Component } from 'react';
// import NewNews from './NewNews';
// import ReviseNews from './ReviseNews';
// import LookNews from './LookNews';
import {Col, Row} from 'react-bootstrap';

class MoneyTable extends Component {


    state = {
        newsList: [],
        id : '',
        date : '',
        name : '',
    }

    friendclick = (name) => {
        alert(name);
    }


    setTable = (visitList) => {
        return visitList.map((contact, i) => {
            return(
                <tr key={i} className="table-success" 
                // onClick={ () =>this.props.selectFriend(contact) }
                >
                    <td>
                        {contact.name}
                    </td>
                    <td>
                        {contact.contents}
                    </td>
                    <td>
                        {contact.celebration}
                    </td>
                    <td>
                        {contact.check}
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
                            이름
                        </th>
                        <th>
                            코멘트
                        </th>
                        <th>
                            축의금
                        </th>
                        <th>
                            체크
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.visitList)}
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

export default MoneyTable;