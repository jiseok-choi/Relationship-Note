import React, { Component } from 'react';
import Pagenation from '../Pagenation/Pagenation';

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
            return(
                <tr key={i} className="table-success" onClick={ () =>this.props.selectFriend(contact) }>
                    <td>
                        {i+1}
                    </td>
                    <td>
                        {contact.relationship}
                    </td>
                    <td>
                        {contact.name}
                    </td>
                </tr>
            );
        })
        
    }

    render() {
        return (
          <div>
            {/* <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            관계
                        </th>
                        <th>
                            이름
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTable(this.props.friendList)}
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
                          관계
                        </th>
                        <th class="px-5 py-3 text-base border-b-2 border-gray-200 bg-teal-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          이름
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.setTable(this.props.friendList)}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <Pagenation />
          </div>
        );
    }
}

export default FriendTable;