import React, { Component } from "react";
import "./designBookStyle.css";

//fa
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import FramePic1 from "../../../../assets/images/frameImage/frame1.jpg";
import FramePic2 from "../../../../assets/images/frameImage/frame2.jpg";
import FramePic3 from "../../../../assets/images/frameImage/frame3.jpg";
import FramePic4 from "../../../../assets/images/frameImage/frame4.jpg";
import FramePic5 from "../../../../assets/images/frameImage/frame5.jpg";
import FramePic6 from "../../../../assets/images/frameImage/frame6.jpg";
import FramePic7 from "../../../../assets/images/frameImage/frame7.jpg";
import FramePic8 from "../../../../assets/images/frameImage/frame8.jpg";
import FramePic9 from "../../../../assets/images/frameImage/frame9.jpg";
import FramePic10 from "../../../../assets/images/frameImage/frame10.jpg";
import FramePic11 from "../../../../assets/images/frameImage/frame11.jpg";
import FramePic12 from "../../../../assets/images/frameImage/frame12.jpg";
import FramePic13 from "../../../../assets/images/frameImage/frame13.jpg";
import FramePic14 from "../../../../assets/images/frameImage/frame14.jpg";
import FramePic15 from "../../../../assets/images/frameImage/frame15.jpg";
import FramePic16 from "../../../../assets/images/frameImage/frame16.jpg";

export let imageIndex = null;
export let useSrcAttr = null;
class DesignBookPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: ""
    };
  }

  closeOutside = () => {
    this.props.closeDesignPopUpVisible(false);
  };

  getSrcFunc = e => {
    useSrcAttr = e.target.getAttribute("src");
    imageIndex = e.target.getAttribute("data-value");
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
          <div
            className="design_calendar_popup_box frame1"
          >
            <img src={FramePic1} data-value="6" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame2"
          >
            <img src={FramePic2} data-value="3" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame3"
          >
            <img src={FramePic3} data-value="4" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame4"
          >
            <img src={FramePic4} data-value="1" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame5"
          >
            <img src={FramePic5} data-value="2" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame6"
          >
            <img src={FramePic6} data-value="5" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame7"
          >
            <img src={FramePic7} data-value="7" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame8"
          >
            <img src={FramePic8} data-value="13" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame9"
          >
            <img src={FramePic9} data-value="8" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame10"
          >
            <img src={FramePic10} data-value="10" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame11"
          >
            <img src={FramePic11} data-value="15" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame12"
          >
            <img src={FramePic12} data-value="11" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame13"
          >
            <img src={FramePic13} data-value="9" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame14"
          >
            <img src={FramePic14} data-value="14" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame15"
          >
            <img src={FramePic15} data-value="16" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
          <div
            className="design_calendar_popup_box frame16"
          >
            <img src={FramePic16} data-value="12" alt="FramePic" onClick={this.getSrcFunc} />
          </div>
        </div>
      </div>
    );
  }
}

export default DesignBookPopUp;
