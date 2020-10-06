import React, { Component } from "react";

class Nav extends Component {
  state = {};

  chooseClass = (name) => {
    if (name === this.props.selected) {
      return "nav-link active";
    } else return "nav-link";
  };

  render() {
    return (
      <div className="row pills">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
              onClick={() => this.props.onClick("earnPoints")}
              className={this.chooseClass("earnPoints")}
            >
              Earn Points
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => this.props.onClick("redeemPoints")}
              className={this.chooseClass("redeemPoints")}
            >
              Redeem Points
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => this.props.onClick("transactions")}
              className={this.chooseClass("transactions")}
            >
              Transactions
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
