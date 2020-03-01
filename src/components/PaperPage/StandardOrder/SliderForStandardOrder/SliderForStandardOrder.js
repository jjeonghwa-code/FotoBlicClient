import React, { Component } from "react";
import "./sliderStandardOrder.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

var arrayOfPhotos = [];
let arrayOfPhotos_form = false;

class SliderForStandardOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      photosToSend: [],
      file: this.props.photos
    };
  }
  componentWillReceiveProps(nextProps) {
    if (arrayOfPhotos_form === false) {
      let newArr = [];
      if (this.props.photos.length === 0) {
        this.redirect();
      } else {
        this.props.photos.map(el => {
          let secondArr = [el, this.state.quantity];
          return newArr.push(secondArr);
        });
        arrayOfPhotos = newArr;
        this.setState({
          photosToSend: arrayOfPhotos
        });
        arrayOfPhotos_form = true;
      }
    }

    this.props.sendData(arrayOfPhotos);
    this.calculatePrice();
    // } else {
    //   this.setState({
    //     photosToSend: arrayOfPhotos
    //   });
    // }
  }

  componentWillUnmount() {
    arrayOfPhotos_form = false;
  }

  redirect = () => {
    return <Redirect to="/photoPapperUploadImages" />;
  };

  calculatePrice = () => {
    // Izracuvanavnje ukupne cene svih odabranih proizvoda
    let indexOfArrayOfPhotos;
    let quantity = 0;

    for (
      indexOfArrayOfPhotos = 0;
      indexOfArrayOfPhotos < arrayOfPhotos.length;
      indexOfArrayOfPhotos++
    ) {
      quantity += arrayOfPhotos[indexOfArrayOfPhotos][1];
    }

    this.props.getQuantity(quantity);
  };

  incremetFunc = i => {
    // napravi array za quantities i updateuj value za svaki posebno u odnosu na index
    arrayOfPhotos[i][1] = arrayOfPhotos[i][1] + 1;
    this.setState({ photosToSend: arrayOfPhotos });

    this.props.sendData(arrayOfPhotos);

    this.calculatePrice();
  };

  decrementFunc = i => {
    if (arrayOfPhotos[i][1] === 1) {
      return;
    } else {
      arrayOfPhotos[i][1] = arrayOfPhotos[i][1] - 1;
      this.setState({ photosToSend: arrayOfPhotos });

      this.props.sendData(arrayOfPhotos);

      this.calculatePrice();
    }
  };

  price = () => {
    let indexOfArrayOfPhotos;
    let quantity = 0;

    for (
      indexOfArrayOfPhotos = 0;
      indexOfArrayOfPhotos < arrayOfPhotos.length;
      indexOfArrayOfPhotos++
    ) {
      quantity += arrayOfPhotos[indexOfArrayOfPhotos][1];
    }

    if (this.props.sendFormat === "1") {
      if (quantity >= 100) {
        return 9.9;
      } else {
        return this.props.sendPricePerPhoto;
      }
    } else if (this.props.sendFormat === "2") {
      if (quantity >= 100) {
        return 10.9;
      } else {
        return this.props.sendPricePerPhoto;
      }
    } else if (this.props.sendFormat === "3") {
      if (quantity >= 100) {
        return 16.9;
      } else {
        return this.props.sendPricePerPhoto;
      }
    } else {
      return this.props.sendPricePerPhoto;
    }
  };

  inputIncrement = (e, i) => {
    if (e.target.value > 0) {
      arrayOfPhotos[i][1] = parseInt(e.target.value);
      this.setState({ photosToSend: arrayOfPhotos });
      this.props.sendData(arrayOfPhotos);

      this.calculatePrice();
    }
  };

  render() {
    return (
      <div className="sliderForStandardOrder_item_wrapper">
        <div className="sliderForStandardOrder_item_holder">
          {this.state.file
            ? this.state.file.map((item, index) => (
                <div
                  className="sliderForStandardOrder_item_content"
                  key={index}
                >
                  {typeof item === "object" ? (
                    <div
                      className="sliderForStandardOrder_item_img_wrapper"
                      style={{ background: `url(${item.url})` }}
                    />
                  ) : (
                    <div
                      className="sliderForStandardOrder_item_img_wrapper"
                      style={{ background: `url(${item})` }}
                    />
                  )}

                  <div className="sliderForStandardOrder_item_content_holder">
                    <div className="sliderForStandardOrder_item_content_holder_top">
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
                              ? this.state.photosToSend[index][1]
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
                    <div className="sliderForStandardOrder_item_content_holder_bottom">
                      <p className="itemOfListPrice">
                        {/* Cena po fotografiji: <span>{this.props.sendPricePerPhoto}</span> rsd */}
                        Cena po fotografiji: <span>{this.price()},00</span> rsd
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : this.redirect()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.getPhotos
  };
};

export default connect(mapStateToProps)(SliderForStandardOrder);
