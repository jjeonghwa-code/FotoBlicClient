import React, { Component } from "react";
import { Link } from "react-router-dom";
import UploadImages from "../uploadImages/UploadImages";
import CupLimitPopUp from "./CupLimitPopUp";
import PopUpDetails from "./PopUpDetails";

//Images
import OneCupImg from "../../assets/images/oneCup.jpg";
import ThreeCupsImg from "../../assets/images/threeCups.jpg";
import MagicCupImg from "../../assets/images/magicCup.jpg";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

class CupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      detailsToggle: true,
      cupLimitPopUpVisible: true,
      isPicked: false
    };
    this.child = React.createRef();
  }

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  GetPhotoFromChildComponent = file => {
    // Uzimamo slike koje su izabrane na komponenti UploadImages i smestamo ih u state "file"
    this.setState({
      file
    });
  };

  resetCupPageFile = () => {
    this.setState({
      file: []
    });
  };

  resetFileState = () => {
    this.resetCupPageFile();
    this.child.current.resetStateFile();
  };

  isPickedPhotos = data => {
    this.setState({
      isPicked: data
    });
  };

  render() {
    return (
      <div className="cup_page">
        <div className="container" style={{ position: "relative" }}>
          <div onClick={this.toggleDetails} className="papper_btn_question">
            <FontAwesomeIcon icon={faQuestionCircle} />
            {this.state.detailsToggle ? (
              <PopUpDetails visible={this.toggleDetails} />
            ) : null}
          </div>
        </div>
        <UploadImages
          updatePhotos={this.GetPhotoFromChildComponent}
          ref={this.child}
          files={this.state.file}
          isPicked={data => this.isPickedPhotos(data)}
        />
        <div className="myCustomOrder">
          <div className="cup_holder_images">
            <div className="cup_holder_images_box">
              <h4>Klasik</h4>
              <div className="img_holder">
                <img src={OneCupImg} alt="OneCupImg" />
              </div>
            </div>
            <div className="cup_holder_images_box">
              <h4>Šarena</h4>
              <div className="img_holder">
                <img src={ThreeCupsImg} alt="OneCupImg" />
              </div>
            </div>
            <div className="cup_holder_images_box">
              <h4>Magična</h4>
              <div className="img_holder">
                <img src={MagicCupImg} alt="OneCupImg" />
              </div>
            </div>
          </div>
          {this.state.file.length < 4 &&
          this.state.file.length > 0 &&
          this.state.isPicked === true ? (
            <div className="btnForNext_wrapper">
              <div className="btnForNext">
                <Link
                  to={{
                    pathname: "/photoCup",
                    state: this.state.file
                  }}
                >
                  Dalje
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.file.length >= 4 ? (
          <CupLimitPopUp
            cupLimitPopUpVisible={this.state.cupLimitPopUpVisible}
            resetState={this.resetFileState}
          />
        ) : null}
      </div>
    );
  }
}

export default CupPage;
