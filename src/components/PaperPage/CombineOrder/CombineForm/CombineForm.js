import React, { Component } from "react";
// Images
import closePopUpImg from "../../../../assets/images/closePopup.png";
import CalculatorImg from "../../../../assets/images/calculator.png";
import UserImg from "../../../../assets/images/avatar.png";
import PhoneImg from "../../../../assets/images/phone.png";
import LocationImg from "../../../../assets/images/art.png";
import EmailImg from "../../../../assets/images/email.png";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

let articles = [];
export let fullname;
export let phoneNumber;
export let address;
export let email;
export let city;

class StandardForm extends Component {
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
      city: "",
      cityMsg: false,
      address: "",
      addressMsg: false,
      email: "",
      emailMsg: false
    };
  }

  componentDidMount() {
    articles = this.props.sendPhotosToSend;
    fullname = null;
    phoneNumber = null;
    address = null;
    email = null;
    city = null;
  }

  sendData = () => {
    if (
      !fullname ||
      !phoneNumber ||
      !address ||
      !city ||
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
    // this.props.updateFullname(e.target.value); // Prosledjivanje state.fullName u Parent komponentu "Cup"
  };

  setPhoneNumber = e => {
    // this.setState({ phoneNumber: e.target.value });
    phoneNumber = e.target.value;
    // this.props.updatePhoneNumber(e.target.value); // Prosledjivanje state.phoneNumber u Parent komponentu "Cup"
  };

  setCity = e => {
    city = e.target.value;
  };

  setAddress = e => {
    // this.setState({ address: e.target.value });
    address = e.target.value;
    // this.props.updateAddress(e.target.value); // Prosledjivanje state.address u Parent komponentu "Cup"
  };

  setEmail = e => {
    // this.setState({ email: e.target.value });
    email = e.target.value;
    // this.props.updateEmail(e.target.value); // Prosledjivanje state.email u Parent komponentu "Cup"
  };

  toggleCheckbox1 = () => {
    // Prosledjivanje state.delivery u Parent komponentu "Cup"
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
    //////////////////
    const product = this.props.product;
    const format_id = this.props.format_id;
    let format;

    if (format_id === "1") {
      format = "9x13";
    } else if (format_id === "2") {
      format = "10x15";
    } else if (format_id === "3") {
      format = "13x18";
    } else if (format_id === "4") {
      format = "15x21";
    } else if (format_id === "5") {
      format = "20x30";
    } else if (format_id === "6") {
      format = "30x40";
    } else if (format_id === "7") {
      format = "30x45";
    } else if (format_id === "8") {
      format = "40x60";
    } else if (format_id === "9") {
      format = "50x70";
    } else if (format_id === "10") {
      format = "50x100";
    } else {
      format = "9x13";
    }
    //////////////////

    let index;
    let articles = this.props.sendPhotosToSend;
    let articlesArray = new Object();
    let quantity_9x13 = 0;
    let quantity_10x15 = 0;
    let quantity_13x18 = 0;
    let quantity_15x21 = 0;
    let quantity_20x30 = 0;
    let quantity_30x40 = 0;
    let quantity_30x45 = 0;
    let quantity_40x60 = 0;
    let quantity_50x70 = 0;
    let quantity_50x100 = 0;

    for (index = 0; index < articles.length; index++) {
      if (articles[index][1] === "1") {
        quantity_9x13 += articles[index][2];
        articlesArray["9x13"] = quantity_9x13;
      } else if (articles[index][1] === "2") {
        quantity_10x15 += articles[index][2];
        articlesArray["10x15"] = quantity_10x15;
      } else if (articles[index][1] === "3") {
        quantity_13x18 += articles[index][2];
        articlesArray["13x18"] = quantity_13x18;
      } else if (articles[index][1] === "4") {
        quantity_15x21 += articles[index][2];
        articlesArray["15x21"] = quantity_15x21;
      } else if (articles[index][1] === "5") {
        quantity_20x30 += articles[index][2];
        articlesArray["20x30"] = quantity_20x30;
      } else if (articles[index][1] === "6") {
        quantity_30x40 += articles[index][2];
        articlesArray["30x40"] = quantity_30x40;
      } else if (articles[index][1] === "7") {
        quantity_30x45 += articles[index][2];
        articlesArray["30x45"] = quantity_30x45;
      } else if (articles[index][1] === "8") {
        quantity_40x60 += articles[index][2];
        articlesArray["40x60"] = quantity_40x60;
      } else if (articles[index][1] === "9") {
        quantity_50x70 += articles[index][2];
        articlesArray["50x70"] = quantity_50x70;
      } else if (articles[index][1] === "10") {
        quantity_50x100 += articles[index][2];
        articlesArray["50x100"] = quantity_50x100;
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

                {articles.length > 0 ? (
                  Object.entries(articlesArray).map(([key, value]) => (
                    <p>
                      Naručili ste {value} fotografija formata {key}
                    </p>
                  ))
                ) : (
                  <p>
                    Naručili ste {this.props.sendFile.length} fotografija
                    formata 9x13
                  </p>
                )}
              </div>
            </div>
            <div className="price">
              <p className="discount_price_paragraf">
                Ukupna cena:
                <span className="discount_price">
                  {this.props.total_price},00{" "}
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
                  <p>
                    {this.props.sendFile.length >= 100
                      ? "Dostava je besplatna"
                      : "Dostava na kućnu adresu uz troškove dostave 272 dinara."}
                  </p>
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
            <button onClick={this.sendData}>
              <FontAwesomeIcon icon={faCheck} color="#000" /> Naruči
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StandardForm;
