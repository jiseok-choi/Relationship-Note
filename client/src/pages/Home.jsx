// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from '../components/Card/Card';
import ChartistGraph from 'react-chartist';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import axios from 'axios';
import StatsCard from '../components/StatsCard/StatsCard';
import "../assets/css/font-awesome.min.css";
import {
    // dataPie,
    // legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar,
    style,iconsArray
  } from "../components/variables/Variables.jsx";

var dataPie = {
    labels: ['40%', '20%', '30%', '10%'],
    series: [10, 10, 10,10, 10,10,10,10,10,10]
};
var legendPie = {
    names: ["Open", "Bounce", "Unsubscribe"],
    types: ['color1', 'color2', 'color3']
};
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            countfriends : '',
            countevents : '',
            activity : '',
            dataPie : {labels: ['0%'], series: [100]},
            legendPie : {names: ["지인을 등록해보세요"], types: ['color1']},
        }
        this.getDashboard = this.getDashboard.bind(this);
        this.chartistGraph = this.chartistGraph.bind(this);
    }

    createLegend(json) {
        let legend = [];
        for (let i = 0; i < json["names"].length; i++) {
        let type = "text-" + json["types"][i];
          console.log(type);
          legend.push(<div className={`test-circle ${type}`} key={i} />);
          legend.push(" ");
          legend.push(json["names"][i]);
        }
        return legend;
      }

    chartistGraph=(pie)=> {
        return <ChartistGraph data={pie} type="Pie" />
    }
      
    sendLogout = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;

        axios
            // .post(`process.env.HTTP` || `http://localhost:8000/auth/login`, {
            .get(`http://localhost:8000/auth/logout`, {
            // .post(`http://172.30.1.9:8000/auth/login`, {
                
            })
            .then(res => {
                console.log(res);

                if(res.data === 'logout'){
                    window.location.reload(); //새로고침
                } else {
                    console.error(res.data); 
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    getDashboard = () => {
        axios.defaults.withCredentials = true;

        axios
        .get(`http://localhost:8000/dashboard/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
        .then(res => {
            console.log(res.data.legendPie, res.data.dataPie);
            this.setState({
                dataPie: res.data.dataPie,
                countfriends: res.data.countfriends,
                countevents: res.data.countevents,
                activity: res.data.activity,
                legendPie: res.data.legendPie,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    componentDidMount(){
        this.getDashboard();
    }
    
    render() {
        return (
            <div>
                <AdminNavbar sendLogout={this.sendLogout}/>
                <Container fluid>
                    <br/>
                    <Row>
                        <Col lg={4} sm={6}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-users text-warning" />}
                            statsText="등록된 지인"
                            statsValue={this.state.countfriends+" 명"}
                            statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="have your friend"
                        />
                        </Col>
                        <Col lg={4} sm={6}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-date text-success" />}
                            statsText="행사 및 일정"
                            statsValue={this.state.countevents+" 개"}
                            statsIcon={<i className="fa fa-calendar-o" />}
                            statsIconText="This week"
                        />
                        </Col>
                        <Col lg={4} sm={6}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-pen text-danger" />}
                            statsText="최근 활동"
                            statsValue={this.state.activity}
                            statsIcon={<i className="fa fa-clock-o" />}
                            statsIconText="Recent activity"
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                        <Card
                            statsIcon="fa fa-clock-o"
                            title="지인 등록 분포도"
                            category="Acquaintance"
                            stats=""
                            content={
                            <div
                                id="chartPreferences"
                                className="ct-chart ct-perfect-fourth"
                            >
                                {this.chartistGraph(this.state.dataPie)}
                            </div>
                            }
                            legend={
                            <div className="legend">{this.createLegend(this.state.legendPie)}</div>
                            }
                            
                        />
                        </Col>
                        <Col md={7}>
                        <Card
                            id="chartActivity"
                            title="월별 추가된 지인 소식"
                            category="Added monthly contacts"
                            stats=""
                            statsIcon="fa fa-check"
                            content={
                            <div className="ct-chart">
                                <ChartistGraph
                                data={dataBar}
                                type="Bar"
                                options={optionsBar}
                                responsiveOptions={responsiveBar}
                                />
                            </div>
                            }
                            legend={
                            <div className="legend">{this.createLegend(legendBar)}</div>
                            }
                        />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Home;