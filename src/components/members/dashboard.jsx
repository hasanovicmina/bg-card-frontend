import React, { Component } from "react";
import Box from "./box";
import Nav from "./nav";
import moment from "moment";

import EarnPoints from "./earnPoints";
import RedeemPoints from "./redeemPoints";
import Transactions from "./transactions";
import { addPoints, getMember } from "../../services/memberService";
import { earnPoints } from "../../services/earnPoints";
import { redeemPoints } from "../../services/redeemPoints";

import { getMemberTransactions } from "../../services/transactions";
import auth from "../../services/authService";
import { toast } from "react-toastify";

class Dashboard extends Component {
  state = {
    data: {},
    blockData: {},
    segment: "earnPoints",
    earnPointsData: {},
    transactions: [],
  };

  async getMember() {
    const data = auth.getCurrentUser();

    if (data) {
      const member = await getMember(data._id);
      this.setState({ data: member.data });
    }
  }

  async getTransactions() {
    const { data: member } = this.state;
    const m = await getMemberTransactions(member._id);

    let transactions = m.data;

    // transactions.map((t) => {
    //   t.date = moment(t.date).format("DD/MM/YY hh:mm:ss a");
    // });

    this.setState({ transactions });
  }

  async componentDidMount() {
    await this.getMember();
    await this.getTransactions();
  }

  handleTabChange = (segment) => {
    this.setState({ segment });
  };

  handleEarnPoints = async (partnerID, partner_id, itemID, newPoints) => {
    const data = { ...this.state.data };
    data.points += newPoints;
    const memberID = data._id;

    //data.points is sum of all points for a member
    //newPoints are just points that are earned by purchasing an item

    const { data: responseData } = await earnPoints(
      memberID,
      partnerID,
      partner_id,
      itemID,
      data.points,
      newPoints
    );

    this.setState({ data: responseData });
    toast.success("Successfully earned point. Nice!");
  };

  handleRedeemPoints = async (partnerID, partner_id, itemID, newPoints) => {
    const data = { ...this.state.data };
    data.points -= newPoints;
    const memberID = data._id;

    const { data: responseData } = await redeemPoints(
      memberID,
      partnerID,
      partner_id,
      itemID,
      data.points,
      newPoints
    );

    this.setState({ data: responseData });
    toast.success("Successfully redeemed points. Nice!");
  };

  render() {
    const { segment, data, transactions } = this.state;
    return (
      <div className="container pt-2">
        <Box data={this.state.data} />
        <div>
          <p className="mt-5 p-3">
            Welcome {this.state.data.firstName}! Now you can earn points by
            purchasing tickets for everything Belgrade has to offer!
          </p>
        </div>
        <Nav onClick={this.handleTabChange} selected={this.state.segment} />
        <hr />
        {segment === "earnPoints" && (
          <EarnPoints onClick={this.handleEarnPoints} />
        )}
        {segment === "redeemPoints" && (
          <RedeemPoints onClick={this.handleRedeemPoints} />
        )}
        {segment === "transactions" && (
          <div>
            <Transactions member={data} transactions={transactions} />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
