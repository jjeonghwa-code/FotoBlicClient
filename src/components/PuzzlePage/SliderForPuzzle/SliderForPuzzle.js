import React, { Component } from "react";
import "../../../globalStyle.css";
import "../Puzzle/puzzleStyle.css";
import { connect } from "react-redux";

//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

var arrayOfPhotos = [];
let totalPrices;
let arrayOfPhotos_form = false;

class ItemNumberOfPhotosFP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdown: false,
      price: 550,
      selectedPuzzle: "14",
      format: null, // Lista svih formata za Puzle (A4, A5)
      quantity: 1,
      photosToSend: []
    };
    this.changeFormat = this.changeFormat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (arrayOfPhotos_form === false) {
      let newArr = [];
      let pricePerFormat = 550;
      this.props.photos.map(el => {
        let secondArr = [
          el,
          this.state.selectedPuzzle,
          this.state.quantity,
          pricePerFormat
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

  componentDidMount(e) {
    axios
      .get(`https://cms.fotoblicurosevic.rs//api/Page_Photo_Puzzle`)
      .then(res => {
        this.setState({
          format: res.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      });

    if (this.state.photosToSend.length === 0) {
      totalPrices = arrayOfPhotos.length * 550;
      this.props.sendPhotosAndData(arrayOfPhotos, totalPrices);
    }
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
      if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "14") {
        price = 550;
      } else {
        price = 400;
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
    if (e.target.value === "14") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 550;
    } else if (e.target.value === "15") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 400;
    }

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
    // // napravi array za quantities i updateuj value za svaki posebno u odnosu na index
    arrayOfPhotos[i][2] = arrayOfPhotos[i][2] + 1;

    this.setState({ photosToSend: arrayOfPhotos });

    this.calculatePrice();

    this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
  };

  toggleDropdown = () => {
    let currrentDrop = this.state.activeDropdown;
    this.setState({
      activeDropdown: !currrentDrop
    });
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
    return (
      <div>
        {this.props.photos.length ? (
          <div className="sliderForPuzzle">
            <div className="sliderForPuzzle_wrapper">
              {this.props.photos.map((item, index) => (
                <div key={index} className="sliderForPuzzle_holder_item">
                  {typeof item === "object" ? (
                    <div
                      key={index}
                      className="sliderForPuzzle_img"
                      style={{ background: `url(${item.url})` }}
                    />
                  ) : (
                    <div
                      key={index}
                      className="sliderForPuzzle_img"
                      style={{ background: `url(${item})` }}
                    />
                  )}
                  <div className="sliderForPuzzle_content">
                    <div className="sliderForPuzzle_content_top">
                      <div className="puzzleSelect_wrapper">
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
                    <div className="sliderForPuzzle_content_bottom">
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

export default connect(mapStateToProps)(ItemNumberOfPhotosFP);
