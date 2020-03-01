import React, { Component } from "react";
import "../../../globalStyle.css";
import "./bookStyle.css";

class ItemOfBookSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="itemOfBookSlider_component">
        <div className="itemOfBookSlider_holder">
          <div className="itemOfBookSlider">
            <div className="itemOfBookSlider_wrapper">
              {this.props.passFileToItemOfBook.map((item, index) => (
                <div>
                  {typeof item === "object" ? (
                    <div
                      className="itemOfBook_img_slider"
                      key={index}
                      style={{
                        background: `url(${item.url})`
                      }}
                    />
                  ) : (
                    <div
                      className="itemOfBook_img_slider"
                      key={index}
                      style={{
                        background: `url(${item})`
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="itemOfBookSlider_wrapper_text">
              <p className="itemOfBookSlider_p">Odabrane fotografije za:</p>
              <p className="itemOfBookSlider_spans">
                <span>BOOK {this.props.passBookFormat}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemOfBookSlider;
