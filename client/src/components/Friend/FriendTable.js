import React, { Component } from "react"
import NewsTable from "../../components/News/NewsTable"
import Pagination from "../Pagination/Pagination"

var temppageOfitems = []

class FriendTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      relationship: "",
      pageOfitems: [],
      friendList: [],
      temppageOfitems: [],
      start: 0,
      end: 10,
      current: 1
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.onChangeItems = this.onChangeItems.bind(this)
  }

  exampleItemList = [...Array(60).keys()].map(i => ({
    age: "i + 1",
    birth: "Item " + (i + 1),
    createdAt: "Item " + (i + 1),
    deletedAt: "Item " + (i + 1),
    gender: "Item " + (i + 1),
    id: "Item " + (i + 1),
    job: "Item " + (i + 1),
    name: "Item " + (i + 1),
    phone_num: "Item " + (i + 1),
    relationship: "Item " + (i + 1),
    school: "Item " + (i + 1),
    updatedAt: "Item " + (i + 1),
    userId: "Item " + (i + 1),
    userId: "Item " + (i + 1)
  }))

  friendclick = name => {
    alert(name)
  }

  onChangePage(pageOfitems) {
    this.setState({
      pageOfitems: pageOfitems
    })
  }

  onChangeItems(pageOfitems) {
    this.setState({
      temppageOfitems: pageOfitems
    })
    temppageOfitems = pageOfitems
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.friendList !== prevProps.friendList) {
      // console.log("items 가 달라 componentdidupdate 탔음")
      // this.setPage(this.props.initialPage)
      // this.onChangePage(this.state.pageOfitems)
      // this.setTable()
      // alert("gkgkgk")
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      friendList: nextProps.friendList
    })
    if (this.props.friendList !== nextProps.friendList) {
      // this.onChangePage(nextProps.friendList)
      console.log("componentWillReceiveProps")
      this.onChangePage(nextProps.friendList)
    }
  }

  pagena = () => {
    return <Pagination items={this.props.friendList} onChangePage={this.onChangePage} />
  }

  setTable = () => {
    if (this.state.pageOfitems.length === 0) return
    return this.state.pageOfitems.map((contact, i) => {
      let gender
      if (contact.gender === "M") {
        gender = "남자"
      } else {
        gender = "여자"
      }
      let age
      if (contact.birth !== null || contact.birth !== undefined) {
        console.log(typeof Number(contact.birth.split("-")[0]))
        age = new Date().getFullYear() - Number(contact.birth.split("-")[0]) + 1
      }
      let portrait
      if (contact.portrait !== null || contact.portrait !== undefined) {
        portrait = "./images/peopleimg.jpg"
      } else {
        portrait = contact.portrait
      }
      return (
        <div class="bg-white shadow overflow-hidden sm:rounded-md mx-10">
          <ul>
            <li>
              <a
                href={`../friends/${contact.id}`}
                onClick={() => <NewsTable newsList={this.state.newsList} />}
                class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <div class="min-w-0 flex-1 flex items-center">
                    <div class="flex-shrink-0">
                      <img class="h-12 w-12 rounded-full" src={portrait} alt="" />
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
                            <img src="images/party1.png" class="  h-5 mr-2" />
                            <time datetime="2020-01-07">{`${contact.birth} ▷ ${age}세`}</time>
                          </div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            {`직업: ${contact.job} | ${contact.school} 졸업`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
      )
    })
  }

  render() {
    return (
      <>
        {this.props.friendList && this.setTable()}
        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          {/* {this.pagena} */}
          {this.props.friendList && (
            <Pagination items={this.props.friendList} onChangePage={this.onChangePage} />
          )}
        </div>
      </>
    )
  }
}

export default FriendTable
