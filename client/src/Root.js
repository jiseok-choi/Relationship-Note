// Root 컴포넌트. 이 컴포넌트는 웹어플리케이션에 BrowserRouter를 적용합니다. 
// 나중에 리덕스를 적용 하게 될 때, 여기서 Provider 를 통하여 프로젝트에 리덕스를 연결시켜줍니다.

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './shared/App';
import Login from './join/index';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

require('dotenv').config(); //.env 설정


class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged : false,
        }
        this.initializeUserInfo = this.initializeUserInfo.bind(this);
    }
    

    initializeUserInfo = () => {
        axios.defaults.withCredentials = true;
        axios
        .post(`http://localhost:8000/main`, {
        // .post(process.env.HTTP || `http://localhost:8000/main`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
              },
            credentials: "same-origin"
        })
        .then(res => {
            // console.log('로그인여부 응답받음');
            console.log('로그인했나요?'+res.data);
            this.setState({
                logged: res.data,
            });
            // this.loged();
        })
        .catch(err => {
            console.error(err);
        });
        
    }

    
  
    componentDidMount() {
      this.initializeUserInfo();
    }

    loged(data){
        this.setState({
            logged: true
            
        })
        console.log(this.state.logged);
    }
  
    userinfo2() {
        if(this.state.logged){ //로그인 했다면
            return(
                <BrowserRouter>
                    <Switch>
                        <Route path="/" render={props => <App {...props}/> } />
                    </Switch>
                </BrowserRouter>
                )
        } else {
            return <Login loged={this.loged.bind(this)}/>
        }
    }
    

    render() {
        return(
            <>
            {this.userinfo2()}
            {/* {this.initializeUserInfo()} */}
            {/* <Login></Login> */}
            {/* <BrowserRouter>
                <Route path="/" render={props => <App {...props}/> } />
            </BrowserRouter> */}
                {/* <Redirect to="/login" render={props => <Login {...props}/> } /> */}
            </>
        );
    }
}


export default Root;