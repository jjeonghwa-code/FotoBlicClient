import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CombineForm from "./CombineForm/CombineForm";
import PopUpDetails from "./PopUpDetails";
import SliderForCombineOrder from "./SliderForCombineOrder/SliderForCombineOrder";
import SuccesPopUp from "./CombineForm/SuccesPopUp";
import { Redirect } from "react-router-dom";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "./CombineForm/CombineForm";
import { connect } from "react-redux";

//Images

import ActionImg from "../../../assets/images/akcija.png";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

let photosToSend = [];
let total_price = 0;

class CombineOrder extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      popUpStatus: false, // CombineForm visible
      file: this.props.photos,

      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      product: null, // Proizvod koji se cuva
      price: 14,
      fullName: null,
      phoneNumber: null,
      photosToSend: [],
      city: null,
      address: null,
      email: null,
      delivery: null,
      detailsToggle: true,
      succesPopUp: false,
      responsePopUp: "",
      disabledButton: false,
      showLoader: false,
      uploadProgress: 0
    };
  }

  redirect = () => {
    return <Redirect to="/photoPapperUploadImages" />;
  };

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper`)
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
      console.log("sss", city);
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper_Combine",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            email: email,
            delivery: this.state.delivery,
            product: this.state.product,
            articles: photosToSend,
            total_price: total_price,
            firstRequest: true,
            photosBase64: this.props.photosBase64
          },
          {
            onUploadProgress: progressEvent => {
              console.log("progressEvent", progressEvent);
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

          console.log("odgovor", res);
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
      console.log("kolko slike", photosToSend.length);
      let n = Math.floor(photosToSend.length / 1);
      console.log("n", n);
      let r = photosToSend.length % 1;
      console.log("r", r);

      for (let i = 0; i <= n; i++) {
        var slicedPhotosToSend = 0;

        if (i != n) slicedPhotosToSend = photosToSend.slice(i * 1, i * 1 + 1);
        else slicedPhotosToSend = photosToSend.slice(n * 1, n * 1 + r);

        console.log("i", i);
        console.log("slicedPhotosToSend", slicedPhotosToSend);

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post(
              "https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper_Combine",
              {
                fullname: fullname,
                phoneNumber: phoneNumber,
                city: city,
                address: address,
                email: email,
                delivery: this.state.delivery,
                product: this.state.product,
                articles: slicedPhotosToSend,
                total_price: total_price,
                firstRequest: firstRequest,
                photosBase64: this.props.photosBase64[i]
              }
            )
            .then(res => {
              if (this.unmounted) return;

              console.log("odgovor", res);
              // this.setState({
              //   succesPopUp: true,
              //   responsePopUp: res,
              //   showLoader: false
              // });
              if (n === i) {
                this.setState({
                  succesPopUp: true,
                  responsePopUp: res,
                  showLoader: false
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          firstRequest = false;

          await axios
            .post(
              "https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper_Combine",
              {
                fullname: fullname,
                phoneNumber: phoneNumber,
                city: city,
                address: address,
                email: email,
                delivery: this.state.delivery,
                product: this.state.product,
                articles: slicedPhotosToSend,
                total_price: total_price,
                firstRequest: firstRequest,
                photosBase64: this.props.photosBase64[i]
              }
            )
            .then(res => {
              if (this.unmounted) return;

              console.log("odgovor", res);
              // this.setState({
              //   succesPopUp: true,
              //   responsePopUp: res,
              //   showLoader: false
              // });
              if (n === i) {
                console.log("last request");
                this.setState({
                  succesPopUp: true,
                  responsePopUp: res,
                  showLoader: false
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }

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

  openPopup = e => {
    e.preventDefault();
    this.setState({
      popUpStatus: true,
      photosToSend: photosToSend
    });
    let body = document.querySelector("body");
    body.className = "over";
  };

  closePopUp = () => {
    this.setState({
      popUpStatus: false
    });
    let body = document.querySelector("body");
    body.className = "overAuto";
  };

  sendPhotosAndData = (data, price) => {
    photosToSend = data;

    photosToSend = photosToSend.map(function(el, i) {
      if (typeof el[0] == "object") el[0] = el[0].fullUrl;
      return el;
    });

    total_price = price;
    let i;

    let quantity_1 = 0;
    let quantity_2 = 0;
    let quantity_3 = 0;

    for (i = 0; i < data.length; i++) {
      if (data[i][1] == "1") {
        quantity_1 += data[i][2];
      } else if (data[i][1] == "2") {
        quantity_2 += data[i][2];
      } else if (data[i][1] == "3") {
        quantity_3 += data[i][2];
      }

      if (100 - quantity_1 > 0) {
        document.getElementById("akcija_1").innerHTML = 100 - quantity_1;
        document.getElementById("ostvarenaAkcija9x13").innerHTML = "";
      } else {
        document.getElementById("akcija_1").innerHTML = 0;
        document.getElementById("ostvarenaAkcija9x13").innerHTML =
          "Ostvarili ste popust za format 9x13 !";
      }

      if (100 - quantity_2 > 0) {
        document.getElementById("akcija_2").innerHTML = 100 - quantity_2;
        document.getElementById("ostvarenaAkcija10x15").innerHTML = "";
      } else {
        document.getElementById("akcija_2").innerHTML = 0;
        document.getElementById("ostvarenaAkcija10x15").innerHTML =
          "Ostvarili ste popust za format 10x15 !";
      }

      if (100 - quantity_3 > 0) {
        document.getElementById("akcija_3").innerHTML = 100 - quantity_3;
        document.getElementById("ostvarenaAkcija13x18").innerHTML = "";
      } else {
        document.getElementById("akcija_3").innerHTML = 0;
        document.getElementById("ostvarenaAkcija13x18").innerHTML =
          "Ostvarili ste popust za format 13x18 !";
      }
    }

    if (quantity_1 >= 100) {
      let price_without_discount = 14;
      let price_with_discount = 9.9;
      let discount = price_without_discount - price_with_discount;
      let new_price = quantity_1 * discount;
      total_price = total_price - new_price;
      total_price = total_price.toFixed(2);
    }

    if (quantity_2 >= 100) {
      let price_without_discount = 17;
      let price_with_discount = 10.9;
      let discount = price_without_discount - price_with_discount;
      let new_price = quantity_2 * discount;
      total_price = total_price - new_price;
      total_price = total_price.toFixed(2);
    }

    if (quantity_3 >= 100) {
      let price_without_discount = 24;
      let price_with_discount = 16.9;
      let discount = price_without_discount - price_with_discount;
      let new_price = quantity_3 * discount;
      total_price = total_price - new_price;
      total_price = total_price.toFixed(2);
    }
    document.getElementById("price").innerHTML = total_price + ",00 RSD";
  };

  getDatapopUp = popUp => {
    this.setState({
      succesPopUp: popUp
    });
  };

  closeForm = visible => {
    this.setState({
      popUpStatus: visible
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
      <div className="combineOrder_component">
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
        <div className="orderPhotos">
          <div className="container">
            <h2 className="titleInComponent titleInComponent_combineOrder">
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
            <div className="orderPhotos_holder">
              <div className="orderPhotos_left">
                <div className="selectDimension" />
                <div className="totalPrice">
                  <h3>Ukupna Cena:</h3>
                  <p id="totalPrice">
                    <span id="price" className="price">
                      {this.state.file
                        ? this.state.price * this.state.file.length
                        : this.redirect()}
                      ,00 RSD
                    </span>
                  </p>
                </div>
                <div className="discount">
                  <img src={ActionImg} alt="Osvari_akciju" />
                  <p id="ostvarenaAkcija9x13" />
                  <p>
                    Naručite još{" "}
                    <span className="color_red" id="akcija_1">
                      {this.state.file ? 100 - this.state.file.length : 0}
                    </span>{" "}
                    fotografije formata 9x13 i ostvarite popust!
                  </p>
                  <p id="ostvarenaAkcija10x15" />
                  <p>
                    Naručite još{" "}
                    <span className="color_red" id="akcija_2">
                      100
                    </span>{" "}
                    fotografije formata 10x15 i ostvarite popust!
                  </p>
                  <p id="ostvarenaAkcija13x18" />
                  <p>
                    Naručite još{" "}
                    <span className="color_red" id="akcija_3">
                      100
                    </span>{" "}
                    fotografije formata 13x18 i ostvarite popust!
                  </p>
                  <p id="ostvarena_p" />
                </div>
              </div>
              <div className="orderPhotos_right">
                <SliderForCombineOrder
                  passPropsToCombineOrder={this.state.file}
                  sendPhotosAndData={this.sendPhotosAndData}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.popUpStatus ? (
          <CombineForm
            product={this.state.product}
            total_price={
              total_price === 0
                ? this.state.price * this.state.file.length
                : total_price
            }
            sendFile={this.state.file}
            sendPhotosToSend={this.state.photosToSend}
            sendData={this._handleSubmit}
            updateFullname={this.GetFullNameFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateEmail={this.GetEmailFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updateDelivery={this.GetDeliveryFromChildComponent}
            callbackclosepopup={this.closePopUp}
            showLoader={this.state.showLoader}
            uploadProgress={this.state.uploadProgress}
          />
        ) : null}
        <div className="confirmButtons_wrapper">
          <div className="container">
            <div className="next_prev_buttons">
              <div className="back next_prev">
                <span>
                  <FontAwesomeIcon icon={faAngleDoubleLeft} color="#fff" />
                </span>
                <Link
                  to={{
                    pathname: "/photoPapperUploadImages",
                    file: this.state.file
                  }}
                >
                  Nazad
                </Link>
              </div>
              <div onClick={this.openPopup} className="next next_prev">
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

export default connect(mapStateToProps, null)(CombineOrder);
