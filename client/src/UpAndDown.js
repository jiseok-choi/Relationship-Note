  
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class UpAndDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3001/get_count`)
            .then(response => {
                if (response.data.status === "ok") {
                    console.log("response : ", response.data.count);
                    this.setState({count: response.data.count});
                } else {
                    console.log(`error : ${response.data.msg}`);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleIncrease = () => {
        axios
            .get(`http://localhost:3001/up_count`)
            .then(response => {
                if (response.data.status === "ok") {
                    console.log("response : ", response.data);
                    this.setState({
                        count: this.state.count + 1
                    });
                } else {
                    console.log(`error : ${response.data.msg}`);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDecrease = () => {
        axios
            .get(`http://localhost:3001/down_count`)
            .then(response => {
                if (response.data.status === "ok") {
                    console.log("response : ", response.data);
                    this.setState({
                        count: this.state.count - 1
                    });
                } else {
                    console.log(`error : ${response.data.msg}`);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {count} = this.state;
        return (
            <row>
                <p>{count}</p>
                <Button color="primary" onClick={this.handleIncrease}>Up</Button>{' '}
                <Button color="primary" onClick={this.handleDecrease}>Down</Button>
            </row>

        );
    }
}
export default UpAndDown;