import React, { Component } from "react"
// import ReviseNews from './ReviseNews';
import LookEvent from "./LookEvent"
import { Col, Row, Button } from "react-bootstrap"
import Visit from "./Visit"
import UpdateWedding from "../../components/Events/UpdateWedding"
import UpdateParty from "../../components/Events/UpdateParty"
import DeleteEvent from "./DeleteEvent"
import Pagination from "../Pagination/Pagination"
import { CopyToClipboard } from "react-copy-to-clipboard"
import dotenv from "dotenv"
dotenv.config()

class EventTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventList: [],
      pageOfitems: []
    }
    this.onChangePage = this.onChangePage.bind(this)
  }
  // exampleItemList = [...Array(60).keys()].map(i => ({
  //   age: "i + 1",
  //   birth: "Item " + (i + 1),
  //   createdAt: "Item " + (i + 1),
  //   deletedAt: "Item " + (i + 1),
  //   gender: "Item " + (i + 1),
  //   id: "Item " + (i + 1),
  //   job: "Item " + (i + 1),
  //   name: "Item " + (i + 1),
  //   phone_num: "Item " + (i + 1),
  //   relationship: "Item " + (i + 1),
  //   school: "Item " + (i + 1),
  //   updatedAt: "Item " + (i + 1),
  //   userId: "Item " + (i + 1),
  //   userId: "Item " + (i + 1)
  // }))
  onChangePage(pageOfitems) {
    this.setState({
      pageOfitems: pageOfitems
    })
  }

  copysuccess() {
    alert("복사되었습니다 초청장을 보내보세요")
  }

  setTable = eventList => {
    return eventList.map((contact, i) => {
      let url = ""
      let update
      if (contact.kinds === "wedding") {
        url = `http://${process.env.REACT_APP_IP}/weddinginvitation/${contact.id}`
        update = <UpdateWedding eventInfo={contact} getEvents={this.props.getEvents} />
      }
      if (contact.kinds === "party") {
        url = `http://${process.env.REACT_APP_IP}/partyinvitation/${contact.id}`
        update = <UpdateParty eventInfo={contact} getEvents={this.props.getEvents} />
      }
      return (
        <tr>
          <td class="px-4 py-3 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div class="ml-1">
                <p class="text-gray-900 whitespace-no-wrap">{contact.index}</p>
              </div>
            </div>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.title}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.date}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <a class="text-blue-500 hover:text-blue-800">
              {/* href={url} */}
              {/* {url} */}
              <CopyToClipboard text={url} onCopy={() => this.setState({ copied: true })}>
                <Button onClick={this.copysuccess} variant="primary" type="submit">
                  주소복사
                </Button>
              </CopyToClipboard>
            </a>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            {update}
            <Visit eventInfo={contact} />
            <DeleteEvent eventInfo={contact} getEvents={this.props.getEvents} />
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <>
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
                      제목
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      날짜
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      초청장
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      기타
                    </th>
                  </tr>
                </thead>
                <tbody>{this.setTable(this.state.pageOfitems)}</tbody>
              </table>
              {/* <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <Pagination items={exampleItems} onChangePage={onChangePage} />
          </div> */}
              <div class="bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <Pagination items={this.props.eventList} onChangePage={this.onChangePage} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EventTable
