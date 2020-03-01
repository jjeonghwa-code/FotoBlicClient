import React, { Component } from "react";
import WarningImg from "../../assets/images/warning.png";
import "./Cup/cupStyle.css";

class CupLimitPopUp extends Component {
  state = {
    cupLimitPopUpVisible: this.props.cupLimitPopUpVisible
  };

  closeLimitPopUp = () => {
    this.props.resetState();
    this.setState({
      cupLimitPopUpVisible: false
    });
  };

  render() {
    return (
      <div
        className={
          this.state.cupLimitPopUpVisible ? "myCustomPopUp_wrapper" : "hidden"
        }
      >
        <div className="myCustomPopUp">
          <img src={WarningImg} alt="warningLimit" />
          <p>
            Možete izabrati maksimum tri fotografije za štampanje na jednoj
            šolji.
          </p>
          <button onClick={this.closeLimitPopUp}>OK</button>
        </div>
      </div>
    );
  }
}

export default CupLimitPopUp;
