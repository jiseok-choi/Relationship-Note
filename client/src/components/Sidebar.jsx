
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
        <div className="ml-4 w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 lg:border-transparent bg-black lg:shadow-none lg:bg-transparent z-20">
          <ul className="list-reset"> 
          {/* {className="nav"} */}
            {this.props.menu.map((prop, key) => {
            //   if (!prop.redirect)
              if (prop.layout)
                return (
                  <li key={key} className="py-2 md:my-0 hover:bg-purple-100 lg:hover:bg-transparent">
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
