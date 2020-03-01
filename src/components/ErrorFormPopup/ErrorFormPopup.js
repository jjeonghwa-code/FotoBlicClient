import React, { Component } from "react";
import "./ErrorFormPopup.css";
import CloseButton from "../../assets/images/closePopup.png";
import axios from "axios";
import SuccessSupport from "./SuccessSuport";

class ErrorFormPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopup: false,
      email: "",
      number_of_photos: "",
      product: "FOTO-PAPIR",
      problem_description: "Problem sa otpremanjem fotografija sa uređaja",
      user_device: "Mobilni - Android",
      internet_connection: "Wi-Fi",
      browser: "Google chrome",
      problem_details: "",
      full_name: "",
      visibleSuccessPopup: false,
      emailERR: false,
      full_nameERR: false
    };
  }

  submitForm = () => {
    if (
      this.state.full_name.length > 3 &&
      this.state.email.length > 5 &&
      this.state.email.includes("@")
    ) {
      axios
        .post("https://cms.fotoblicurosevic.rs/api/support", {
          email: this.state.email,
          number_of_photos: this.state.number_of_photos,
          product: this.state.product,
          problem_description: this.state.problem_description,
          user_device: this.state.user_device,
          internet_connection: this.state.internet_connection,
          browser: this.state.browser,
          problem_details: this.state.problem_details,
          full_name: this.state.full_name
        })
        .then(res => {
          console.log("odgovor", res);
          this.setState({
            visibleSuccessPopup: true
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        full_nameERR: true,
        emailERR: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  closeErrorForm = () => {
    this.props.isOpen(false);
    console.log("clck", this.props);
  };

  openSuccessPopup = () => {
    this.setState({
      visibleSuccessPopup: !this.state.visibleSuccessPopup
    });
  };

  clearErrorName = () => {
    this.setState({
      full_nameERR: false
    });
  };

  clearErrorEmail = () => {
    this.setState({
      emailERR: false
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="errorForm_wrapper" onClick={this.closeErrorForm}>
        <div className="errorForm_holder" onClick={e => e.stopPropagation()}>
          <h2>Prijavite tehnički problem</h2>
          <img src={CloseButton} onClick={this.closeErrorForm} />
          <div className="errorForm">
            <div className="errorForm_content">
              <p>Ime i prezime</p>
              <input
                type="text"
                name="full_name"
                id="full_name"
                onChange={this.handleChange}
                onFocus={this.clearErrorName}
              />
              {this.state.full_nameERR ? (
                <p className="custom_err">Unesite vaše ime i prezime</p>
              ) : null}
            </div>
            <div className="errorForm_content">
              <p>Vaš email:</p>
              <input
                name="email"
                type="email"
                id="email"
                onChange={this.handleChange}
                onFocus={this.clearErrorEmail}
              />
              {this.state.full_nameERR ? (
                <p className="custom_err">Unesite vašu email adresu</p>
              ) : null}
            </div>
            <div className="errorForm_content">
              <p>Proizvod koji porucujete:</p>
              <select name="product" id="product" onChange={this.handleChange}>
                <option value="FOTO-PAPIR">FOTO-PAPIR</option>
                <option value="FOTO-SOLJA">FOTO-SOLJA</option>
                <option value="FOTO-PUZZLE">FOTO-PUZZLE</option>
                <option value="FOTO-MAJICA">FOTO-MAJICA</option>
                <option value="FOTO-KALENDAR">FOTO-KALENDAR</option>
                <option value="FOTO-BOOK">FOTO-BOOK</option>
              </select>
            </div>
            <div className="errorForm_content">
              <p>Vrsta problema:</p>
              <select
                name="problem_description"
                id="problem_description"
                onChange={this.handleChange}
              >
                <option value="Problem sa otpremanjem fotografija sa uređaja">
                  Problem sa otpremanjem fotografija sa uređaja
                </option>
                <option value="Problem sa otpremanjem fotografija sa facebook-a">
                  Problem sa otpremanjem fotografija sa facebook-a
                </option>
                <option value="Problem sa otpremanjem fotografija sa instagrama">
                  Problem sa otpremanjem fotografija sa instagrama
                </option>
                <option value="Problem sa čekiranjem slika">
                  Problem sa čekiranjem slika
                </option>
                <option value="Problem sa cenom/formom">
                  Problem sa cenom/formom
                </option>
                <option value="Drugo">Drugo</option>
              </select>
            </div>
            <div className="errorForm_content">
              <p>Koliko slika pokusavate da otpremite?</p>
              <input
                name="number_of_photos"
                type="text"
                id="number_of_photos"
                onChange={this.handleChange}
              />
            </div>
            <div className="errorForm_content">
              <p>Sa kog uredjaja pokušavate da poručite?</p>
              <select
                name="user_device"
                id="user_device"
                onChange={this.handleChange}
              >
                <option value="PC">PC</option>
                <option value="Mobilni - Android">Mobilni - Android</option>
                <option value="Mobilni - iOS">Mobilni - iOS</option>
                <option value="Tablet">Tablet</option>
              </select>
            </div>
            <div className="errorForm_content">
              <p>Koji internet koristite?</p>
              <select
                name="internet_connection"
                id="internet_connection"
                onChange={this.handleChange}
              >
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="3G/4G">3G/4G</option>
              </select>
            </div>
            <div className="errorForm_content">
              <p>Koji pretrazivac koristite?</p>
              <select name="browser" id="browser" onChange={this.handleChange}>
                <option value="Google chrome">Google chrome</option>
                <option value="Mozilla Firefox">Mozilla Firefox</option>
                <option value="Safari">Safari</option>
                <option value="Opera">Opera</option>
                <option value="Internet Explorer">Internet Explorer</option>
                <option value="Drugi">Drugi</option>
              </select>
            </div>
            <div className="errorForm_content">
              <p>Kratak opis problema</p>
              <textarea
                name="problem_details"
                id="problem_details"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <button onClick={this.submitForm} className="errorForm_btn">
              Submit
            </button>
          </div>
        </div>
        {this.state.visibleSuccessPopup ? (
          <SuccessSupport success={this.openSuccessPopup} />
        ) : null}
      </div>
    );
  }
}

export default ErrorFormPopup;
