import React, { Component } from 'react';
import Pagenation from '../Pagenation/Pagenation';
import NewsTable from '../../components/News/NewsTable';

class FriendTable extends Component {


    state = {
        id : '',
        name : '',
        relationship : '',

        start: 0,
        end: 10,
        current:1,
    }

    friendclick = (name) => {
        alert(name);
    }

    updateCurrPage = page => (
        this.setState({
            current: page,
        })
    )

    updateStartEndPage = (start, end) => (
        this.setState({
            start: start,
            end: end,
        })
    )

    setTable = (friendList) => {
        return friendList.map((contact, i) => {
            let gender;
            if(contact.gender === 'M'){
                gender = '남자'
              }else{
                gender = '여자'
              }
            return (
              <div class="bg-white shadow overflow-hidden sm:rounded-md mx-10">
                <ul>
                  <li>
                    <a
                      href={`../friends/${contact.id}`}
                      onClick={() => (
                        <NewsTable newsList={this.state.newsList} />
                      )}
                      class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div class="flex items-center px-4 py-4 sm:px-6">
                        <div class="min-w-0 flex-1 flex items-center">
                          <div class="flex-shrink-0">
                            <img
                              class="h-12 w-12 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
                              {contact.name}
                                <span class="truncate ml-3 rounded-lg bg-blue-700 text-white p-1">
                                {gender}
                                </span>
                                <span class="truncate ml-3 rounded-lg bg-orange-700 text-white p-1">
                                  {contact.relationship}
                                </span>
                              </div>
                              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                <img src="images/phone.png" class="h-5 mr-2" />
                                <span class="truncate">{contact.phone_num}</span>
                              </div>
                            </div>
                            <div class="hidden md:block">
                              <div>
                                <div class="flex text-sm leading-5 text-gray-900">
                                  <img
                                    src="images/party1.png"
                                    class="h-5 mr-2"
                                  />
                                  <time datetime="2020-01-07">{contact.birth}</time>
                                </div>
                                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                    {`${contact.job} 에서 재직중 ${contact.school} 졸업`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <svg
                            class="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            );
        })
        
    }

    render() {
        return (
          <>
            {this.setTable(this.props.friendList)}
          </>
        );
    }
}

export default FriendTable;