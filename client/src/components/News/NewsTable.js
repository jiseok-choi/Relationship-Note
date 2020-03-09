import React, { Component } from 'react';
// import NewNews from './NewNews';
import ReviseNews from './ReviseNews';
import LookNews from './LookNews';
import {Col, Row} from 'react-bootstrap';
import axios from 'axios';

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

    getNews = () => {
        axios.defaults.withCredentials = true;
        axios
        .post(`http://localhost:8000/news/getNewsList`, {
            data: {
                friendid: this.props.match.params.friendid,
            },
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                newsList: res.data,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    setTable = (newsList) => {
        return newsList.map((contact, i) => {
            return (
              <tr>
                <td class="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="ml-1">
                      <p class="text-gray-900 whitespace-no-wrap">{i + 1}</p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{contact.date}</p>
                </td>
                <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {contact.title}
                  </p>
                </td>
                <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  <LookNews newsInfo={contact} />
                  <ReviseNews newsInfo={contact} />
                </td>
              </tr>
            );
        })
    }

    componentDidMount() {
        this.getNews();
    }

    render() {
        return(
            <>
            {/* <table className="table table-bordered table-hover">
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
                    {this.setTable(this.state.newsList)}
                </tbody>
            </table> */}


<div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr class="">
                    <th class="px-8 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      날짜
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        제목
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      기타
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {this.setTable(this.state.newsList)}
                </tbody>
              </table>
              {/* <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <Pagination items={exampleItems} onChangePage={onChangePage} />
          </div> */}
            </div>
          </div>
        </div>




            <nav className="pagination-sm">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="../main">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="">4</a>
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