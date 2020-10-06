import React, { Component } from "react";

class Box extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div className="custom-box p-3 my-3">
        <div className="row text-black">
          <h3>PartnerID: {data.accessCardID}</h3>
          <h3>Name: {data.name}</h3>
        </div>
      </div>
    );
  }
}

export default Box;
