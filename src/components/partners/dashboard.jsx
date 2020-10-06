import React, { Component } from "react";
import moment from "moment";
import auth from "../../services/authService";
import Box from "./box";
import { getPartner } from "../../services/partnerService";
import {
  getPartnerTransactions,
  getPartnerTransactionsBlock,
} from "../../services/transactions";
import Transactions from "./transactions";
import Nav from "./nav";
import InsertItems from "./insertItems";
import Charts from "./charts";

class Dashboard extends Component {
  state = {
    data: {},
    segment: "insertItems",
    transactions: [],
  };

  async getPartner() {
    const data = auth.getCurrentUser();

    if (data) {
      const partner = await getPartner(data._id);
      this.setState({ data: partner.data });
    }
  }

  async getTransactions() {
    const { data: partner } = this.state;

    const { data: transactions } = await getPartnerTransactions(partner._id);
    // earnPointsTransactions.map((t) => {
    //   t.timestamp = moment(t.timestamp).format("DD/MM/YY hh:mm:ss a");
    //   t.type = "Earned points";
    // });
    this.setState({ transactions });
  }

  async componentDidMount() {
    await this.getPartner();
    await this.getTransactions();
  }

  handleTabChange = (segment) => {
    this.setState({ segment });
  };

  loadSidebar() {
    //populate sidebar
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">ONE</li>
            <li className="nav-item">TWO</li>
            <li className="nav-item">THREE</li>
          </ul>
        </div>
      </nav>
    );
  }

  loadMain() {
    const { segment, data, transactions } = this.state;
    return (
      <div className="container pt-2">
        <Box data={data} />

        <div>
          <p className="mt-5 p-3">
            Welcome {data.name}! Explore what your clients have been up to!
          </p>
        </div>
        <Nav onClick={this.handleTabChange} selected={segment} />
        <hr />
        {segment === "insertItems" && <InsertItems data={data} />}
        {segment === "charts" && (
          <Charts partner={data} transactions={transactions} />
        )}
        {segment === "transactions" && (
          <div>
            <Transactions partner={data} transactions={transactions} />
          </div>
        )}
      </div>
    );
  }
  render() {
    console.log("dashboard state : " + this.state.data);
    return (
      <div className="container">
        {/* {this.loadSidebar()} */}
        {this.loadMain()}
      </div>
    );
  }
}

export default Dashboard;
