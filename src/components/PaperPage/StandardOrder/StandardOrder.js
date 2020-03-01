import React, { Component } from "react";
import "../../../globalStyle.css";
import "./StandardOrderStyle.css";
import { Link } from "react-router-dom";
import SliderForStandardOrder from "./SliderForStandardOrder/SliderForStandardOrder";
import StandardForm from "./StandardForm/StandardForm";
import axios from "axios";
import PopUpDetails from "./PopUpDetails";
import SuccesPopUp from "./StandardForm/SuccesPopUp";
import { Redirect } from "react-router-dom";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "./StandardForm/StandardForm";
import { connect } from "react-redux";
// Images

import ActionImg from "../../../assets/images/akcija.png";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

let photosToSend = [];
let format_id = "1"; //9x13
let price = 14;
let totalPrice = 0;
let quantityForSendInForm = 0;

class StandardOrder extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      activeDropdown: false,
      popUpStatus: false, // StandardForm visible
      fullname: null,
      phoneNumber: null,
      city: null,
      address: null,
      email: null,
      delivery: null,
      price: 14,
      file: this.props.photos,
      product: null,
      detailsToggle: true,
      photosToSend: null,
      formatToSend: null,
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
      .get(`https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji format slike moze korisnik da izabere prilikom narudzbine
      .then(res => {
        this.setState({
          format: res.data[0],
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
    if (totalPrice === 0) {
      totalPrice = photosToSend.length * 14;
    }

    if (photosToSend.length < 10000) {
      console.log('sss', city)
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            email: email,
            delivery: this.state.delivery,
            product: this.state.product,
            format_id: this.state.formatToSend,
            articles: photosToSend,
            total_price: totalPrice,
            firstRequest: true,
            photosBase64: this.props.photosBase64
          },
          {
            onUploadProgress: progressEvent => {
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
        let slicedPhotosToSend = 0;

        if (i != n) slicedPhotosToSend = photosToSend.slice(i * 1, i * 1 + 1);
        else slicedPhotosToSend = photosToSend.slice(n * 1, n * 1 + r);

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post(
              "https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper",
              {
                fullname: fullname,
                phoneNumber: phoneNumber,
                city: city,
                address: address,
                email: email,
                delivery: this.state.delivery,
                product: this.state.product,
                format_id: this.state.formatToSend,
                articles: slicedPhotosToSend,
                total_price: totalPrice,
                firstRequest: firstRequest,
                photosBase64: this.props.photosBase64
              },
              {
                onUploadProgress: progressEvent => {
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
          firstRequest = false;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Paper", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              address: address,
              city: city,
              email: email,
              delivery: this.state.delivery,
              product: this.state.product,
              format_id: this.state.formatToSend,
              articles: slicedPhotosToSend,
              total_price: totalPrice,
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

  changeFormat = e => {
    // Kad dodje do promene formata koji korisnik izabere prilikom porudzbine, taj format se upise u globalnu promenljivu "format_id"

    format_id = e.target.value;
    document.getElementById("akcija").innerHTML = 100 - photosToSend.length;

    if (e.target.value === "1") {
      price = 14;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 14
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "2") {
      price = 17;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 17
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "3") {
      price = 24;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 24
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "4") {
      price = 35;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 35
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "5") {
      price = 180;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 180
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "6") {
      price = 350;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 350
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "7") {
      price = 350;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 350
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "8") {
      price = 790;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 790
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else if (e.target.value === "9") {
      price = 1290;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 1290
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    } else {
      price = 3100;
      totalPrice = price * this.state.file.length;
      this.setState({
        price: 3100
      });
      document.getElementById("totalPrice").innerHTML =
        price * this.state.file.length + ",00 RSD";
    }
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

  toggleDropdown = () => {
    let currrentDrop = this.state.activeDropdown;
    this.setState({
      activeDropdown: !currrentDrop
    });
  };

  openPopup = e => {
    e.preventDefault();
    this.setState({
      popUpStatus: true,
      formatToSend: format_id,
      photosToSend: photosToSend
    });
    quantityForSendInForm = this.props.photos.length;

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

  setPrice = quantity => {
    totalPrice = quantity * this.state.price;
    quantityForSendInForm = quantity;

    ///////////// Ako je cena akcijska promeni totalPrice
    if (format_id === "1") {
      if (quantity >= 100) {
        totalPrice = quantity * 9.9;
        totalPrice = totalPrice.toFixed(2);
      }
    } else if (format_id === "2") {
      if (quantity >= 100) {
        totalPrice = quantity * 10.9;
        totalPrice = totalPrice.toFixed(2);
      }
    } else if (format_id === "3") {
      if (quantity >= 100) {
        totalPrice = quantity * 16.9;
        totalPrice = totalPrice.toFixed(2);
      }
    }
    /////////////////

    if (100 - quantity > 0) {
      document.getElementById("akcija").innerHTML = 100 - quantity;
      document.getElementById("totalPrice").innerHTML = totalPrice + ",00 RSD";
      document.getElementById("ostvarenaAkcija").innerHTML = "";
    } else {
      document.getElementById("akcija").innerHTML = 0;
      document.getElementById("totalPrice").innerHTML = totalPrice + ",00 RSD";
      document.getElementById("ostvarenaAkcija").innerHTML =
        "Ostvarili ste Popust !";
    }
  };

  getPhotos = photos => {
    // Uzimaju se slike i podaci i kolicini iz child komponente i upisuju se u globalnu promenljivu photosToSend
    // photosToSend = photos;

    photosToSend = photos.map(function(el, i) {
      if (typeof el[0] == "object") el[0] = el[0].fullUrl;
      return el;
    });
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
      <div className="standardOrder_component">
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
            <h2 className="titleInComponent">
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
                <div className="selectDimension">
                  <p>Odaberite dimenziju:</p>
                  <div className="papperSelect_wrapper">
                    <select onChange={e => this.changeFormat(e)}>
                      {this.state.format &&
                        this.state.format.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="totalPrice">
                  <h3>Ukupna Cena:</h3>
                  <p id="totalPrice">
                    <span className="price">
                      {this.state.file
                        ? this.state.price * this.state.file.length
                        : null}
                      ,00
                    </span>
                    RSD
                  </p>
                </div>
                <div className="discount">
                  <img src={ActionImg} alt="Osvari_akciju" />
                  <p id="ostvarenaAkcija" />
                  <p>
                    Naručite još{" "}
                    <span id="akcija" className="color_red">
                      {this.state.file ? 100 - this.state.file.length : null}
                    </span>{" "}
                    fotografije i ostvarite popust!
                  </p>
                  <p id="ostvarena_p" />
                </div>
              </div>
              <div className="orderPhotos_right">
                <SliderForStandardOrder
                  sendPricePerPhoto={this.state.price}
                  getQuantity={quantity => this.setPrice(quantity)}
                  sendData={photo => this.getPhotos(photo)}
                  passPropsToStandardOrder={this.state.file}
                  sendFormat={format_id}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.popUpStatus ? (
          <StandardForm
            sendQuantity={quantityForSendInForm}
            product={this.state.product}
            format_id={this.state.formatToSend}
            total_price={
              totalPrice === 0
                ? this.state.price * this.props.photos.length
                : totalPrice
            }
            sendData={this._handleSubmit}
            updateFullname={this.GetFullNameFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateEmail={this.GetEmailFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updateDelivery={this.GetDeliveryFromChildComponent}
            callbackclosepopup={this.closePopUp}
            setNaruciButtonStatus={this.setNaruciButtonStatus}
            disabledButton={this.state.disabledButton}
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

export default connect(mapStateToProps)(StandardOrder);
