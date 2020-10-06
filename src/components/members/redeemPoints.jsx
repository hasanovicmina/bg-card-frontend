import React, { Component } from "react";
import { getPartners } from "../../services/partnerService";

class RedeemPoints extends Component {
  state = {
    partners: [],
    selected: { _id: "All" },
  };

  async componentDidMount() {
    const { data: partners } = await getPartners();
    this.setState({ partners });
  }

  handleChange = ({ currentTarget: input }) => {
    let selected = { ...this.state.selected };
    console.log("INPUT " + input.value);

    selected["_id"] = input.value;

    this.setState({ selected });
  };

  renderItem = (i, p) => {
    return (
      <div className="card" key={i._id}>
        <div className="card-body">
          <h5 className="card-title">{i.name}</h5>
          <p className="card-text">{i.description}</p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() =>
              this.props.onClick(p.partnerID, p._id, i._id, i.pointsToRedeem)
            }
          >
            Buy and redeem {i.pointsToRedeem} points!
          </a>
        </div>
      </div>
    );
  };

  renderAllPartners = () => {
    return this.state.partners.map((p) =>
      p.items.map((i) => this.renderItem(i, p))
    );
  };

  renderOnePartner = (id) => {
    return this.state.partners.map(
      (p) => p._id === id && p.items.map((i) => this.renderItem(i, p))
    );
  };

  render() {
    const { partners } = this.state;

    return (
      <div>
        <h3>Redeem points through purchase</h3>
        <div className="form-group m-3 p-3">
          <label>Choose the place where you want to redeem points</label>
          <select className="form-control" onChange={this.handleChange}>
            <option value="All">All</option>
            {partners.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-container">
          {this.state.selected._id === "All"
            ? this.renderAllPartners()
            : this.renderOnePartner(this.state.selected["_id"])}
        </div>
      </div>
    );
  }
}

export default RedeemPoints;
