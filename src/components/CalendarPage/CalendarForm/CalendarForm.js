import React, { Component } from "react";

// Images
import closePopUpImg from "../../../assets/images/closePopup.png";
import CalculatorImg from "../../../assets/images/calculator.png";
import UserImg from "../../../assets/images/avatar.png";
import PhoneImg from "../../../assets/images/phone.png";
import LocationImg from "../../../assets/images/art.png";
import EmailImg from "../../../assets/images/email.png";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

export let fullname;
export let phoneNumber;
export let address;
export let email;
export let city;

class CupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxStatus1: false,
      checkboxStatus2: false,
      delivery: null,
      fullName: "",
      fullNameMsg: false,
      phoneNumber: null,
      phoneNumberMsg: false,
      address: "",
      addressMsg: false,
      email: "",
      emailMsg: false,
      city: "",
      cityMsg: false
    };
  }

  componentDidMount() {
    fullname = null;
    phoneNumber = null;
    address = null;
    email = null;
    city = null;
  }

  sendDataToParent = () => {
    if (
      !fullname ||
      !phoneNumber ||
      !city ||
      !address ||
      !email ||
      !email.includes("@")
    ) {
      if (!fullname) {
        this.setState({
          fullNameMsg: true
        });
      }
      if (!phoneNumber) {
        this.setState({
          phoneNumberMsg: true
        });
      }
      if (!city) {
        this.setState({
          cityMsg: true
        });
      }
      if (!address) {
        this.setState({
          addressMsg: true
        });
      }
      if (!email) {
        this.setState({
          emailMsg: true
        });
      }
      let emailAddress = [];
      emailAddress.push(email);
      if (!emailAddress.includes("@") && email !== null && email.length !== 0) {
        this.setState({
          emailErrorVisible: true
        });
      }
      if (emailAddress.toString().includes("@")) {
        this.setState({
          emailErrorVisible: false
        });
      }
    } else {
      this.props.setNaruciButtonStatus(true);
      this.props.sendData();
    }
  };

  handleClearName = () => {
    this.setState({
      fullNameMsg: false
    });
  };

  handleClearPhoneNumber = () => {
    this.setState({
      phoneNumberMsg: false
    });
  };

  handleClearCity = () => {
    this.setState({
      cityMsg: false
    });
  };

  handleClearAddress = () => {
    this.setState({
      addressMsg: false
    });
  };

  handleClearEmail = () => {
    this.setState({
      emailMsg: false
    });
  };

  // Upisivanje u state iz forme
  setFullname = e => {
    // this.setState({ fullName: e.target.value });
    fullname = e.target.value;
    // this.props.updateFullname(e.target.value); // Prosledjivanje fullName u Parent komponentu "StandardOrder"
  };

  setPhoneNumber = e => {
    // this.setState({ phoneNumber: e.target.value });
    phoneNumber = e.target.value;
    // this.props.updatePhoneNumber(e.target.value); // Prosledjivanje phoneNumber u Parent komponentu "StandardOrder"
  };

  setCity = e => {
    city = e.target.value;
  };

  setAddress = e => {
    // this.setState({ address: e.target.value });
    address = e.target.value;
    // this.props.updateAddress(e.target.value); // Prosledjivanje address u Parent komponentu "StandardOrder"
  };

  setEmail = e => {
    // this.setState({ email: e.target.value });
    email = e.target.value;
    // this.props.updateEmail(e.target.value); // Prosledjivanje email u Parent komponentu "StandardOrder"
  };

  toggleCheckbox1 = () => {
    // Prosledjivanje state.delivery u Parent komponentu "Calendar"
    let checkboxStatus1 = this.state.checkboxStatus1;
    this.setState({
      checkboxStatus1: !checkboxStatus1
    });
    this.props.updateDelivery("Dostava Na Kućnu Adresu");
    if (this.state.checkboxStatus2) {
      this.setState({
        checkboxStatus2: false
      });
    }
    if (this.state.checkboxStatus1) {
      this.props.updateDelivery(null);
    }
  };

  toggleCheckbox2 = () => {
    // Prosledjivanje state.delivery u Parent komponentu "Calendar"
    let checkboxStatus2 = this.state.checkboxStatus2;
    this.setState({
      checkboxStatus2: !checkboxStatus2
    });
    this.props.updateDelivery("Lično Preuzimanje");
    if (this.state.checkboxStatus1) {
      this.setState({
        checkboxStatus1: false
      });
    }
    if (this.state.checkboxStatus2) {
      this.props.updateDelivery(null);
    }
  };

  render() {
    let renderLoader;

    if (this.props.showLoader) {
      renderLoader = (
        <div className="my_custom_loader_for_upload_forms">
          <p className="first_text_in_loader">
            Budite strpljivi, upload moze trajati nekoliko minuta...
          </p>
          <FontAwesomeIcon
            icon={faSpinner}
            size="3x"
            color="#79c640"
            className="loader_anim"
          />
          <p>
            Molimo Vas sačekajte <span>{this.props.uploadProgress}%</span>
          </p>
        </div>
      );
    } else {
      renderLoader = "";
    }

    const product = this.props.product;
    //////////////////

    let index;
    let articles = this.props.sendPhotosToSend;
    let articlesArray = new Object();
    let quantity_A3_calendar = 0;
    let quantity_A4_calendar = 0;

    for (index = 0; index < articles.length; index++) {
      if (articles[index][1] === "21") {
        quantity_A3_calendar += articles[index][2];
        articlesArray["A3"] = quantity_A3_calendar;
      } else if (articles[index][1] === "22") {
        quantity_A4_calendar += articles[index][2];
        articlesArray["A4"] = quantity_A4_calendar;
      }
    }
    //////////////////
    return (
      <div className="formPopup_component">
        {renderLoader}
        <div className="form_holder">
          <div
            className="closePopup_btn"
            onClick={this.props.callbackclosepopup}
          >
            <img src={closePopUpImg} alt="closePopUpImg" />
          </div>
          <div className="form_holder_left">
            <div className="yourShopItem">
              <div className="yourInvoice">
                <img src={CalculatorImg} alt="CalculatorImg" />
                Vaš račun:
              </div>
              <div className="your_shop_item">
                <p>Proizvod: {product}</p>

                {Object.entries(articlesArray).map(([key, value]) => (
                  <p key={key}>
                    Naručili ste {value} kalendara formata {key}
                  </p>
                ))}
              </div>
            </div>
            <div className="price">
              <p className="discount_price_paragraf">
                Ukupna cena:
                <span className="discount_price">
                  {this.props.sendTotalPrice},00{" "}
                  <span className="price_value">RSD</span>
                </span>
              </p>
            </div>
          </div>
          <form className="form">
            <label htmlFor="name">
              <span className="form_miniIcons">
                <img className="userImg" src={UserImg} alt="UserImg" />
              </span>
              <input
                onChange={this.setFullname.bind(this)}
                className="inputNameLastname"
                type="text"
                placeholder="Ime i prezime"
                onFocus={this.handleClearName}
              />
            </label>
            <p
              className={
                this.state.fullNameMsg ? "validationError" : "hiddenError"
              }
            >
              *Ovo polje je obavezno!
            </p>
            <label htmlFor="number">
              <span className="form_miniIcons">
                <img className="phoneImg" src={PhoneImg} alt="UserImg" />
              </span>
              <input
                onChange={this.setPhoneNumber.bind(this)}
                className="inputPhoneNumber"
                type="number"
                placeholder="Broj telefona"
                onFocus={this.handleClearPhoneNumber}
              />
            </label>
            <p
              className={
                this.state.phoneNumberMsg ? "validationError" : "hiddenError"
              }
            >
              *Ovo polje je obavezno!
            </p>

            <label htmlFor="city">
              <span className="form_miniIcons">
                <img className="locationImg" src={LocationImg} alt="UserImg" />
              </span>
              <input
                onChange={this.setCity.bind(this)}
                className="inputCity"
                type="text"
                placeholder="Grad"
                onFocus={this.handleClearCity}
              />
            </label>
            <p
              className={this.state.cityMsg ? "validationError" : "hiddenError"}
            >
              *Ovo polje je obavezno!
            </p>

            <label htmlFor="address">
              <span className="form_miniIcons">
                <img className="locationImg" src={LocationImg} alt="UserImg" />
              </span>
              <input
                onChange={this.setAddress.bind(this)}
                className="inputAddress"
                type="text"
                placeholder="Adresa"
                onFocus={this.handleClearAddress}
              />
            </label>
            <p
              className={
                this.state.addressMsg ? "validationError" : "hiddenError"
              }
            >
              *Ovo polje je obavezno!
            </p>
            <label htmlFor="e-mail">
              <span className="form_miniIcons">
                <img className="emailImg" src={EmailImg} alt="UserImg" />
              </span>
              <input
                onChange={this.setEmail.bind(this)}
                className="inputEmail"
                type="email"
                placeholder="E-mail"
                onFocus={this.handleClearEmail}
              />
            </label>
            <p
              className={
                this.state.emailMsg ? "validationError" : "hiddenError"
              }
            >
              *Ovo polje je obavezno!
            </p>
            <p
              className={
                this.state.emailErrorVisible ? "validationError" : "hiddenError"
              }
            >
              *Email adresa mora da sadrži "@"
            </p>
            <label htmlFor="check">
              <div className="checkbox_holder">
                <div className="checkbox_row">
                  <div className="myCheckbox" onClick={this.toggleCheckbox1}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="#79c640"
                      className={
                        this.state.checkboxStatus1 ? "" : "hiddenCheckbox"
                      }
                    />
                  </div>
                  <p>Dostava je besplatna.</p>
                </div>
                <div className="checkbox_row">
                  <div className="myCheckbox" onClick={this.toggleCheckbox2}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="#79c640"
                      className={
                        this.state.checkboxStatus2 ? "" : "hiddenCheckbox"
                      }
                    />
                  </div>
                  <p>
                    Lično preuzimanje porudžbine u Foto Blic Urošević, Bulevar
                    Kralja Aleksandra 20, Beograd.
                  </p>
                </div>
              </div>
            </label>
          </form>
          <div className="placeYourOrder">
            <button
              onClick={this.sendDataToParent}
              disabled={this.props.disabledButton}
            >
              <FontAwesomeIcon icon={faCheck} color="#000" /> Naruči
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CupForm;
