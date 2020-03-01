import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "../../../../globalStyle.css";
import "../tShirtStyle.css";

//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class SliderForTshirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: null,
      activeDropdownSize: false,
      activeDropdownSide: false,
      tShirtlimitPopUpVisible: true, //Dodavanje u state promenjivu koja prikazuje da li se limit popUp vidi ili ne
      selectedLi: "S",
      file: this.props.passUploadImagesToSlider,
      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu

      product: null,
      quantity: 1,

      format_id: "16",
      side: "Spreda",
      reverseSide: "Pozadi"
    };
  }

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/photoTshirt`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji tip solje moze korisnik da izabere prilikom narudzbine
      .then(res => {
        this.setState({
          format: res.data[0],
          product: res.data[1]
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.sendDataToParentComponentTshirt();
  }

  redirect = () => {
    return <Redirect to="/photoTshirtUploadImages" />;
  };

  toggleDropdownSize = () => {
    let currrentDrop = this.state.activeDropdownSize;
    this.setState({
      activeDropdownSize: !currrentDrop
    });
  };

  toggleDropdownSide = () => {
    let currrentDrop = this.state.activeDropdownSide;
    this.setState({
      activeDropdownSide: !currrentDrop
    });
  };

  // Funkcija koja se nakon svakog setovanog stejta poziva i salje podatke u parent komponentu, cuva se i kasnije salje kroz post request kad je porudzbina spremna
  sendDataToParentComponentTshirt = () => {
    this.props.getDataForPostRequest(
      this.state.side,
      this.state.format_id,
      this.state.quantity
    );
  };

  incremetFunc = () => {
    let quantity = this.state.quantity;
    quantity = quantity + 1;

    this.setState(
      {
        quantity
      },
      () => {
        this.sendDataToParentComponentTshirt();
      }
    );
  };

  decrementFunc = () => {
    let quantity = this.state.quantity;
    if (quantity > 1) quantity = quantity - 1;
    this.setState(
      {
        quantity
      },
      () => {
        this.sendDataToParentComponentTshirt();
      }
    );
  };

  handleTshirt = e => {
    let text = e.target.textContent;

    if (text === "Spreda") {
      this.setState(
        {
          side: text,
          activeDropdownSide: false,
          reverseSide: "Pozadi"
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    } else {
      this.setState(
        {
          side: text,
          activeDropdownSide: false,
          reverseSide: "Spreda"
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    }
  };

  getValueLiist = e => {
    if (e.target.getAttribute("data-value") === "16") {
      this.setState(
        {
          selectedLi: e.target.innerHTML,
          format_id: e.target.getAttribute("data-value"),
          activeDropdownSize: false
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    } else if (e.target.getAttribute("data-value") === "17") {
      this.setState(
        {
          selectedLi: e.target.innerHTML,
          format_id: e.target.getAttribute("data-value"),
          activeDropdownSize: false
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    } else if (e.target.getAttribute("data-value") === "18") {
      this.setState(
        {
          selectedLi: e.target.innerHTML,
          format_id: e.target.getAttribute("data-value"),
          activeDropdownSize: false
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    } else if (e.target.getAttribute("data-value") === "19") {
      this.setState(
        {
          selectedLi: e.target.innerHTML,
          format_id: e.target.getAttribute("data-value"),
          activeDropdownSize: false
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    } else if (e.target.getAttribute("data-value") === "20") {
      this.setState(
        {
          selectedLi: e.target.innerHTML,
          format_id: e.target.getAttribute("data-value"),
          activeDropdownSize: false
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    }
  };

  inputIncrement = e => {
    if (e.target.value > 0) {
      this.setState(
        {
          quantity: parseInt(e.target.value)
        },
        () => {
          this.sendDataToParentComponentTshirt();
        }
      );
    }
  };

  render() {
    const sideTshirt = ["Spreda", "Pozadi"];
    return (
      <React.Fragment>
        <div className="sliderForTshirt">
          <div className="sliderForTshirt_img_wrapper">
            {this.state.file
              ? this.state.file.map((item, index) => (
                  <div>
                    {typeof item === "object" ? (
                      <div
                        className="sliderForTshirt_img"
                        key={index}
                        style={{ background: `url(${item.url})` }}
                      />
                    ) : (
                      <div
                        className="sliderForTshirt_img"
                        key={index}
                        style={{ background: `url(${item})` }}
                      />
                    )}
                  </div>
                ))
              : this.redirect()}
          </div>
          <div className="sliderForTshirt_content">
            <div className="sliderForTshirt_content_top">
              <div className="mySelect mySelect_side">
                <p className="mySelect_p">{this.state.side}</p>
                <span onClick={this.toggleDropdownSide}>
                  <FontAwesomeIcon icon={faAngleDown} color="#fff" size="2x" />
                </span>
                <ul
                  className={
                    this.state.activeDropdownSide
                      ? "mySelect_dropdownList mytwodrop activeDropdown"
                      : "mySelect_dropdownList"
                  }
                >
                  {sideTshirt.map((item, index) => (
                    <li
                      key={index}
                      data-value={item.id}
                      onClick={this.handleTshirt}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mySelect">
                <p className="mySelect_p">{this.state.selectedLi}</p>
                <span onClick={this.toggleDropdownSize}>
                  <FontAwesomeIcon icon={faAngleDown} color="#fff" size="2x" />
                </span>
                <ul
                  className={
                    this.state.activeDropdownSize
                      ? "mySelect_dropdownList activeDropdown"
                      : "mySelect_dropdownList"
                  }
                >
                  {this.state.format &&
                    this.state.format.map((item, index) => (
                      <li
                        key={index}
                        data-value={item.id}
                        onClick={this.getValueLiist}
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mySelectIncrement">
                <span className="decrement" onClick={this.decrementFunc}>
                  <FontAwesomeIcon icon={faMinus} color="#fff" />
                </span>
                <input
                  className="input_increment"
                  type="number"
                  value={this.state.quantity}
                  onChange={this.inputIncrement}
                />
                <span onClick={this.incremetFunc} className="increment">
                  <FontAwesomeIcon icon={faPlus} color="#fff" />
                </span>
              </div>
            </div>
            <div className="itemNumberOfPhotosFts_content_bottom">
              <p className="pricePerPart">
                Cena po komadu:
                <span className="price">
                  {this.state.format == null ? null : (
                    <span> {this.state.format[0].price}</span>
                  )}
                </span>
                RSD
              </p>
            </div>
            {this.state.file.length > 1 ? (
              <div className="sideMyDiv">{this.state.reverseSide}</div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderForTshirt;
