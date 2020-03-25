// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import Card from "../components/Card/Card"
import { Pie, Bar } from "react-chartjs-2"
import AdminNavbar from "../components/Navbars/AdminNavbar"
import axios from "axios"
import StatsCard from "../components/StatsCard/StatsCard"
import "../assets/css/font-awesome.min.css"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countfriends: "",
      countevents: "",
      activity: "",
      dataPie: { labels: ["0%"], series: [100] },
      legendPie: { names: ["지인을 등록해보세요"], types: ["color1"] },
      datasetsPie: [{ data: [200], backgroundColor: ["#FB404B"] }],
      //dataBar 에 들어갈 data 와 labels
      bardata: [1, 1, 1, 1, 1, 1, 1],
      barlabels: ["August", "September", "October", "November", "December", "January", "February"]
    }
    this.getDashboard = this.getDashboard.bind(this)
  }

  createLegend(json) {
    let legend = []
    for (let i = 0; i < json["names"].length; i++) {
      let type = "text-" + json["types"][i]
      console.log(type)
      legend.push(<div className={`test-circle ${type}`} key={i} />)
      legend.push(" ")
      legend.push(json["names"][i])
    }
    return legend
  }

  sendLogout = e => {
    e.preventDefault()

    axios.defaults.withCredentials = true

    axios
      // .post(`process.env.HTTP` || `http://localhost:8000/auth/login`, {
      // .get(`http://localhost:8000/auth/logout`, {
      .get(`http://54.180.149.57:8000/auth/logout`, {
        // .post(`http://172.30.1.9:8000/auth/login`, {
      })
      .then(res => {
        console.log(res)

        if (res.data === "logout") {
          window.location.reload() //새로고침
        } else {
          console.error(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  getDashboard = () => {
    axios.defaults.withCredentials = true

    axios
      //   .get(`http://localhost:8000/dashboard/`, {
      .get(`http://54.180.149.57:8000/dashboard/`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(res => {
        console.log(res.data.legendPie, res.data.dataPie)
        this.setState({
          dataPie: res.data.dataPie,
          countfriends: res.data.countfriends,
          countevents: res.data.countevents,
          activity: res.data.activity,
          legendPie: res.data.legendPie,
          datasetsPie: [res.data.datasetsPie],
          bardata: res.data.dataBar.bardata,
          barlabels: res.data.dataBar.barlabels
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.getDashboard()
  }

  render() {
    return (
      <div>
        <AdminNavbar sendLogout={this.sendLogout} />
        <Container fluid>
          <br />
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="등록된 지인"
                statsValue={this.state.countfriends + " 명"}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="have your friend"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-date text-success" />}
                statsText="행사 및 일정"
                statsValue={this.state.countevents + " 개"}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="7 days from today"
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
                  <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                    <Pie
                      data={{
                        labels: this.state.legendPie.names,
                        datasets: this.state.datasetsPie
                      }}
                      height="190%"
                    />
                  </div>
                }
                legend={
                  <br />
                  // <div className="legend">{this.createLegend(this.state.legendPie)}</div>
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
                    <Bar
                      data={{
                        datasets: [
                          {
                            backgroundColor: "rgba(255,99,132,0.2)",
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 1,
                            data: this.state.bardata,
                            hoverBackgroundColor: "#f279d3",
                            hoverBorderColor: "#7989f2",
                            label: "추가된 소식"
                          }
                        ],
                        labels: this.state.barlabels
                      }}
                      width={100}
                      height={50}
                      legend={{ display: true, position: "bottom" }}
                      options={{
                        maintainAspectRatio: false,
                        redraw: false,
                        type: "bar",
                        width: 300
                      }}
                    />
                  </div>
                }
                legend={
                  <br />
                  // <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home
