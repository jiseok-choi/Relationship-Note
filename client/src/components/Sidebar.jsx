
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
          
        <div className="logo">
          <a className="simple-text logo-normal">
            R_NOTE
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul > 
          {/* {className="nav"} */}
            {this.props.menu.map((prop, key) => {
            //   if (!prop.redirect)
              if (prop.layout)
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.path}
                    >
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
