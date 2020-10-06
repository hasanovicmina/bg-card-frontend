import React, { Component } from "react";

class Box extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div className="custom-box p-3 my-3">
        <div className="row text-black">
          <h3>Account: {data.accountNum}</h3>
          <h3>Name: {data.firstName}</h3>
          <h3>Points: {data.points}</h3>
        </div>
      </div>
    );
  }
}

export default Box;
