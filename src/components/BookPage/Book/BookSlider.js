import React, { Component } from "react";
import axios from "axios";
import "../../../globalStyle.css";
import "./bookStyle.css";
import ItemOfBookSlider from "./ItemOfBookSlider";
import BookForm from "../BookForm/BookForm";
import SuccesPopUp from "../BookForm/SuccesPopUp";
import { Link } from "react-router-dom";
import { fullname, phoneNumber, address, email, city } from "../BookForm/BookForm";

//fa
import { imageIndex } from "../ChooseFotobook/DesignBookPopUp/DesignBookPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

class BookSlider extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      popUpStatus: false,
      succesPopUp: false, //Klikom na naruci otvara se success popup ako je porudzbina uspela
      responsePopUp: "", // Dodavanje u state odgovor sa back-end-a, da li je porudzbina uspela ili moraju da se popune sva polja pa da se posalje opet
      // Naredna polja se salju u bazu
      fullName: null,
      phoneNumber: null,
      address: null,
      email: null,
      city: null,
      delivery: null,
      format_id: this.props.location.bookFormat,
      quantity: 1,
      product: null,
      file: this.props.location.state,
      price: this.props.location.price,
      disabledButton: false,
      showLoader: false,
      uploadProgress: 0
    };
  }
  formatId = this.props.location.bookFormat;

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/Page_Photo_Book`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji tip solje moze korisnik da izabere prilikom narudzbine
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

    let photosToSendBook = this.state.file.map(function(el, i) {
      if (typeof el == "object") el = el.fullUrl;
      return el;
    });

    if (this.state.file.length < 10000) {
      console.log(city);
      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/Page_Photo_Book",
          {
            fullname: fullname,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            city: city,
            delivery: this.state.delivery,
            format_id: this.state.format_id,
            quantity: this.state.quantity,
            file: photosToSendBook,
            total_price: this.state.price,
            // frame: imageIndex,
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
      let n = Math.floor(this.state.file.length / 20);
      let r = this.state.file.length % 20;

      for (let i = 0; i <= n; i++) {
        let slicedPhotosToSend = 0;

        if (i != n)
          slicedPhotosToSend = this.state.file.slice(i * 20, i * 20 + 20);
        else slicedPhotosToSend = this.state.file.slice(n * 20, n * 20 + r);

        let firstRequest;
        if (i == 0) {
          firstRequest = true;

          await axios
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Book", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              city: city,
              address: address,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: slicedPhotosToSend,
              total_price: this.state.price,
              // frame: imageIndex,
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
            .post("https://cms.fotoblicurosevic.rs/api/Page_Photo_Book", {
              fullname: fullname,
              phoneNumber: phoneNumber,
              address: address,
              city: city,
              email: email,
              delivery: this.state.delivery,
              format_id: this.state.format_id,
              quantity: this.state.quantity,
              file: slicedPhotosToSend,
              total_price: this.state.price,
              // frame: imageIndex,
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
      <div className="bookSlider">
        <h2>Odabrane fotografije:</h2>
        <div className="container">
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
          <div className="bookSlider_content">
            <ItemOfBookSlider
              passFileToItemOfBook={this.props.location.state}
              passBookFormat={this.props.location.bookFormat}
            />
          </div>
        </div>
        {this.state.popUpStatus ? (
          <BookForm
            file={this.state.file}
            product={this.state.product}
            format={this.state.format_id}
            price={this.state.price}
            quantity={this.state.quantity}
            sendData={this._handleSubmit}
            updateFullname={this.GetFullNameFromChildComponent}
            updatePhoneNumber={this.GetPhoneNumberFromChildComponent}
            updateAddress={this.GetAddressFromChildComponent}
            updateEmail={this.GetEmailFromChildComponent}
            updateDelivery={this.GetDeliveryFromChildComponent}
            callbackclosepopup={this.closePopup}
            setNaruciButtonStatus={this.setNaruciButtonStatus}
            disabledButton={this.state.disabledButton}
            showLoader={this.state.showLoader}
            uploadProgress={this.state.uploadProgress}
          />
        ) : (
          ""
        )}
        <div className="book_padding">
          <div className="container">
            <div className="next_prev_buttons">
              <div className="back next_prev">
                <span>
                  <FontAwesomeIcon icon={faAngleDoubleLeft} color="#fff" />
                </span>
                <Link
                  to={{
                    pathname: "/photoBookUploadImages",
                    file: this.state.file,
                    format: this.state.format_id
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

export default BookSlider;
