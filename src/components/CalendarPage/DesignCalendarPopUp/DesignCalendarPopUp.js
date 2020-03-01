import React, { Component } from "react";
import "./designCalendarStyle.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import FramePic1 from "../../../assets/images/frameImage/frame1.jpg";
import FramePic2 from "../../../assets/images/frameImage/frame2.jpg";
import FramePic3 from "../../../assets/images/frameImage/frame3.jpg";
import FramePic4 from "../../../assets/images/frameImage/frame4.jpg";
import FramePic5 from "../../../assets/images/frameImage/frame5.jpg";
import FramePic6 from "../../../assets/images/frameImage/frame6.jpg";
import FramePic7 from "../../../assets/images/frameImage/frame7.jpg";
import FramePic8 from "../../../assets/images/frameImage/frame8.jpg";
import FramePic9 from "../../../assets/images/frameImage/frame9.jpg";
import FramePic10 from "../../../assets/images/frameImage/frame10.jpg";
import FramePic11 from "../../../assets/images/frameImage/frame11.jpg";
import FramePic12 from "../../../assets/images/frameImage/frame12.jpg";
import FramePic13 from "../../../assets/images/frameImage/frame13.jpg";
import FramePic14 from "../../../assets/images/frameImage/frame14.jpg";
import FramePic15 from "../../../assets/images/frameImage/frame15.jpg";
import FramePic16 from "../../../assets/images/frameImage/frame16.jpg";

export let imageIndex = null;
export let useSrcAttr = null;

class DesignCalendarPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: ""
    };
  }

  getSrcFunc = e => {
    imageIndex = e.target.getAttribute("data-value");
  };

  closeOutside = () => {
    this.props.closeDesignPopUpVisible(false);
    this.props.callFunction();
  };

  render() {
    return (
      <div
        className="design_calendar_popup_wrapper"
        onClick={this.closeOutside}
      >
        <div className="design_calendar_popup">
          <div className="closeDesignCalendarButton">
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
          <div className="design_calendar_popup_box frame1">
            <img
              src={FramePic1}
              alt="FramePic"
              data-value="6"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame2">
            <img
              src={FramePic2}
              alt="FramePic"
              data-value="3"
              onClick={this.getSrcFunc}
            />
          </div>
          {/* <div
            className="design_calendar_popup_box frame3"
          >
            <img src={FramePic3} alt="FramePic" data-value="4" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame4"
          >
            <img src={FramePic4} alt="FramePic" data-value="1" onClick={this.getSrcFunc} />
          </div> */}
          <div className="design_calendar_popup_box frame5">
            <img
              src={FramePic5}
              alt="FramePic"
              data-value="2"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame6">
            <img
              src={FramePic6}
              alt="FramePic"
              data-value="5"
              onClick={this.getSrcFunc}
            />
          </div>
          {/* <div
            className="design_calendar_popup_box frame7"
          >
            <img src={FramePic7} alt="FramePic" data-value="7" onClick={this.getSrcFunc} />
          </div> */}
          {/* <div
            className="design_calendar_popup_box frame8"
          >
            <img src={FramePic8} alt="FramePic" data-value="13" onClick={this.getSrcFunc} />
          </div> */}
          <div className="design_calendar_popup_box frame9">
            <img
              src={FramePic9}
              alt="FramePic"
              data-value="8"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame10">
            <img
              src={FramePic10}
              alt="FramePic"
              data-value="10"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame11">
            <img
              src={FramePic11}
              alt="FramePic"
              data-value="15"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame12">
            <img
              src={FramePic12}
              alt="FramePic"
              data-value="11"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame13">
            <img
              src={FramePic13}
              alt="FramePic"
              data-value="9"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame14">
            <img
              src={FramePic14}
              alt="FramePic"
              data-value="14"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame15">
            <img
              src={FramePic15}
              alt="FramePic"
              data-value="16"
              onClick={this.getSrcFunc}
            />
          </div>
          <div className="design_calendar_popup_box frame16">
            <img
              src={FramePic16}
              alt="FramePic"
              data-value="12"
              onClick={this.getSrcFunc}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DesignCalendarPopUp;
