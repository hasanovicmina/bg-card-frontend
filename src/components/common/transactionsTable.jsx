import React, { Component } from "react";
import Table from "./table";

class TransactionsTable extends Component {
  render() {
    const { transactions, columns } = this.props;
    console.log("TRANSACTIONS TABLE " + transactions);

    return <Table columns={columns} data={transactions} />;
  }
}

export default TransactionsTable;
