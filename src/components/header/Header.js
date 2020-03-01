import React, { Component } from "react";
import "../../globalStyle.css";
import "./header.css";

// fa

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Images

import Logo from "../../assets/images/logo.png";
import papperimg from "../../assets/images/navigation_icon/foto-papir.png";
import cupImg from "../../assets/images/navigation_icon/foto-solja.png";
import puzzleImg from "../../assets/images/navigation_icon/foto-puzzle.png";
import tshirtImg from "../../assets/images/navigation_icon/foto-majica.png";
import calendarImg from "../../assets/images/navigation_icon/foto-calendar.png";
import bookImg from "../../assets/images/navigation_icon/foto-book.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      activePage: ""
    };
  }

  toggleMobileMenu = () => {
    const currentMobileMenu = this.state.mobileMenu;
    this.setState({
      mobileMenu: !currentMobileMenu
    });
    if (this.state.mobileMenu) {
      let body = document.querySelector("body");
      body.className = "overAuto";
    } else {
      let body = document.querySelector("body");
      body.className = "over";
    }
  };

  closeMobileMenu = e => {
    this.setState({
      mobileMenu: false,
      activePage: e.target.pathname
    });
  };

  isActive = path => {
    if (path === this.state.activePage) {
      let body = document.querySelector("body");
      body.className = "overAuto";
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="header_component">
        <div className="header_top">
          <div className="container">
            <div className="header_top_holder">
              <Link to="/">
                <img src={Logo} alt="Foto Logo" />
              </Link>
              <span onClick={this.toggleMobileMenu}>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.mobileMenu
              ? "openNavigation header_bottom"
              : "header_bottom"
          }
        >
          <div className="container">
            <ul className="navigation">
              <li className="navigation_item">
                <NavLink
                  to="/photoPapperUploadImages"
                  className={
                    this.isActive("/photoPapperUploadImages")
                      ? " active_nav"
                      : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto-Papir <img src={papperimg} alt="papperimg" />
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink
                  to="/photoCupUploadImages"
                  className={
                    this.isActive("/photoCupUploadImages") ? " active_nav" : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto Šolja <img src={cupImg} alt="cupImg" />
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink
                  to="/photoPuzzleUploadImages"
                  className={
                    this.isActive("/photoPuzzleUploadImages")
                      ? " active_nav"
                      : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto Puzzle <img src={puzzleImg} alt="puzzleImg" />
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink
                  to="/photoTshirtUploadImages"
                  className={
                    this.isActive("/photoTshirtUploadImages")
                      ? " active_nav"
                      : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto Majica <img src={tshirtImg} alt="tshirtImg" />
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink
                  to="/photoCalendarUploadImages"
                  className={
                    this.isActive("/photoCalendarUploadImages")
                      ? " active_nav"
                      : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto Kalendar <img src={calendarImg} alt="calendarImg" />
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink
                  to="/photoBookUploadImages"
                  className={
                    this.isActive("/photoBookUploadImages") ? " active_nav" : ""
                  }
                  activeClassName="active_nav"
                  onClick={this.closeMobileMenu}
                >
                  Foto Book <img src={bookImg} alt="bookImg" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
