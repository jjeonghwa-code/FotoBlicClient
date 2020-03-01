import React, { Component } from "react";
import "../../../globalStyle.css";
import "../Book/bookStyle.css";
import UploadImages from "../../uploadImages/UploadImages";
import { Link } from "react-router-dom";
import BookLimitPopUp from "../BookLimitPopUp";
import PopUpDetails from "../ChooseFotobook/PopUpDetails";
import DesignBookPopUp from "./DesignBookPopUp/DesignBookPopUp";
// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { imageIndex } from "../ChooseFotobook/DesignBookPopUp/DesignBookPopUp";
import { useSrcAttr } from "../ChooseFotobook/DesignBookPopUp/DesignBookPopUp";
class ChooseFotobook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookFormat: null,
      file: [],
      visible: true,
      numberPhotos: 0,
      price: null,
      detailsToggle: true,
      isPicked: false,
      renderPage: false
      // designPopUp: false
    };
  }

  componentWillMount(){

    if(window.location.href.indexOf("insta") > -1 || window.location.href.indexOf("access_token") > -1){
      this.setState({
        renderPage: true
      })
    }
  }

  componentDidMount() {

    if(this.props.format){
      if (this.props.format) {
        this.useFormatBook(this.props.format);
        if (this.props.file) {
          this.setState({
            file: this.props.file
          });
        }
      }
    }
    
  }

  // openDesignPopUpVisible = () => {
  //   this.setState({
  //     designPopUp: true
  //   });
  // };

  // closeDesignPopUpVisible = visible => {
  //   this.setState({
  //     designPopUp: visible
  //   });
  // };

  GetPhotoFromChildComponent = file => {
    // Uzimamo slike koje su izabrane na komponenti UploadImages i smestamo ih u state "file"
    this.setState({
      file: file
    });
  };

  useFormatBook = format => {
    let price = null;
    let numberOfUploadedPhoto;
    let book1 = document.querySelector(".book1");
    let book2 = document.querySelector(".book2");
    let book3 = document.querySelector(".book3");
    let book4 = document.querySelector(".book4");
    if (format === "23") {
      price = 4850;
      numberOfUploadedPhoto = 70;
    } else if (format === "24") {
      price = 2900;
      numberOfUploadedPhoto = 40;
    } else {
      price = 1740;
      numberOfUploadedPhoto = 20;
    }
    this.setState({
      bookFormat: format,
      file: [],
      price: price,
      numberOfUploadedPhoto: numberOfUploadedPhoto
    });
    if (format === "23") {
      book1.className += " myClass";
    } else {
      book1.className = "fotobook_div_box book1";
    }

    if (format === "24") {
      book2.className += " myClass";
    } else {
      book2.className = "fotobook_div_box book2";
    }

    if (format === "25") {
      book3.className += " myClass";
    } else {
      book3.className = "fotobook_div_box book3";
    }

    if (format === "26") {
      book4.className += " myClass";
    } else {
      book4.className = "fotobook_div_box book4";
    }
  };

  resetFiles = () => {
    this.setState({
      file: []
    });
  };

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  isPickedPhotos = (data) => {
    this.setState({
      isPicked: data
    })
  }

  render() {
    let photoReminder =
      this.state.numberOfUploadedPhoto - this.state.file.length;
    return (
      <div className="chooseFotobook">
        <div className="container">
          <div>
            <h2 className="odaberiFotobook">
              Odaberite Fotobook:
              <div onClick={this.toggleDetails} className="book_btn_question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                {this.state.detailsToggle ? (
                  <PopUpDetails visible={this.toggleDetails} />
                ) : null}
              </div>
            </h2>
          </div>
          <div className="chooseFotobook_wrapper">
            <div className="chooseFotobook_content">
              {this.state.bookFormat === "23" &&
              this.state.file.length >= 71 ? (
                <BookLimitPopUp
                  resetFiles={this.resetFiles}
                  visible={this.state.visible}
                  text="70"
                />
              ) : null}

              <div className="fotobook_div">
                <div
                  className="fotobook_div_box book1"
                  onClick={() => this.useFormatBook("23")}
                >
                </div>
                <div className="fotobook_div_text">
                  <h3>BOOK A4</h3>
                  <p className="side_photos">
                    <span>20 strana</span>, 70 fotografija
                  </p>
                  <p className="price">4.850,00 dinara</p>
                </div>
              </div>
              {this.state.bookFormat === "24" &&
              this.state.file.length >= 41 ? (
                <BookLimitPopUp
                  resetFiles={this.resetFiles}
                  visible={this.state.visible}
                  text="40"
                />
              ) : null}
              <div className="fotobook_div">
                <div
                  className="fotobook_div_box book2"
                  onClick={() => this.useFormatBook("24")}
                >
                </div>
                <div className="fotobook_div_text">
                  <h3>BOOK A5</h3>
                  <p className="side_photos">
                    <span>10 strana</span>, 40 fotografija
                  </p>
                  <p className="price">2.900,00 dinara</p>
                </div>
              </div>
              {this.state.bookFormat === "25" &&
              this.state.file.length >= 21 ? (
                <BookLimitPopUp
                  resetFiles={this.resetFiles}
                  visible={this.state.visible}
                  text="20"
                />
              ) : null}
              <div className="fotobook_div">
                <div
                  className="fotobook_div_box book3"
                  onClick={() => this.useFormatBook("25")}
                >
                </div>
                <div className="fotobook_div_text">
                  <h3>BOOK A4</h3>
                  <p className="side_photos">
                    <span>5 strana</span>, 20 fotografija
                  </p>
                  <p className="price">1.740,00 dinara</p>
                </div>
              </div>
              {this.state.bookFormat === "26" &&
              this.state.file.length >= 11 ? (
                <BookLimitPopUp
                  resetFiles={this.resetFiles}
                  visible={this.state.visible}
                  text="10"
                />
              ) : null}
              <div className="fotobook_div">
                <div
                  className="fotobook_div_box book4"
                  onClick={() => this.useFormatBook("26")}
                >
                </div>
                <div className="fotobook_div_text">
                  <h3>BOOK NA AKCIJI</h3>
                  <p className="side_photos">
                    <span>10 fotografija</span>
                  </p>
                  <p className="price">1.290,00 dinara</p>
                </div>
              </div>
            </div>
            <div className="popuniNaredniBook">
              <p className="popuniNaredniBook_spans">
                <span>
                  {this.state.bookFormat !== null ? "BOOK " : ""}
                  {this.state.bookFormat}
                </span>
              </p>
              {/* {this.state.bookFormat !== null ? (
                <button
                  className="izaberiRam"
                  onClick={this.openDesignPopUpVisible}
                >
                  Izaberite ram za album
                </button>
              ) : null} */}
              {/* <div className="yourFrame">
                {useSrcAttr === null ? null : (
                  <img src={useSrcAttr} alt="frame" />
                )}
              </div> */}
              {/* {this.state.designPopUp ? (
                <DesignBookPopUp
                  closeDesignPopUpVisible={this.closeDesignPopUpVisible}
                />
              ) : null} */}
              {this.state.file.length > 0 ? (
                <p className="fotoBook_addMore">
                  Dodajte još
                  {this.state.file.length ? (
                    <span className="color_red myMargin">{photoReminder}</span>
                  ) : (
                    <span className="color_red" />
                  )}
                  fotografija kako biste popunili album.
                </p>
              ) : null}
            </div>
          </div>
        </div>
        {this.state.bookFormat !== null || this.state.renderPage === true ? (
          <div id="goToUpload">
            <UploadImages
              updatePhotos={this.GetPhotoFromChildComponent}
              files={this.state.file}
              sendFileProps={this.state.file ? this.state.file : null}
              isPicked={(data) => this.isPickedPhotos(data)}
            />
          </div>
        ) : null}

        {/* Za format "A4-70 fotografija" dugme dalje se prikazuje u zavisnosti od datog uslova */}
        {this.state.bookFormat === "23" &&
        this.state.file.length > 0 &&
        this.state.file.length < 71 && this.state.isPicked === true  ? (
          <div className="btnForNext_wrapper">
            <div className="btnForNext">
              <Link
                to={{
                  pathname: "/photoBook",
                  state: this.state.file,
                  bookFormat: this.state.bookFormat,
                  price: this.state.price,
                  format: this.state.bookFormat
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link>
            </div>
          </div>
        ) : null}
        {/* Za format "A5" dugme dalje se prikazuje u zavisnosti od datog uslova */}
        {this.state.bookFormat === "24" &&
        this.state.file.length > 0 &&
        this.state.file.length < 41 && this.state.isPicked === true  ? (
          <div className="btnForNext_wrapper">
            <div className="btnForNext">
              <Link
                to={{
                  pathname: "/photoBook",
                  state: this.state.file,
                  bookFormat: this.state.bookFormat,
                  price: this.state.price,
                  format: this.state.bookFormat
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link>
            </div>
          </div>
        ) : null}
        {/* Za format "A4-20 fotografija" dugme dalje se prikazuje u zavisnosti od datog uslova */}
        {this.state.bookFormat === "25" &&
        this.state.file.length > 0 &&
        this.state.file.length < 21 && this.state.isPicked === true  ? (
          <div className="btnForNext_wrapper">
            <div className="btnForNext">
              <Link
                to={{
                  pathname: "/photoBook",
                  state: this.state.file,
                  bookFormat: this.state.bookFormat,
                  price: this.state.price,
                  format: this.state.bookFormat
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link>
            </div>
          </div>
        ) : null}
        {/* Za format "NA AKICI" dugme dalje se prikazuje u zavisnosti od datog uslova */}
        {this.state.bookFormat === "26" &&
        this.state.file.length > 0 &&
        this.state.file.length < 11 && this.state.isPicked === true ? (
          <div className="btnForNext_wrapper">
            <div className="btnForNext">
              <Link
                to={{
                  pathname: "/photoBook",
                  state: this.state.file,
                  bookFormat: this.state.bookFormat,
                  price: this.state.price
                }}
              >
                Dalje
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ChooseFotobook;
