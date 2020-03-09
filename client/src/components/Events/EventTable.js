import React, { Component } from "react";
// import ReviseNews from './ReviseNews';
import LookEvent from "./LookEvent";
import { Col, Row } from "react-bootstrap";
import Visit from "./Visit";
import UpdateWedding from "../../components/Events/UpdateWedding";
import UpdateParty from "../../components/Events/UpdateParty";
import DeleteEvent from "./DeleteEvent";
import dotenv from "dotenv";
dotenv.config();

class EventTable extends Component {
  state = {
    eventList: []
  };

  setTable = eventList => {
    return eventList.map((contact, i) => {
      let url = "";
      let update;
      if (contact.kinds === "wedding") {
        url = `http://${process.env.REACT_APP_IP}:3000/weddinginvitation/${contact.id}`;
        update = (
          <UpdateWedding eventInfo={contact} getEvents={this.props.getEvents} />
        );
      }
      if (contact.kinds === "party") {
        url = `http://${process.env.REACT_APP_IP}:3000/partyinvitation/${contact.id}`;
        update = (
          <UpdateParty eventInfo={contact} getEvents={this.props.getEvents} />
        );
      }
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
            <p class="text-gray-900 whitespace-no-wrap">{contact.title}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{contact.date}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{url}</p>
          </td>
          <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
            {update}
            <Visit eventInfo={contact} />
            <DeleteEvent eventInfo={contact} getEvents={this.props.getEvents}/>
          </td>
        </tr>
      );
    });
  };

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
                <tbody>
                  {this.setTable(this.props.eventList)}
                </tbody>
              </table>
              {/* <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <Pagination items={exampleItems} onChangePage={onChangePage} />
          </div> */}
            </div>
          </div>
        </div>
        {/* <nav className="pagination-sm">
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
            </nav> */}
      </>
    );
  }
}

export default EventTable;
