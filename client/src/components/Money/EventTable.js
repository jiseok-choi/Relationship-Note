import React, { Component } from "react"
import { Col, Row } from "react-bootstrap"

class EventTable extends Component {
  state = {
    eventList: [],
    id: "",
    date: "",
    name: ""
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
        // <tr key={i} className="table-success"

        // onClick={ () => {this.props.selectEvent(contact);console.log('이것이 내부여',contact)} }
        // >
        //     <td>
        //         {contact.date}
        //     </td>
        //     <td>
        //         {contact.title}
        //     </td>
        //     <td>
        //         {완료여부}
        //     </td>
        // </tr>
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
        {/* <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            날짜
                        </th>
                        <th>
                            행사
                        </th>
                        <th>
                            정산여부
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.eventList)}
                </tbody>
            </table> */}
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
                <tbody>{this.setTable(this.props.eventList)}</tbody>
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
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="../main">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default EventTable
