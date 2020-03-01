import React, { Component } from "react";
import UploadImages from "../uploadImages/UploadImages";
import { Link } from "react-router-dom";
import TshirtPopUpLimit from "./TshirtPopUpLimit";
import PopUpDetails from "./PopUpDetails";

//Images

import Majica from "../../assets/images/majica.jpg";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

class TshirtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      tshirtLimitPopUpVisible: true,
      detailsToggle: true,
      isPicked: false
    };
  }

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  GetPhotoFromChildComponent = file => {
    // Uzimamo slike koje su izabrane na komponenti UploadImages i smestamo ih u state "file"
    this.setState({
      file: file
    });
  };

  isPickedPhotos = (data) => {
    this.setState({
      isPicked: data
    })
  }

  render() {
    return (
      <div className="tShirtPage_component">
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
          files={this.state.file}
          isPicked={(data) => this.isPickedPhotos(data)}
        />
        <div className="myCustomOrder">
        <div className="tshirt_imageBox_wrapper">
          <div className="tshirt_imageBox">
            <p className="tShirt_size">S , M , L , XL , XXL</p>
            <img src={Majica} alt="T-shirtImage" />
          </div>
        </div>
        {this.state.file.length < 3 && this.state.file.length > 0  && this.state.isPicked === true ? (
          <div className="btnForNext_wrapper">
            <div className="btnForNext">
              <Link
                to={{
                  pathname: "/photoTshirt",
                  file: this.state.file
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link>
            </div>
          </div>
        ) : null}
        </div>
        {this.state.file.length > 2 ? (
          <TshirtPopUpLimit
            tshirtLimitPopUpVisible={this.state.tshirtLimitPopUpVisible}
          />
        ) : null}
      </div>
    );
  }
}

export default TshirtPage;
