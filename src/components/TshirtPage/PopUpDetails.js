import React, { Component } from "react";

class PopUpDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleClose = () => {
    this.props.visible(this.state);
  };

  render() {
    return (
      <div className="myCustomPopUp_wrapper">
        <div className="myCustomPopUp">
          <p>Otpremite fotografije sa uređaja, facebook-a ili instagram-a. Možete izabrati maksimum dve fotografije za štampanje na jednoj majici.</p>
          <button onClick={this.handleClose}>Ok</button>
        </div>
      </div>
    );
  }
}

export default PopUpDetails;
