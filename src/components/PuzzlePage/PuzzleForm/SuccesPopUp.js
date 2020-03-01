import React, { Component } from "react";
import { Link } from "react-router-dom";

import SuccesImg from "../../../assets/images/succcess.png";
import WarningImg from "../../../assets/images/warning.png";
import { Redirect } from "react-router-dom";

class SuccesPopUp extends Component {
  state = {
    succesPopUp: this.props.succesPopUp,
    popUpStatus: this.props.popUpStatus,
    redirect: false
  };
  closePopUp = () => {
    this.props.setNaruciButtonStatus(false);
    this.props.closeSuccess(false);
  };
  bodyOverflow = () => {
    let body = document.querySelector("body");
    body.className = "overAuto";

    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    return <Redirect to="/photoPuzzleUploadImages" />;
  };

  render() {
    let imgVisible;
    if (this.props.responsePopUp.data === "Uspešno ste poslali narudžbinu!") {
      imgVisible = <img src={SuccesImg} alt="success" />;
    } else {
      imgVisible = <img src={WarningImg} alt="warning" />;
    }

    return (
      <div
        className={!this.state.succesPopUp ? "hidden" : "myCustomPopUp_wrapper"}
      >
        <div className="myCustomPopUp">
          {imgVisible}
          <p>{this.props.responsePopUp.data}</p>
          {this.props.responsePopUp.data ===
          "Uspešno ste poslali narudžbinu!" ? (
            <button className="color_white" onClick={this.bodyOverflow}>
              {/* <Link to="/photoPuzzleUploadImages" onClick={this.bodyOverflow}> */}
              OK
              {/* </Link> */}
            </button>
          ) : (
            <button className="color_white" onClick={this.closePopUp}>
              OK
            </button>
          )}
        </div>
        {this.state.redirect ? this.renderRedirect() : null}
      </div>
    );
  }
}

export default SuccesPopUp;
