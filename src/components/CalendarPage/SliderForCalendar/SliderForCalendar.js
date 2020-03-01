import React, { Component } from "react";
import axios from "axios";
import "../../../globalStyle.css";
import "../Calendar/calendarStyle.css";
import DesignCalendarPopUp from "../DesignCalendarPopUp/DesignCalendarPopUp";
import { imageIndex } from "../DesignCalendarPopUp/DesignCalendarPopUp";
import { connect } from "react-redux";

//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

var arrayOfPhotos = [];
let totalPrices;
let index = null;
let arrayOfPhotos_form = false;

class SliderForCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdown: false,
      selectedLi: "A3 - Kalendar",
      selectedCalendar: "21",
      format: null, // Lista svih formata za Calendar
      quantity: 1,
      photosToSend: [],
      price: 400,
      totalPrices: null,
      currentRow: 0,
      designPopUp: false
    };
    this.changeFormat = this.changeFormat.bind(this);
  }

  openDesignPopUpVisible = e => {
    this.setState({
      designPopUp: true
    });
    index = e.target.getAttribute("data-value");
  };

  closeDesignPopUpVisible = visible => {
    this.setState({
      designPopUp: visible
    });
  };

  toggleDropdown = index => {
    let currrentDrop = this.state.activeDropdown;
    if (this.state.currentRow === index) {
      this.setState({
        activeDropdown: !currrentDrop,
        currentRow: index
      });
    } else {
      this.setState({
        activeDropdown: true,
        currentRow: index
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (arrayOfPhotos_form === false) {
      let newArr = [];
      let pricePerFormat = 400;
      let frame_id = "17";
      this.props.photos.map(el => {
        let secondArr = [
          el,
          this.state.selectedCalendar,
          this.state.quantity,
          pricePerFormat,
          frame_id
        ];
        return newArr.push(secondArr);
      });

      arrayOfPhotos = newArr;

      let price = arrayOfPhotos.length * this.state.price;
      this.setState({
        photosToSend: arrayOfPhotos,
        totalPrices: price
      });

      arrayOfPhotos_form = true;

      this.props.sendPhotosAndData(arrayOfPhotos, price);
    }
  }

  componentWillUnmount() {
    arrayOfPhotos_form = false;
  }

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs/api/calendarPage`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji format moze korisnik da izabere prilikom narudzbine kalendara
      .then(res => {
        this.setState({
          format: res.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  calculatePrice = () => {
    ////////////////////////////////// Izracuvanavnje ukupne cene svih odabranih proizvoda

    let indexOfArrayOfPhotos;
    let allPrices = [];
    let price;

    for (
      indexOfArrayOfPhotos = 0;
      indexOfArrayOfPhotos < arrayOfPhotos.length;
      indexOfArrayOfPhotos++
    ) {
      if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "21") {
        price = 400;
      } else {
        price = 300;
      }

      allPrices.push(price * arrayOfPhotos[indexOfArrayOfPhotos][2]);
    }

    let indexAllPrices;
    let allPriceSum = 0;
    for (
      indexAllPrices = 0;
      indexAllPrices < allPrices.length;
      indexAllPrices++
    ) {
      allPriceSum += allPrices[indexAllPrices];
    }

    totalPrices = allPriceSum;
  };

  changeFormat = (e, i) => {
    if (e.target.value === "21") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 400;
    } else if (e.target.value === "22") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 300;
    }

    this.setState({ photosToSend: arrayOfPhotos });

    this.calculatePrice();

    this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
  };

  chooseFrame = () => {
    arrayOfPhotos[index][4] = imageIndex;

    this.setState({ photosToSend: arrayOfPhotos });

    this.calculatePrice();

    this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
  };

  decrementFunc = i => {
    if (arrayOfPhotos[i][2] === 1) {
      return;
    } else {
      arrayOfPhotos[i][2] = arrayOfPhotos[i][2] - 1;
      this.setState({ photosToSend: arrayOfPhotos });

      this.calculatePrice();

      this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
    }
  };

  incremetFunc = i => {
    // napravi array za quantities i updateuj value za svaki posebno u odnosu na index
    arrayOfPhotos[i][2] = arrayOfPhotos[i][2] + 1;

    this.setState({ photosToSend: arrayOfPhotos });

    this.calculatePrice();

    this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
  };

  inputIncrement = (e, i) => {
    if (e.target.value > 0) {
      arrayOfPhotos[i][2] = parseInt(e.target.value);
      this.setState({ photosToSend: arrayOfPhotos });
      this.calculatePrice();

      this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
    }
  };

  render() {
    console.log('qqqqqqqqqqq', this.state.photosToSend)
    return (
      <div className="sliderForCalendar">
        {this.state.designPopUp ? (
          <DesignCalendarPopUp
            callFunction={() => this.chooseFrame()}
            closeDesignPopUpVisible={() => this.closeDesignPopUpVisible()}
          />
        ) : null}

        {this.props.photos ? (
          <div className="sliderForCalendar_wrapper">
            <div>
              {this.props.photos.map((item, index) => (
                <div key={index} className="sliderForCalendar_holder">
                  {typeof item === "object" ? (
                    <div
                      className="sliderForCalendar_img"
                      key={index}
                      style={{ background: `url(${item.url})` }}
                    />
                  ) : (
                    <div
                      className="sliderForCalendar_img"
                      key={index}
                      style={{ background: `url(${item})` }}
                    />
                  )}
                  <div className="sliderForCalendar_content">
                    <div className="sliderForCalendar_content_top">
                      <div
                        className="dizajnDugme"
                        key={index}
                        data-value={index}
                        onClick={e => this.openDesignPopUpVisible(e)}
                      >
                        Dizajn{" "}
                        <FontAwesomeIcon icon={faChevronDown} color="#fff" />
                      </div>
                      <div className="select_wrapper">
                        <select onChange={e => this.changeFormat(e, index)}>
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
                          onClick={() => this.decrementFunc(index)}
                        >
                          <FontAwesomeIcon icon={faMinus} color="#fff" />
                        </span>
                        <input
                          className="input_increment"
                          type="number"
                          value={
                            this.state.photosToSend.length > 0
                              ? this.state.photosToSend[index][2]
                              : 1
                          }
                          onChange={e => this.inputIncrement(e, index)}
                        />
                        <span
                          onClick={() => this.incremetFunc(index)}
                          className="increment"
                        >
                          <FontAwesomeIcon icon={faPlus} color="#fff" />
                        </span>
                      </div>
                    </div>
                    <div className="sliderForCalendar_content_bottom">
                      <p className="pricePerPart">
                        Cena po komadu:
                        {this.state.photosToSend.length > 0
                          ? this.state.photosToSend[index][3]
                          : 1}
                        ,00 RSD
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="dodajzastampu">Dodajte slike za stampu!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.getPhotos
  };
};

export default connect(mapStateToProps)(SliderForCalendar);
