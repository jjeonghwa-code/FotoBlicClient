import React from "react";
import "./imageSelect.css";

class ImageSelect extends React.Component {
  state = {
    selectedImages: []
  };
  constructor(props) {
    super(props);
  }

  handleClick = (e, img) => {
    if(e.currentTarget.classList.contains("selected_image")){
      e.currentTarget.classList.remove("selected_image");
    } else {
      e.currentTarget.classList.add("selected_image")
    }
    let newState = this.state.selectedImages;
    let indexOfNewImg = newState.indexOf(img);
    indexOfNewImg === -1
      ? newState.push(img)
      : newState.splice(indexOfNewImg, 1);

    this.setState({
      selectedImages: newState,
      isPickedPhoto: true
    });

    this.props.handleImagePick(img);
    this.props.isPicked(true);
  };

  render() {
    return (
      <div className="image_select_container">
        {/* {this.props.images.length && this.props.fb ? (
          <h1>Facebook Photos</h1>
        ) : null}
        {this.props.images.length && this.props.insta ? (
          <h1>Instagram Photos</h1>
        ) : null} */}
        {this.props.images.length
          ? this.props.images.map((el, i) => {
              if (this.props.fb || this.props.insta) {
                return (
                  <div
                    key={i}
                    onClick={(e) => this.handleClick(e, el.biggest)}
                  >
                    <img src={el.biggest} alt="yourPic" />
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    onClick={(e) => this.handleClick(e, el)}
                  >
                    <img src={el.url} alt="yourPic" />
                  </div>
                );
              }
            })
          : null}
      </div>
    );
  }
}

ImageSelect.defaultProps = {
  fb: false,
  insta: false
};

export default ImageSelect;
