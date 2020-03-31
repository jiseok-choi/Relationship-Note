import React, { Component } from "react"
// import NewNews from './NewNews';
import ReviseMoney from "./ReviseMoney"
// import LookNews from './LookNews';
import axios from "axios"
import { Col, Row, Form, FormCheck, Feedback } from "react-bootstrap"
import Pagination from "../Pagination/Pagination"

class MoneyTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList: [],
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

  checkclick = id => {
    axios
      .patch(`http://54.180.149.57:8000/money/check/${id}`, {})
      .then(res => {
        const newvisit = res.data !== undefined
        if (newvisit) {
          this.setState({ lgShow: false })
          // alert('반환받음');
          console.log(res.data)
          this.props.getEvents()
          this.props.getVisits()
          // window.location.reload(); //새로고침
        } else {
          // alert('반환 못받음');
          console.error(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  setTable = visitList => {
    return visitList.map((contact, i) => {
      let check = false
      if (contact.check) {
        check = true
      }
      return (
        <tr>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.name}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.contents}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.celebration}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            {
              <ReviseMoney
                visitInfo={contact}
                getEvent={this.props.getEvent}
                getEvents={this.props.getEvents}
                getVisits={this.props.getVisits}
              />
            }
            <Form>
              <Form.Check
                onClick={() => {
                  this.checkclick(contact.id)
                }}
                type="switch"
                id={contact.id}
                checked={check}
                label="확인"
              />
            </Form>
          </td>
        </tr>
      )
    })
  }

  render() {
    let message
    {
      if (this.state.pageOfitems.length === 0) {
        message = `<<< 이벤트 항목을 클릭하세요`
      }
    }
    return (
      <>
        <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr class="">
                    <th class="px-8 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      이름
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      코멘트
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      축의금
                    </th>
                    <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      체크
                    </th>
                  </tr>
                </thead>
                <tbody>{this.setTable(this.state.pageOfitems)}</tbody>
              </table>
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                {message}
                <Pagination items={this.props.visitList} onChangePage={this.onChangePage} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MoneyTable
