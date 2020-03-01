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
          <p>
            Odaberite format koji želite na vrhu stranice, koju fotografiju, ram i
            koliko komada, a zatim potvrdite odabir na dnu stranice.
          </p>
          <button onClick={this.handleClose}>Ok</button>
        </div>
      </div>
    );
  }
}

export default PopUpDetails;
