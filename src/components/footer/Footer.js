import React, { Component } from "react";
import "../../globalStyle.css";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openPopup = () => {
    this.props.isOpen(true);
  };

  render() {
    return (
      <div className="footer_component">
        <div className="footer_component_wrap">
          <div className="container">
            <div className="footer_holder">
              <p>&copy; 2019.Foto Blic i Urošević.Sva prava zadržana.</p>
              <p className="footer_link" onClick={this.openPopup}>
                Tehnička podrška
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
