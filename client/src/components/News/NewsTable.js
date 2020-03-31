import React, { Component } from "react"
// import NewNews from './NewNews';
import ReviseNews from "./ReviseNews"
import LookNews from "./LookNews"
import { Col, Row } from "react-bootstrap"
import Pagination from "../Pagination/Pagination"
import NewNews from "../../components/News/NewNews"
import ReviseFriend from "../../components/Friend/ReviseFriend"
import axios from "axios"

class NewsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList: [],
      id: "",
      date: "",
      name: "",
      pageOfitems: [],
      selectFriend: {}
    }
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(pageOfitems) {
    this.setState({
      pageOfitems: pageOfitems
    })
  }

  friendclick = name => {
    alert(name)
  }

  getNews = () => {
    axios.defaults.withCredentials = true
    axios
      .post(`http://54.180.149.57:8000/news/getNewsList`, {
        data: {
          friendid: this.props.match.params.friendid
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          newsList: res.data.newsList,
          selectFriend: res.data.friend
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  setTable = newsList => {
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
            <p class="text-gray-900 whitespace-no-wrap">{contact.title}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <LookNews newsInfo={contact} />
            <ReviseNews newsInfo={contact} />
          </td>
        </tr>
      )
    })
  }

  componentDidMount() {
    this.getNews()
  }

  render() {
    return (
      <>
        <div class="flex justify-between m-10 grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <p class="text-3xl">{this.state.selectFriend.name} 의 소식 목록</p>
          </div>
          <div class="flex justify-end  col-span-1">
            <ReviseFriend friendInfo={this.state.selectFriend} />
            <NewNews friendInfo={this.state.selectFriend} addNews={this.getNews} />
          </div>
        </div>

        <div class="-max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div class="-mt-8 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                <tbody>{this.setTable(this.state.pageOfitems)}</tbody>
              </table>
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <Pagination items={this.state.newsList} onChangePage={this.onChangePage} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewsTable
