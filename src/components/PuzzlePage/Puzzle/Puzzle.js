import React, { Component } from "react";
import axios from "axios";
import "../../../globalStyle.css";
import "./puzzleStyle.css";
import PuzzleForm from "../PuzzleForm/PuzzleForm";
import SuccesPopUp from "../PuzzleForm/SuccesPopUp";
import PopUpDetails from "./PopUpDetails";
import { Link } from "react-router-dom";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "../PuzzleForm/PuzzleForm";

import { connect } from "react-redux";
//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faQuestionCircle,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";

import SliderForPuzzle from "../SliderForPuzzle/SliderForPuzzle";

let photosToSend = [];
let totalPriceToSend;

class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      activeDropdown: false,
      popUpStatus: false,
      product: null,
      imgIndex: 1,
      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      fullName: null,
      phoneNumber: null,
      address: null,
      email: null,
      city: null,
      delivery: null,
      articles: [],
      file: this.props.photos,
      cupLimitPopUpVisible: true,
      succesPopUp: false,
      responsePopUp: "",
      detailsToggle: true,
      disabledButton: false,
      showLoader: false,
      uploadProgress: 0
    };
  }

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/Page_Photo_Puzzle`)
      .then(res => {
        this.setState({
          product: res.data[1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  async _handleSubmit() {
    this.setState({
      showLoader: true
    });

    if (photosToSend.length < 10000) {
      console.log(city)
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/Page_Photo_Puzzle",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            email: email,
            delivery: this.state.delivery,
            product: this.state.product,
            articles: photosToSend,
            total_price: totalPriceToSend,
            firstRequest: true,
            photosBase64: this.props.photosBase64
          },
          {
            onUploadProgress: progressEvent => {
              if (this.unmounted) return;

              this.setState({
                uploadProgress: Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                )
              });
            }
          }
        )
        .then(res => {
          if (this.unmounted) return;

          this.setState({
            succesPopUp: true,
            responsePopUp: res,
            showLoader: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let n = Math.floor(photosToSend.length / 1);
      let r = photosToSend.length % 1;

      for (let i = 0; i <= n; i++) {
        var slicedPhotosToSend = 0;

        if (i != n) slicedPhotosToSend = photosToSend.slice(i * 1, i * 1 + 1);
        else slicedPhotosToSend = photosToSend.slice(n * 1, n * 1 + r);

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Puzzle", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              city: city,
              address: address,
              email: email,
              delivery: this.state.delivery,
              product: this.state.product,
              articles: slicedPhotosToSend,
              total_price: totalPriceToSend,
              firstRequest: firstRequest,
              photosBase64: this.props.photosBase64
            })
            .then(res => {
              if (this.unmounted) return;

              this.setState({
                succesPopUp: true,
                responsePopUp: res,
                showLoader: false
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          firstRequest = false;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Puzzle", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              city: city,
              address: address,
              email: email,
              delivery: this.state.delivery,
              product: this.state.product,
              articles: slicedPhotosToSend,
              total_price: totalPriceToSend,
              firstRequest: firstRequest,
              photosBase64: this.props.photosBase64
            })
            .then(res => {
              if (this.unmounted) return;

              this.setState({
                succesPopUp: true,
                responsePopUp: res,
                showLoader: false
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }

  GetPhotoFromChildComponent = file => {
    // Uzimamo slike koje su izabrane na komponenti UploadImages i smestamo ih u state "file"
    this.setState({
      file: file
    });
  };

  // GetFullNameFromChildComponent = fullname => {
  //   // Uzimamo podatke (fullname) koji su upisani u komponentu "Form" i smestamo ih u state
  //   this.setState({
  //     fullName: fullname
  //   });
  // };

  // GetPhoneNumberFromChildComponent = phoneNumber => {
  //   // Uzimamo podatke (phoneNumber) koji su upisani u komponentu "Form" i smestamo ih u state
  //   this.setState({
  //     phoneNumber: phoneNumber
  //   });
  // };

  // GetAddressFromChildComponent = address => {
  //   // Uzimamo podatke (address) koji su upisani u komponentu "Form" i smestamo ih u state
  //   this.setState({
  //     address: address
  //   });
  // };

  // GetEmailFromChildComponent = email => {
  //   // Uzimamo podatke (email) koji su upisani u komponentu "Form" i smestamo ih u state
  //   this.setState({
  //     email: email
  //   });
  // };

  GetDeliveryFromChildComponent = delivery => {
    // Uzimamo podatke (delivery) koji su upisani u komponentu "Form" i smestamo ih u state
    this.setState({
      delivery: delivery
    });
  };

  GetPhotosAndDataFromChildComponent = (photosAndData, price) => {
    // Uzimamo podatke (sve slike koje su ubacene sa podacima o kolicini i formatu o svakoj slici posebno) koji su upisani u komponentu "ItemNumberOfPhotos" i smestamo ih u state

    // photosToSend = photosAndData;

    photosToSend = photosAndData.map(function(el, i) {
      if (typeof el[0] == "object") el[0] = el[0].fullUrl;
      return el;
    });

    totalPriceToSend = price;
    document.getElementById("totalPrice").innerHTML = totalPriceToSend;
  };

  getDatapopUp = popUp => {
    this.setState({
      succesPopUp: popUp
    });
  };

  openPopup = e => {
    e.preventDefault();
    this.setState({
      popUpStatus: true,
      photosToSend: photosToSend
    });
    let body = document.querySelector("body");
    body.className = "over";
  };

  closePopup = () => {
    this.setState({
      popUpStatus: false
    });
    let body = document.querySelector("body");
    body.className = "overAuto";
  };

  closeForm = visible => {
    this.setState({
      popUpStatus: visible
    });
  };

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  closeSuccess = visible => {
    this.setState({
      succesPopUp: visible
    });
  };

  setNaruciButtonStatus = status => {
    this.setState({
      disabledButton: status
    });
  };

  render() {
    return (
      <div className="puzzle_component">
        {this.state.succesPopUp ? (
          <SuccesPopUp
            successpopupVisible={() => this.getDatapopUp()}
            responsePopUp={this.state.responsePopUp}
            succesPopUp={this.state.succesPopUp}
            formVisible={() => this.closeForm()}
            popUpStatus={this.state.popUpStatus}
            closeSuccess={() => this.closeSuccess()}
            setNaruciButtonStatus={this.setNaruciButtonStatus}
          />
        ) : null}
        <div className="container">
          <div className="puzzle_wrapper">
            <h2>
              Odabrane fotografije:
              <div
                className="questionIconInComponent"
                onClick={this.toggleDetails}
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
                {this.state.detailsToggle ? (
                  <PopUpDetails visible={this.toggleDetails} />
                ) : null}
              </div>
            </h2>
            <div className="puzzle_content">
              <div className="puzzle_price_div">
                <h3>Ukupna cena:</h3>
                <p className="price">
                  <span id="totalPrice" />

                  <span className="priceValute">,00 RSD</span>
                </p>
              </div>
              <SliderForPuzzle
                sendPhotosAndData={(art, price) =>
                  this.GetPhotosAndDataFromChildComponent(art, price)
                }
              />
            </div>
          </div>
        </div>
        {this.state.popUpStatus ? (
          <PuzzleForm
            sendPhotosToSend={this.state.photosToSend}
            sendTotalPrice={totalPriceToSend}
            callbackclosepopup={this.closePopup}
            product={this.state.product}
            sendData={this._handleSubmit}
            updateEmail={this.GetEmailFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateFullname={this.GetFullNameFromChildComponent}
            updateDelivery={this.GetDeliveryFromChildComponent}
            setNaruciButtonStatus={this.setNaruciButtonStatus}
            disabledButton={this.state.disabledButton}
            showLoader={this.state.showLoader}
            uploadProgress={this.state.uploadProgress}
          />
        ) : (
          ""
        )}
        <div>
          <div className="container">
            <div className="next_prev_buttons">
              <div className="back next_prev">
                <span>
                  <FontAwesomeIcon icon={faAngleDoubleLeft} color="#fff" />
                </span>
                <Link
                  to={{
                    pathname: "/photoPuzzleUploadImages",
                    file: this.state.file
                  }}
                >
                  Nazad
                </Link>
              </div>
              <div className="next next_prev" onClick={this.openPopup}>
                <span>
                  <FontAwesomeIcon icon={faCheck} color="#fff" />
                </span>
                Potvrdi
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.getPhotos,
    photosBase64: state.getBase64
  };
};

export default connect(mapStateToProps)(Puzzle);
