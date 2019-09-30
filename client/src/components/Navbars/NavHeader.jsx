
import React, { Component } from "react";
import { Navbar, Button, Form, FormControl } from "react-bootstrap";


class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
      name : this.props.name
    };
  }
  mobileSidebarToggle(e) {
    // if (this.state.sidebarExists === false) {
    //   this.setState({
    //     sidebarExists: true
    //   });
    // }
    // e.preventDefault();
    // document.documentElement.classList.toggle("nav-open");
    // var node = document.createElement("div");
    // node.id = "bodyClick";
    // node.onclick = function() {
    //   this.parentElement.removeChild(this);
    //   document.documentElement.classList.toggle("nav-open");
    // };
    // document.body.appendChild(node);
  }
  render() {
    return (

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">{this.state.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      // <Navbar>
        
      //     <Navbar.Brand>
      //       {this.props.brandText}
      //     </Navbar.Brand>
        
      //   <Navbar.Collapse>
      //     <Button>Search</Button>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

export default NavHeader;
