import React, { Component } from "react";
import { Link } from "react-router-dom";
import UploadImages from "../uploadImages/UploadImages";
import PopUpDetails from "./PopUpDetails";
import {connect} from 'react-redux';
//Images

import PuzzleImg from "../../assets/images/puzzle.jpg";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

class PuzzlePage extends Component {
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
    this.props.history.push('/photoPuzzle');
  }

  isPickedPhotos = (data) => {
    this.setState({
      isPicked: data
    })
  }


  render() {
    return (
      <div className="puzzle_page">
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
          sendFileProps={
            this.props.location.file ? this.props.location.file : null
          }
          isPicked={(data) => this.isPickedPhotos(data)}
        />
        <div className="myCustomOrder">
          <div className="puzzle_images_holder">
            <div className="puzzle_images_box">
              <h4>A5</h4>
              <img src={PuzzleImg} alt="YourPuzzleImages" />
            </div>
            <div className="puzzle_images_box">
              <h4>A4</h4>
              <img src={PuzzleImg} alt="YourPuzzleImages" />
            </div>
          </div>
          {this.state.file.length > 0 && this.state.isPicked === true ? (
            <div className="btnForNext_wrapper">
              <div className="btnForNext" onClick={this.nextPage}>
                {/* <Link
                onClick={this.handleClick}
                  to={{
                    pathname: "/photoPuzzle",
                    state: this.state.file
                  }}
                >
                  Dalje
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Link> */}
                <button>Dalje<FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotos: (file) => {
      dispatch({
        type: 'GET_STATE_PUZZLE', file: file
      })
    }
  }
}

export default connect(null,mapDispatchToProps)(PuzzlePage);

