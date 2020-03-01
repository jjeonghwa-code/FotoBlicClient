import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

let arrayOfPhotos = [];
let totalPrices;
let arrayOfPhotos_form = false;

class ItemNumberOfPhotosFP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdown: false,
      format: null, // Lista svih formata slika za Dropdown
      file: this.props.photos,

      // Naredna polja se salju serveru na obradu nakon popunjene forme za porudzbinu
      format_id: "1",
      quantity: 1,
      product: null, // Proizvod koji se cuva
      photosToSend: []
    };

    this.changeFormat = this.changeFormat.bind(this);
  }

  redirect = () => {
    return <Redirect to="/photoPapperUploadImages" />;
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log('ssssss')
  //   if (arrayOfPhotos_form === false) {
  //     let newArr = [];
  //     let pricePerFormat = 14;
  //     nextProps.passPropsToCombineOrder.map(el => {
  //       let secondArr = [el, this.state.format_id, this.state.quantity, pricePerFormat];
  //       return newArr.push(secondArr);
  //     });
  //     arrayOfPhotos = newArr;
  //     this.setState({
  //       photosToSend: arrayOfPhotos
  //     });
  //     arrayOfPhotos_form = true;
  //   }

  //   this.calculateActionPrice();
  // }

  componentWillUnmount() {
    arrayOfPhotos_form = false;
  }

  componentDidMount() {
    axios
      .get(`https://cms.fotoblicurosevic.rs//api/Page_Photo_Paper`) // Salje se GET request serveru, odgovor upisujemo u state "format" da bi znali koji format moze korisnik da izabere prilikom narudzbine Slike
      .then(res => {
        this.setState({
          format: res.data[0],
          product: res.data[1]
        });
      })
      .catch(err => {
        console.log(err);
      });

    let newArr = [];
    if (this.props.photos.length === 0) {
      this.redirect();
    } else {
      this.props.photos.map((el, i) => {
        let secondArr = [el, this.state.format_id, this.state.quantity, 0, i];
        return newArr.push(secondArr);
      });
      arrayOfPhotos = newArr;
      this.setState({
        photosToSend: arrayOfPhotos
      });
    }

    this.calculateActionPrice();

    if (this.state.photosToSend.length === 0) {
      totalPrices = arrayOfPhotos.length * 14;
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
      if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "1") {
        price = 14;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "2") {
        price = 17;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "3") {
        price = 24;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "4") {
        price = 35;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "5") {
        price = 180;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "6") {
        price = 350;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "7") {
        price = 350;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "8") {
        price = 790;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "9") {
        price = 1290;
      } else if (arrayOfPhotos[indexOfArrayOfPhotos][1] === "10") {
        price = 3100;
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

  calculateActionPrice = () => {
    ///////// prva akcija
    let index1;
    let index2;
    let index3;
    let priceOne = 0;
    for (index1 = 0; index1 < arrayOfPhotos.length; index1++) {
      if (arrayOfPhotos[index1][1] === "1") {
        priceOne += arrayOfPhotos[index1][2];
      }

      if (priceOne >= 100) {
        for (index2 = 0; index2 < arrayOfPhotos.length; index2++) {
          if (arrayOfPhotos[index2][1] === "1") {
            arrayOfPhotos[index2][3] = 9.9;
          }
        }
      } else {
        for (index3 = 0; index3 < arrayOfPhotos.length; index3++) {
          if (arrayOfPhotos[index3][1] === "1") {
            arrayOfPhotos[index3][3] = 14;
          }
        }
      }
    }

    ///////// druga akcija
    let index4;
    let index5;
    let index6;
    let priceTwo = 0;
    for (index4 = 0; index4 < arrayOfPhotos.length; index4++) {
      if (arrayOfPhotos[index4][1] === "2") {
        priceTwo += arrayOfPhotos[index4][2];
      }

      if (priceTwo >= 100) {
        for (index5 = 0; index5 < arrayOfPhotos.length; index5++) {
          if (arrayOfPhotos[index5][1] === "2") {
            arrayOfPhotos[index5][3] = 10.9;
          }
        }
      } else {
        for (index6 = 0; index6 < arrayOfPhotos.length; index6++) {
          if (arrayOfPhotos[index6][1] === "2") {
            arrayOfPhotos[index6][3] = 17;
          }
        }
      }
    }

    ///treca akcija

    let index7;
    let index8;
    let index9;
    let priceThree = 0;
    for (index7 = 0; index7 < arrayOfPhotos.length; index7++) {
      if (arrayOfPhotos[index7][1] === "3") {
        priceThree += arrayOfPhotos[index7][2];
      }

      if (priceThree >= 100) {
        for (index8 = 0; index8 < arrayOfPhotos.length; index8++) {
          if (arrayOfPhotos[index8][1] === "3") {
            arrayOfPhotos[index8][3] = 16.9;
          }
        }
      } else {
        for (index9 = 0; index9 < arrayOfPhotos.length; index9++) {
          if (arrayOfPhotos[index9][1] === "3") {
            arrayOfPhotos[index9][3] = 24;
          }
        }
      }
    }
  };

  changeFormat = (e, i) => {
    if (e.target.value === "1") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 14;
    } else if (e.target.value === "2") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 17;
    } else if (e.target.value === "3") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 24;
    } else if (e.target.value === "4") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 35;
    } else if (e.target.value === "5") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 180;
    } else if (e.target.value === "6") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 350;
    } else if (e.target.value === "7") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 350;
    } else if (e.target.value === "8") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 790;
    } else if (e.target.value === "9") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 1290;
    } else if (e.target.value === "10") {
      arrayOfPhotos[i][1] = e.target.value;
      arrayOfPhotos[i][3] = 3100;
    }

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

  decrementFunc = i => {
    if (arrayOfPhotos[i][2] === 1) {
      return;
    } else {
      arrayOfPhotos[i][2] = arrayOfPhotos[i][2] - 1;

      this.calculateActionPrice();

      this.setState({ photosToSend: arrayOfPhotos });

      this.calculatePrice();

      this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
    }
  };

  incremetFunc = i => {
    arrayOfPhotos[i][2] = arrayOfPhotos[i][2] + 1;

    this.calculateActionPrice();

    this.setState({ photosToSend: arrayOfPhotos });

    this.calculatePrice();

    this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
  };

  inputIncrement = (e, i) => {
    if (e.target.value > 0) {
      arrayOfPhotos[i][2] = parseInt(e.target.value);

      this.calculateActionPrice();

      this.setState({ photosToSend: arrayOfPhotos });

      this.calculatePrice();
      this.props.sendPhotosAndData(this.state.photosToSend, totalPrices);
    }
  };

  render() {
    return (
      <div>
        {this.state.file ? (
          <div className="sliderForPuzzle">
            <div className="sliderForPuzzle_wrapper">
              {this.state.file.map((item, index) => (
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
                  {/* <div
                    key={index}
                    className="sliderForPuzzle_img"
                    style={{ background: `url(${item})` }}
                  /> */}
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
