import React, { Component } from "react";
import TransactionsTable from "../common/transactionsTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

class Transactions extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
  };
  columns = [
    {
      path: "date",
      label: "Date",
    },
    {
      path: "member._id",
      label: "Member account",
    },
    {
      path: "points",
      label: "Points",
    },
    {
      path: "type",
      label: "Type of transaction",
    },
  ];

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const data = this.props.transactions;
    const { currentPage, pageSize } = this.state;

    const newTransactions = paginate(data, currentPage, pageSize);
    return newTransactions;
  };

  render() {
    const { length } = this.props.transactions;
    const { currentPage, pageSize } = this.state;
    if (length === 0) return <p>There are no transactions yet.</p>;
    const newTransactions = this.getPagedData();
    return (
      <div className="container">
        <h1>Transactions</h1>
        <h5>There are {length} transactions</h5>
        <TransactionsTable
          transactions={newTransactions}
          columns={this.columns}
        />
        <Pagination
          itemsCount={length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Transactions;
