import React, { Component } from "react"
import { Col, Row } from "react-bootstrap"
import Pagination from "../Pagination/Pagination"

class EventTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventList: [],
      id: "",
      date: "",
      name: "",
      pageOfitems: []
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

  setTable = eventList => {
    return eventList.map((contact, i) => {
      let 완료여부 = "미완료"
      if (contact.check === true) {
        완료여부 = "완료"
      }
      return (
        <tr
          onClick={() => {
            this.props.selectEvent(contact)
            console.log("이것이 내부여", contact)
          }}
        >
          <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.date}</p>
          </td>
          <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.title}</p>
          </td>
          <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">{완료여부}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div class="-mx-4 sm:-mx-8 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr class="">
                    <th class="px-2 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs text-gray-600 uppercase tracking-wider">
                      날짜
                    </th>
                    <th class="px-2 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs text-gray-600 uppercase tracking-wider">
                      행사
                    </th>
                    <th class="px-2 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs text-gray-600 uppercase tracking-wider">
                      정산
                    </th>
                  </tr>
                </thead>
                <tbody>{this.setTable(this.state.pageOfitems)}</tbody>
              </table>
              {/* <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <Pagination items={exampleItems} onChangePage={onChangePage} />
          </div> */}
            </div>
          </div>
        </div>
        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <Pagination items={this.props.eventList} onChangePage={this.onChangePage} />
        </div>
      </div>
    )
  }
}

export default EventTable
