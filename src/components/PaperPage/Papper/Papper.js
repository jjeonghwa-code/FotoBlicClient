import React, { Component } from "react";
import "../../../globalStyle.css";
import "./papperStyle.css";
import { Link } from "react-router-dom";
import UploadImages from "../../uploadImages/UploadImages";
import PopUpDetails from "./PopUpDetails";
import { connect } from "react-redux";
// Images

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// const imageThumbnail = require('image-thumbnail');

class Papper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [], //Smestamo u state file slike koje je korisnik izabrao u UploadImages
      detailsToggle: true,
      link1: "",
      link2: "",
      check1: false,
      check2: false,
      linkToNext: "",
      isPicked: false
    };
  }

  componentDidMount() {
    if (this.props.location.file) {
      this.setState({
        file: this.props.location.file
      });
    }
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

  check1Toggle = () => {
    let check1 = this.state.check1;
    this.setState({
      check1: !check1
    });
    if (this.state.check2) {
      this.setState({
        check2: false
      });
    }
  };

  check2Toggle = () => {
    let check2 = this.state.check2;
    this.setState({
      check2: !check2
    });
    if (this.state.check1) {
      this.setState({
        check1: false
      });
    }
  };

  // goToNext = () => {
  //   if (this.state.check1) {
  //     this.setState({
  //       linkToNext: "/photoPapperStandardOrder"
  //     });
  //   } else if (this.state.check2) {
  //     this.setState({
  //       linkToNext: "/photoPapperCombineOrder"
  //     });
  //   }
  // };

  nextPage = () => {
    this.props.getPhotos(this.state.file);

    if (this.state.check1 === true) {
      this.props.history.push("/photoPapperStandardOrder");
    } else {
      this.props.history.push("/photoPapperCombineOrder");
    }
  };

  isPickedPhotos = data => {
    this.setState({
      isPicked: data
    });
  };

  render() {
    return (
      <div className="papper_component">
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
          isPicked={data => this.isPickedPhotos(data)}
          sendFileProps={
            this.props.location.file ? this.props.location.file : null
          }
        />
        <div className="myCustomOrder">
          <div className="chooseFormat_Wrapper">
            <div className="container">
              <p className="ponuda">
                Imamo novu neverovatnu foto akciju! 50 fotografija za 650 din plus
                album na poklon.
              </p>
              <div className="chooseFormat">
                <div className="standardFormat">
                  <div className="chooseBox">
                    <button
                      onClick={this.check1Toggle}
                      // to={{
                      //   pathname: this.state.link1,
                      //   file: this.state.file
                      // }}
                    >
                      Standardna porudžbina
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          this.state.check1 ? "faCheck_papper" : "hidden"
                        }
                      />
                    </button>
                  </div>
                  <p>*Sve fotografje istog formata</p>
                </div>
                <div className="combineFormat">
                  <div className="chooseBox">
                    <button
                      onClick={this.check2Toggle}
                      // to={{
                      //   pathname: this.state.link2,
                      //   file: this.state.file
                      // }}
                    >
                      Kombinovani formati
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          this.state.check2 ? "faCheck_papper" : "hidden"
                        }
                      />
                    </button>
                  </div>
                  <p>*Sve fotografje različitog formata</p>
                </div>
              </div>
            </div>
          </div>
          {this.state.file.length > 0 &&
          (this.state.check1 === true || this.state.check2 === true) &&
          this.state.isPicked === true ? (
            <div className="btnForNext_wrapper">
              <div className="btnForNext" onClick={this.nextPage}>
                {/* <Link
                to={{
                  pathname: this.state.check1
                    ? "/photoPapperStandardOrder"
                    : "/photoPapperCombineOrder",
                  file: this.state.file
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link> */}
                <button>
                  Dalje
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: file => {
      dispatch({
        type: "GET_STATE_PAPPER",
        file: file
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Papper);
