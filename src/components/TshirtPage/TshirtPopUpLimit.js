import React, { Component } from "react";
import WarningImg from "../../assets/images/warning.png";

class CupLimitPopUp extends Component {
  state = {
    tshirtLimitPopUpVisible: this.props.tshirtLimitPopUpVisible
  };

  closeLimitPopUp = () => {
    this.setState({
      tshirtLimitPopUpVisible: false
    });
  };

  render() {
    return (
      <div
        className={
          !this.state.tshirtLimitPopUpVisible
            ? "hidden"
            : "myCustomPopUp_wrapper"
        }
      >
        <div className="myCustomPopUp">
          <img src={WarningImg} alt="warningLimit" />
          <p>
            Možete izabrati maksimum dve fotografije za štampanje na jednoj
            majici.
          </p>
          <button onClick={this.closeLimitPopUp}>OK</button>
        </div>
      </div>
    );
  }
}

export default CupLimitPopUp;
