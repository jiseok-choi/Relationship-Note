import React, { Component } from 'react';
// import NewNews from './NewNews';
import ReviseMoney from './ReviseMoney';
// import LookNews from './LookNews';
import axios from 'axios';
import {Col, Row, Form, FormCheck, Feedback} from 'react-bootstrap';

class MoneyTable extends Component {


    state = {
        newsList: [],
        id : '',
        date : '',
        name : '',
    }

    checkclick = (id) => {
        axios
        .patch(`http://localhost:8000/money/check/${id}`, {
        })
        .then(res => {
            const newvisit = res.data !== undefined;
            if(newvisit){
                this.setState({lgShow: false});
                // alert('반환받음');
                console.log(res.data);
                this.props.getEvents();
                this.props.getVisits();
                // window.location.reload(); //새로고침
            } else {
                // alert('반환 못받음');
                console.error(res.data);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }


    setTable = (visitList) => {
        return visitList.map((contact, i) => {
            let check = false;
            if(contact.check){
                check = true;
            }
            return(
                <tr key={i} className="table-success" 
                // onClick={ () =>alert(contact) }
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
                        {
                            <ReviseMoney visitInfo={contact} getEvent={this.props.getEvent} getEvents={this.props.getEvents} getVisits={this.props.getVisits}/>
                            
                        }
                        <Form>
                            <Form.Check 
                                onClick={() => {
                                    this.checkclick(contact.id);
                                }}
                                type="switch"
                                id={contact.id}
                                checked={check}
                                label="확인"
                            />
                        </Form>
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