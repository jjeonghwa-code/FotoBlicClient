import React, { Component } from "react";
import "./globalStyle.css";
import "./app.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// PAGES
import Home from "./components/Home/Home";
import Papper from "./components/PaperPage/Papper/Papper";
import StandardOrder from "./components/PaperPage/StandardOrder/StandardOrder";
import CombineOrder from "./components/PaperPage/CombineOrder/CombineOrder";
import CupPage from "./components/CupPage/CupPage";
import Cup from "./components/CupPage/Cup/Cup";
import PuzzlePage from "./components/PuzzlePage/PuzzlePage";
import Puzzle from "./components/PuzzlePage/Puzzle/Puzzle";
import TshirtPage from "./components/TshirtPage/TshirtPage";
import Tshirt from "./components/TshirtPage/Tshirt/Tshirt";
import CalendarPage from "./components/CalendarPage/CalendarPage";
import Calendar from "./components/CalendarPage/Calendar/Calendar";
import BookPage from "./components/BookPage/BookPage";
import Book from "./components/BookPage/Book/BookSlider";
import ErrorForm from "./components/ErrorFormPopup/ErrorFormPopup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorFormPopup from "./components/ErrorFormPopup/ErrorFormPopup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false
    };
  }
  openErrorForm = () => {
    this.setState({
      openPopup: !this.state.openPopup
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/photoPapperUploadImages" component={Papper} />
          <Route path="/photoPapperStandardOrder" component={StandardOrder} />
          <Route path="/photoPapperCombineOrder" component={CombineOrder} />
          <Route path="/photoCupUploadImages" component={CupPage} />
          <Route path="/photoCup" component={Cup} />
          <Route path="/photoPuzzleUploadImages" component={PuzzlePage} />
          <Route path="/photoPuzzle" component={Puzzle} />
          <Route path="/photoTshirtUploadImages" component={TshirtPage} />
          <Route path="/photoTshirt" component={Tshirt} />
          <Route path="/photoCalendarUploadImages" component={CalendarPage} />
          <Route path="/photoCalendar" component={Calendar} />
          <Route path="/photoBookUploadImages" component={BookPage} />
          <Route path="/photoBook" component={Book} />
          <Route path="/errorForm" component={ErrorForm} />
          <Footer isOpen={this.openErrorForm} />
          <div className="error">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color="#fff"
              size="2x"
              onClick={this.openErrorForm}
            />
            {this.state.openPopup ? (
              <ErrorFormPopup isOpen={this.openErrorForm} />
            ) : null}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
