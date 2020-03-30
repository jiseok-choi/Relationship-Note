import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
// import { Home, Login } from '../pages';
import NewsTable from "../components/News/NewsTable"
import Sidebar from "../components/Sidebar"
import menu from "../components/Menu"
import image from "../assets/img/sidebar-3.jpg"

class App extends Component {
  state = {
    image: image,
    logined: false,
    userid: ""
  }

  getSidebars = menu => {
    return menu.map((prop, key) => {
      if (prop.layout) {
        return <Sidebar {...this.props} menu={menu} image={this.state.image} key={key} />
      } else {
        return
      }
    })
  }

  getRoutes = menu => {
    return menu.map((prop, key) => {
      if (true) {
        return <Route path={prop.path} render={props => <prop.component {...props} />} key={key} />
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <div className="wrapper">
        {this.getSidebars(menu)}
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Switch>
            {this.getRoutes(menu)}
            <Route path="/friends/:friendid" component={NewsTable} />
            {/* <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/> */}
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
