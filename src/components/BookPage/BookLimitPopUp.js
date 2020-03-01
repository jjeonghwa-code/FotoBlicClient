import React, { Component } from "react";
import WarningImg from "../../assets/images/warning.png";

class BookLimitPopUp extends Component {
  state = {
    visible: this.props.visible,
    text: this.props.text
  };

  closeLimitPopUp = () => {
    let visible = this.state.visible;
    this.props.resetFiles();
    document.getElementById("uploadImages").value = "";
    this.setState({
      visible: !visible
    });
  };

  render() {
    return (
      <div className={this.state.visible ? "myCustomPopUp_wrapper" : "hidden"}>
        <div className="myCustomPopUp">
          <img src={WarningImg} alt="warningLimit" />
          <p>
            Možete izabrati maksimum {this.state.text} fotografija za štampanje na jednom book-u.
          </p>
          <button onClick={this.closeLimitPopUp}>OK</button>
        </div>
      </div>
    );
  }
}

export default BookLimitPopUp;
