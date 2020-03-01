import React, { Component } from "react";
import axios from "axios";
import "../../../globalStyle.css";
import "./calendarStyle.css";
import SliderForCalendar from "../SliderForCalendar/SliderForCalendar";
import CalendarForm from "../CalendarForm/CalendarForm";
import SuccesPopUp from "../CalendarForm/SuccesPopUp";
import PopUpDetails from "../Calendar/PopUpDetails";
import { Link } from "react-router-dom";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "../CalendarForm/CalendarForm";
import { connect } from "react-redux";
//Image

import AkcijaImg from "../../../assets/images/akcija.png";

// fa
import { imageIndex } from "../DesignCalendarPopUp/DesignCalendarPopUp";
import { useSrcAttr } from "../DesignCalendarPopUp/DesignCalendarPopUp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
let photosToSend = [];
let totalPriceToSend;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      activeDropdown: false,
      popUpStatus: false,
      succesPopUp: false, //Klikom na naruci otvara se success popup ako je porudzbina uspela
      responsePopUp: "", // Dodavanje u state odgovor sa back-end-a, da li je porudzbina uspela ili moraju da se popune sva polja pa da se posalje opet
      recivedPhotos: null,
      photosToSend: null,
      detailsToggle: true,
      disabledButton: false,
      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      city: null,
      fullName: null,
      phoneNumber: null,
      address: null,
      email: null,
      delivery: null,
      product: null,
      file: this.props.photos,
      articles: [],
      totalPrice: null,
      showLoader: false,
      uploadProgress: 0
    };
  }

  setNaruciButtonStatus = status => {
    this.setState({
      disabledButton: status
    });
  };

  getDatapopUp = popUp => {
    this.setState({
      succesPopUp: popUp
    });
  };

  // GetFullNameFromChildComponent = fullname => {
  //   // Uzimamo podatke (fullname) koji su upisani u komponentu "CalendarForm" i smestamo ih u state
  //   this.setState({
  //     fullName: fullname
  //   });
  // };

  // GetPhoneNumberFromChildComponent = phoneNumber => {
  //   // Uzimamo podatke (phoneNumber) koji su upisani u komponentu "CalendarForm" i smestamo ih u state
  //   this.setState({
  //     phoneNumber: phoneNumber
  //   });
  // };

  // GetAddressFromChildComponent = address => {
  //   // Uzimamo podatke (address) koji su upisani u komponentu "CalendarForm" i smestamo ih u state
  //   this.setState({
  //     address: address
  //   });
  // };

  // GetEmailFromChildComponent = email => {
  //   // Uzimamo podatke (email) koji su upisani u komponentu "CalendarForm" i smestamo ih u state
  //   this.setState({
  //     email: email
  //   });
  // };

  GetDeliveryFromChildComponent = delivery => {
    // Uzimamo podatke (delivery) koji su upisani u komponentu "CalendarForm" i smestamo ih u state
    this.setState({
      delivery: delivery
    });
  };

  GetPhotosAndDataFromChildComponent = (photosAndData, price) => {
    // photosToSend = photosAndData; // Iz child komponente uzimamo promenljivu u koju su smesteni svi podaci o slikama, i smestamo u promenljivu photosToSend

    photosToSend = photosAndData.map(function(el, i) {
      if (typeof el[0] == "object") el[0] = el[0].fullUrl;
      return el;
    });

    totalPriceToSend = price;

    /////////// izracunavanje akcije, ukoliko korisnik naruci 2 kalendara istog formata, treci dobija za 1 dinar
    let i;

    let quantity_A3 = 0;
    let quantity_A4 = 0;
    let discount_A3;
    let discount_A4;

    for (i = 0; i < photosAndData.length; i++) {
      if (photosAndData[i][1] == "21") {
        quantity_A3 += photosAndData[i][2];
      } else if (photosAndData[i][1] == "22") {
        quantity_A4 += photosAndData[i][2];
      }
    }
    discount_A3 = Math.floor(quantity_A3 / 3);
    totalPriceToSend -= discount_A3 * 399;

    discount_A4 = Math.floor(quantity_A4 / 3);
    totalPriceToSend -= discount_A4 * 299;

    document.getElementById("totalPrice").innerHTML =
      totalPriceToSend + ",00 RSD";
  };

  openPopup = e => {
    this.setState({
      popUpStatus: true,
      photosToSend: photosToSend,
      totalPrice: totalPriceToSend
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

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/calendarPage`)
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

    if (this.state.photosToSend.length < 10000) {
      console.log(city);
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/calendarPage",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            email: email,
            delivery: this.state.delivery,
            product: this.state.product,
            articles: this.state.photosToSend,
            total_price: totalPriceToSend,
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
      let n = Math.floor(this.state.photosToSend.length / 1);
      let r = this.state.photosToSend.length % 1;

      for (let i = 0; i <= n; i++) {
        let slicedPhotosToSend = 0;

        if (i != n)
          slicedPhotosToSend = this.state.photosToSend.slice(i * 1, i * 1 + 1);
        else
          slicedPhotosToSend = this.state.photosToSend.slice(n * 1, n * 1 + r);

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/calendarPage", {
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
            .post("https://cms.fotoblicurosevic.rs/api/calendarPage", {
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

  render() {
    return (
      <div className="calendar_component">
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
          {this.state.detailsToggle ? (
            <PopUpDetails visible={this.toggleDetails} />
          ) : null}
          <div className="calendar_component_content">
            <div className="calendar_component_content_left">
              <div className="ukupnaCena">
                <h3>Ukupna Cena:</h3>
                <p id="totalPrice" className="price">
                  <span>RSD</span>
                </p>
              </div>
              <img className="action_img" src={AkcijaImg} alt="akcija" />
              <p className="naruci">
                Naručite dva kalendara istog formata i treći dobijate za 1
                dinar.
              </p>
            </div>
            <div className="calendar_component_content_right">
              <SliderForCalendar
                sendPhotosAndData={(art, price) =>
                  this.GetPhotosAndDataFromChildComponent(art, price)
                }
              />
            </div>
          </div>
        </div>
        {this.state.popUpStatus ? (
          <CalendarForm
            sendPhotosToSend={this.state.photosToSend}
            sendTotalPrice={this.state.totalPrice}
            callbackclosepopup={this.closePopup}
            product={this.state.product}
            sendData={this._handleSubmit}
            updateDelivery={this.GetDeliveryFromChildComponent}
            updateFullname={this.GetFullNameFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updateEmail={this.GetEmailFromChildComponent}
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
                    pathname: "/photoCalendarUploadImages",
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

export default connect(mapStateToProps)(Calendar);
