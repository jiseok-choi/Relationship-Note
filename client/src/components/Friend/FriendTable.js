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
        return(
            <div>
            <table className="table table-bordered table-hover">
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
            </table>





            <Pagenation/>
            </div>
        );
    }
}

export default FriendTable;