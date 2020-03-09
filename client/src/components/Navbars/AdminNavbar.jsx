import React, { Component } from "react";
// import { Navbar, Form, Button, Nav } from "react-bootstrap";

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <div class="flex justify-between bg-white py-3 ">
        <p className="text-3xl ml-10"> Dashboard</p>
        <button variant="outline-success" onClick={this.props.sendLogout} class="flex justify-center mr-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            로그아웃
          </button>
      </div>
      // <Navbar fluid bg="white">
      //   <Navbar.Brand>Dashboard
      //   </Navbar.Brand>
      //   <Navbar.Collapse>
      //     <Nav className="mr-auto"/>
      //     <Form inline>
      //     <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
      //       Button
      //     </button>
      //       <Button variant="outline-success" onClick={this.props.sendLogout}>로그아웃</Button>
      //     </Form>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

export default Header;
