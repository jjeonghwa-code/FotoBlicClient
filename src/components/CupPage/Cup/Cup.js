import React, { Component } from "react";
import "../../../globalStyle.css";
import "./cupStyle.css";
import PopUpDetails from "../Cup/PopUpDetails";
import axios from "axios";
import { Link } from "react-router-dom";
import CupForm from "../CupForm/CupForm";
import {
  fullname,
  phoneNumber,
  address,
  email,
  city
} from "../CupForm/CupForm";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faQuestionCircle,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";

// Images

import SuccesPopUp from "../CupForm/SuccesPopUp";

let cupColor = null;

class Cup extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      activeDropdown: false,
      selectedCup: "Classic - Bela",
      popUpStatus: false,
      format: null, // Lista svih solja iz Baze (Classic - Bela, Sarena, Magicna)
      product: null,
      price: 550,
      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      fullName: null,
      phoneNumber: null,
      city: null,
      address: null,
      email: null,
      delivery: null,
      format_id: 11,
      quantity: 1,
      cupLimitPopUpVisible: true, //Dodavanje u state promenjivu koja prikazuje da li se limit popUp vidi ili ne
      succesPopUp: false, // Dodavanje u state promenjivu koja prikazuje da li se popUp za uspesnu porudzbinu vidi ili ne
      responsePopUp: "", // Dodavanje u state odgovor sa back-end-a, da li je porudzbina uspela ili moraju da se popune sva polja pa da se posalje opet
      recivedPhotos: null,
      text: null,
      detailsToggle: true,
      showLoader: false,
      disabledButton: false,
      uploadProgress: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.someValue !== this.props.someValue) {
      //Perform some operation
      this.setState({ recivedPhotos: true });
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
    cupColor = null;
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

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/Page_Photo_Cup`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji tip solje moze korisnik da izabere prilikom narudzbine
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

  async _handleSubmit() {
    this.setState({
      showLoader: true
    });

    let photosToSendCups = this.props.location.state.map(function(el, i) {
      if (typeof el == "object") el = el.fullUrl;
      return el;
    });

    if (this.props.location.state.length < 10000) {
      console.log("sss", city);
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/Page_Photo_Cup",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            city: city,
            delivery: this.state.delivery,
            format_id: this.state.format_id,
            quantity: this.state.quantity,
            file: photosToSendCups,
            total_price: this.state.price * this.state.quantity,
            text: this.state.text,
            firstRequest: true,
            cupColor: cupColor
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
      let n = Math.floor(this.props.location.state.length / 20);
      let r = this.props.location.state.length % 20;

      for (let i = 0; i <= n; i++) {
        let slicedPhotosToSend = 0;

        if (i != n)
          slicedPhotosToSend = this.props.location.state.slice(
            i * 20,
            i * 20 + 20
          );
        else
          slicedPhotosToSend = this.props.location.state.slice(
            n * 20,
            n * 20 + r
          );

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Cup", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              address: address,
              city: city,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: slicedPhotosToSend,
              total_price: this.state.price * this.state.quantity,
              text: this.state.text,
              firstRequest: firstRequest,
              cupColor: cupColor
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
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Cup", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              city: city,
              address: address,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: this.props.location.state,
              total_price: this.state.price * this.state.quantity,
              text: this.state.text,
              firstRequest: firstRequest,
              cupColor: cupColor
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

  setText = e => {
    this.setState({ text: e.target.value }); // Tekst za sliku se upisuje u state (text)
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

  toggleDropdown = () => {
    let currrentDrop = this.state.activeDropdown;
    this.setState({
      activeDropdown: !currrentDrop
    });
  };

  changeFormat = e => {
    // Kad dodje do promene tipa solje koji korisnik izabere prilikom porudzbine, taj tip solje se upise u state "format_id" i u zavisnosti od formata upisuje se cena po komadu i ukupna cena porudzbine
    if (e.target.value === "11") {
      this.setState({
        format_id: e.target.value,
        price: 550
      });
    } else if (e.target.value === "12") {
      this.setState({
        format_id: e.target.value,
        price: 650
      });
    } else {
      this.setState({
        format_id: e.target.value,
        price: 850
      });
    }
  };

  decrementFunc = () => {
    let quantity = this.state.quantity;
    if (quantity > 1) quantity = quantity - 1;
    this.setState({
      quantity
    });
  };

  incremetFunc = () => {
    let quantity = this.state.quantity;
    quantity = quantity + 1;
    this.setState({
      quantity
    });
  };

  handleCup = e => {
    if (e.target.getAttribute("data-value") === "11") {
      this.setState({
        selectedCup: e.target.innerHTML,
        format_id: e.target.getAttribute("data-value"),
        price: 550,
        activeDropdown: false
      });
    } else if (e.target.getAttribute("data-value") === "12") {
      this.setState({
        selectedCup: e.target.innerHTML,
        format_id: e.target.getAttribute("data-value"),
        price: 650,
        activeDropdown: false
      });
    } else {
      this.setState({
        selectedCup: e.target.innerHTML,
        format_id: e.target.getAttribute("data-value"),
        price: 850,
        activeDropdown: false
      });
    }
  };

  toggleDetails = () => {
    this.setState({
      detailsToggle: !this.state.detailsToggle
    });
  };

  inputIncrement = e => {
    if (e.target.value > 0) {
      this.setState({
        quantity: parseInt(e.target.value)
      });
    }
  };

  setCupColor = e => {
    cupColor = e.target.value;
  };

  render() {
    const total_price = this.state.price * this.state.quantity;
    return (
      <div className="cup_component">
        {this.state.succesPopUp ? (
          <SuccesPopUp
            successpopupVisible={() => this.getDatapopUp()}
            responsePopUp={this.state.responsePopUp}
            succesPopUp={this.state.succesPopUp}
            formVisible={() => this.closeForm()}
            closeSuccess={() => this.closeSuccess()}
            popUpStatus={this.state.popUpStatus}
            setNaruciButtonStatus={this.setNaruciButtonStatus}
          />
        ) : null}
        <div className="cup_wrapper">
          <div className="container">
            <div className="cup_holder">
              <div className="select_type_cup">
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
                <div className="select_type_cup_holder">
                  <div className="select_type_cup_holder_left">
                    <div className="select_type_cup">
                      <h5>Tip šolje:</h5>
                      <div className="selects_row">
                        <div className="selectCup_wrapper">
                          <select onChange={e => this.changeFormat(e)}>
                            {this.state.format &&
                              this.state.format.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="mySelectIncrement">
                          <span
                            className="decrement"
                            onClick={this.decrementFunc}
                          >
                            <FontAwesomeIcon icon={faMinus} color="#fff" />
                          </span>
                          <input
                            className="input_increment"
                            type="number"
                            value={this.state.quantity}
                            onChange={this.inputIncrement}
                          />
                          <span
                            onClick={this.incremetFunc}
                            className="increment"
                          >
                            <FontAwesomeIcon icon={faPlus} color="#fff" />
                          </span>
                        </div>
                        {this.state.format_id === "12" ? (
                          <div>
                            <input
                              onChange={this.setCupColor.bind(this)}
                              type="text"
                              name="color"
                              placeholder="Izaberite boju"
                              className="chooseColor"
                            />
                          </div>
                        ) : null}
                      </div>
                      <p className="pricePerPart">
                        Cena po komadu: <span>{this.state.price},00</span> rsd
                      </p>
                    </div>
                    <div className="totalPrice_div">
                      <h6>Ukupna Cena:</h6>
                      <p className="price">
                        {total_price},00 <span>RSD</span>
                      </p>
                    </div>
                  </div>
                  <div className="select_type_cup_holder_right">
                    {this.props.location.state.map((item, index) => (
                      <div>
                        {typeof item === "object" ? (
                          <div
                            key={index}
                            className="yourCupItem"
                            style={{ background: `url(${item.url})` }}
                          />
                        ) : (
                          <div
                            key={index}
                            className="yourCupItem"
                            style={{ background: `url(${item})` }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {this.state.popUpStatus
                    ? ({
                        /* Uzimamo state (fullname,address,email,phoneNumber) iz Child komponente "Form" */
                      },
                      (
                        <CupForm
                          product={this.state.product}
                          format={this.state.format_id}
                          quantity={this.state.quantity}
                          totalPrice={total_price}
                          sendData={this._handleSubmit}
                          updateEmail={this.GetEmailFromChildComponent}
                          updateAddress={this.GetAddressFromChildComponent}
                          updatePhoneNumber={
                            this.GetPhoneNumberFromChildComponent
                          }
                          updateFullname={this.GetFullNameFromChildComponent}
                          updateDelivery={this.GetDeliveryFromChildComponent}
                          callbackclosepopup={this.closePopup}
                          succesPopUp={this.state.succesPopUp}
                          showLoader={this.state.showLoader}
                          setNaruciButtonStatus={this.setNaruciButtonStatus}
                          disabledButton={this.state.disabledButton}
                          uploadProgress={this.state.uploadProgress}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="textareaForCup">
            <p className="textareaForCup_text">
              Želite natpis na šolji?
              <br />
              Upišite ga ovde
            </p>
            <textarea maxLength="50" onChange={this.setText.bind(this)} />
          </div>
          <div>
            <div className="container">
              <div className="next_prev_buttons">
                <div className="back next_prev">
                  <span>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} color="#fff" />
                  </span>
                  <Link
                    to={{
                      pathname: "/photoCupUploadImages",
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
      </div>
    );
  }
}

export default Cup;
