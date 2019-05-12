import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./MainNavigation.css";

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation_logo">
            <h1>Easy Event</h1>
          </div>
          <div className="main-navigation_item">
            <ul>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token &&  <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>}
              {!context.token && <li>
                <NavLink to="/auth">Authenticate</NavLink>
              </li>}
            </ul>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
