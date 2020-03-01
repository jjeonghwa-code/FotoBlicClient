import React, { Component } from "react";
import { Link } from "react-router-dom";
import UploadImages from "../uploadImages/UploadImages";
import CalendarImg from "../../assets/images/kalendarImg.jpg";
import PopUpDetails from "./PopUpDetails";
import { connect } from "react-redux";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
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

  componentDidMount() {
    if (this.props.location.file) {
      this.setState({
        file: this.props.location.file
      });
    }
  }

  nextPage = () => {
    this.props.getPhotos(this.state.file);
    this.props.history.push("/photoCalendar");
  };

  isPickedPhotos = data => {
    this.setState({
      isPicked: data
    });
  };

  render() {
    return (
      <div className="calendarPage">
        <div className="container" style={{ position: "relative" }}>
          <div onClick={this.toggleDetails} className="papper_btn_question">
            <FontAwesomeIcon icon={faQuestionCircle} />
            {this.state.detailsToggle ? (
              <PopUpDetails visible={this.toggleDetails} />
            ) : null}
          </div>
        </div>
        <UploadImages
          sendFileProps={
            this.props.location.file ? this.props.location.file : null
          }
          updatePhotos={this.GetPhotoFromChildComponent}
          files={this.state.file}
          isPicked={data => this.isPickedPhotos(data)}
        />
        <div className="myCustomOrder">
          <div className="container">
            <p className="ponuda">
              Nova Foto Kalendar Akcija! Izaberite i čekirajte fotografije za čak pet kalendara formata 30x40cm za samo 1000din.
            </p>
            <div className="kalendarImg_wrapper">
              <p>A3, A4</p>
              <img
                className="kalendarImg"
                src={CalendarImg}
                alt="calendarImage"
              />
            </div>
            {this.state.file.length > 0 && this.state.isPicked === true ? (
              <div className="btnForNext_wrapper">
                <div className="btnForNext" onClick={this.nextPage}>
                  {/* <Link
                  to={{
                    pathname: "photoCalendar",
                    state: this.state.file
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: file => {
      dispatch({
        type: "GET_STATE_CALENDAR",
        file: file
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(CalendarPage);
