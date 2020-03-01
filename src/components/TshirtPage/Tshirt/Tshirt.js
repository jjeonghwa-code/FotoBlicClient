import React, { Component } from "react";
import "../../../globalStyle.css";
import "./tShirtStyle.css";
import SliderForTshirt from "./SliderForTshirt/SliderForTshirt";
import TshirtForm from "../TshirtForm/TshirtForm";
import axios from "axios";
import SuccesPopUp from "../TshirtForm/SuccesPopUp";
import PopUpDetails from "./PopUpDetails";
import { Link } from "react-router-dom";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "../TshirtForm/TshirtForm";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faQuestionCircle,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";

class Tshirt extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      popUpStatus: false,
      succesPopUp: false, //Klikom na naruci otvara se success popup ako je porudzbina uspela
      responsePopUp: "", // Dodavanje u state odgovor sa back-end-a, da li je porudzbina uspela ili moraju da se popune sva polja pa da se posalje opet
      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      fullName: null,
      phoneNumber: null,
      address: null,
      email: null,
      delivery: null,
      city: null,
      file: this.props.location.file,
      side: null,
      format_id: null,
      quantity: null,
      product: null,
      price: 990,
      text: null,
      detailsToggle: true,
      disabledButton: false,
      showLoader: false,
      uploadProgress: 0
    };
  }

  setNaruciButtonStatus = status => {
    this.setState({
      disabledButton: status
    });
  };

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/photoTshirt`)
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

    let photosToSendTshirts = this.props.location.file.map(function(el, i) {
      if (typeof el == "object") el = el.fullUrl;
      return el;
    });

    if (this.props.location.file.length < 10000) {
      console.log(city);
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/photoTshirt",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            email: email,
            delivery: this.state.delivery,
            format_id: this.state.format_id,
            quantity: this.state.quantity,
            file: photosToSendTshirts,
            side: this.state.side,
            total_price: this.state.price * this.state.quantity,
            text: this.state.text,
            firstRequest: true
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
      let n = Math.floor(this.props.location.file.length / 20);
      let r = this.props.location.file.length % 20;

      for (let i = 0; i <= n; i++) {
        let slicedPhotosToSend = 0;

        if (i != n)
          slicedPhotosToSend = this.props.location.file.slice(
            i * 20,
            i * 20 + 20
          );
        else
          slicedPhotosToSend = this.props.location.file.slice(
            n * 20,
            n * 20 + r
          );

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/photoTshirt", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              address: address,
              city: city,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: slicedPhotosToSend,
              side: this.state.side,
              total_price: this.state.price * this.state.quantity,
              text: this.state.text,
              firstRequest: firstRequest
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
            .post("https://cms.fotoblicurosevic.rs/api/photoTshirt", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              address: address,
              city: city,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: slicedPhotosToSend,
              side: this.state.side,
              total_price: this.state.price * this.state.quantity,
              text: this.state.text,
              firstRequest: firstRequest
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

  GetDataFromSliderForShirtComponent = (side, format, quantity) => {
    // Uzimamo podatke iz child komponente "SliderForTshirt" (side, quantity, format) smestamo ih u state "side,format_id,quantity"
    this.setState({
      side: side,
      format_id: format,
      quantity: quantity
    });
  };

  // GetFullNameFromChildComponent = fullname => {
  //   // Uzimamo podatke (fullname) koji su upisani u komponentu "TshirtForm" i smestamo ih u state
  //   this.setState({
  //     fullName: fullname
  //   });
  // };

  // GetPhoneNumberFromChildComponent = phoneNumber => {
  //   // Uzimamo podatke (phoneNumber) koji su upisani u komponentu "TshirtForm" i smestamo ih u state
  //   this.setState({
  //     phoneNumber: phoneNumber
  //   });
  // };

  // GetAddressFromChildComponent = address => {
  //   // Uzimamo podatke (address) koji su upisani u komponentu "TshirtForm" i smestamo ih u state
  //   this.setState({
  //     address: address
  //   });
  // };

  // GetEmailFromChildComponent = email => {
  //   // Uzimamo podatke (email) koji su upisani u komponentu "TshirtForm" i smestamo ih u state
  //   this.setState({
  //     email: email
  //   });
  // };

  GetDeliveryFromChildComponent = delivery => {
    // Uzimamo podatke (delivery) koji su upisani u komponentu "TshirtForm" i smestamo ih u state
    this.setState({
      delivery: delivery
    });
  };

  setText = e => {
    this.setState({ text: e.target.value }); // Tekst za majicu se upisuje u state (text)
  };

  openPopup = e => {
    e.preventDefault();
    this.setState({
      popUpStatus: true
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

  closeSuccess = visible => {
    this.setState({
      succesPopUp: visible
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

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  render() {
    const total_price = this.state.price * this.state.quantity;
    return (
      <div className="tshirt_component">
        {this.state.detailsToggle ? (
          <PopUpDetails visible={this.toggleDetails} />
        ) : null}
        <div className="container">
          <div className="tshirt_content">
            <h2 className="firstTitlechoosePhotos">
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
            <div className="tshirt_content_bottom">
              <div className="tshirt_content_bottom_left">
                <p className="textarea_decoration">
                  Želite natpis na majici?
                  <br /> Upišite ga ovde:
                </p>
                <textarea maxLength="50" onChange={this.setText.bind(this)} />
              </div>
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
              <div className="tshirt_content_bottom_right">
                <SliderForTshirt
                  passUploadImagesToSlider={this.state.file}
                  getDataForPostRequest={(side, format, quantity) =>
                    this.GetDataFromSliderForShirtComponent(
                      side,
                      format,
                      quantity
                    )
                  }
                />
              </div>
            </div>
            <div className="tshirt_content_price">
              <h3 className="ukupnaCena">Ukupna cena:</h3>
              <p className="price">
                {total_price},00 <span>RSD</span>
              </p>
            </div>
          </div>
        </div>
        {this.state.popUpStatus ? (
          <TshirtForm
            product={this.state.product}
            format={this.state.format_id}
            quantity={this.state.quantity}
            totalPrice={total_price}
            updateEmail={this.GetEmailFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateFullname={this.GetFullNameFromChildComponent}
            updateDelivery={this.GetDeliveryFromChildComponent}
            callbackclosepopup={this.closePopup}
            sendData={this._handleSubmit}
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
                    pathname: "/photoTshirtUploadImages",
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

export default Tshirt;
