import React, { Component } from "react";

class SuccessSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  success = () => {
    this.props.success(true);
  };
  render() {
    return (
      <div className="custom_success_popup">
        <div className="custom_success_popup_holder">
          <p>
            Uspešno ste prijavili problem, odgovorićemo vam u što kraćem roku.
            Hvala
          </p>
          <button onClick={this.success}>OK</button>
        </div>
      </div>
    );
  }
}

export default SuccessSupport;
