import React, { Component } from "react";
import ChooseFotobook from "./ChooseFotobook/ChooseFotobook";

class BookPage extends Component {
  render() {
    return (
      <div className="bookPage_component">
        <ChooseFotobook format={this.props.location.format} file={this.props.location.file}/>
      </div>
    );
  }
}

export default BookPage;
