import React, { Component } from "react"
import NewsTable from "../../components/News/NewsTable"
import Pagination from "../Pagination/Pagination"
import PropTypes from "prop-types"

var temppageOfitems = []

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

const defaultProps = {
  initialPage: 1,
  pageSize: 5
}

class FriendTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      relationship: "",
      pageOfitems: [],
      friendList: [],
      start: 0,
      end: 10,
      current: 1,
      pager: {},
      items: []
    }
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.state.items && this.state.items.length) {
      this.setPage(this.props.initialPage)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.friendList !== prevProps.friendList) {
      // console.log("items 가 달라 componentdidupdate 탔음")
      // this.setPage(this.props.initialPage)
      this.onChangePage(this.props.friendList)
      // this.setTable()
      // alert("gkgkgk")
    }
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
    temppageOfitems = pageOfitems
    this.setState({
      pageOfitems: pageOfitems
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      friendList: nextProps.friendList,
      items: nextProps.friendList
    })
    // this.onChangePage(temppageOfitems)
  }

  setTable = () => {
    if (temppageOfitems.length === 0) return
    return temppageOfitems.map((contact, i) => {
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

  setPage(page) {
    var { pageSize } = this.props
    var { items } = this.state
    var pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize)

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    // update state
    this.setState({ pager: pager })

    // call change page function in parent component
    this.onChangePage(pageOfItems)
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 5

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize)

    var startPage, endPage
    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 5 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1
        endPage = 5
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4
        endPage = totalPages
      } else {
        startPage = currentPage - 2
        endPage = currentPage + 2
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    console.log("렌더링됨")
    var pager = this.state.pager

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }
    return (
      <>
        {this.setTable()}
        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <ul class="flex pl-0 rounded list-none flex-wrap">
            <a
              type="button"
              onClick={() => this.setPage(1)}
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
            >
              {"<<"}
            </a>
            <a
              type="button"
              onClick={() => this.setPage(pager.currentPage - 1)}
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
            >
              {"<"}
            </a>
            {pager.pages.map((page, index) => (
              <a
                type="button"
                onClick={() => this.setPage(page)}
                key={index}
                class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
              >
                {page}
              </a>
            ))}

            <a
              type="button"
              onClick={() => this.setPage(pager.currentPage + 1)}
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
            >
              {">"}
            </a>
            <a
              type="button"
              onClick={() => this.setPage(pager.totalPages)}
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
            >
              {">>"}
            </a>
          </ul>
        </div>
      </>
    )
  }
}

FriendTable.propTypes = propTypes
FriendTable.defaultProps = defaultProps
export default FriendTable
