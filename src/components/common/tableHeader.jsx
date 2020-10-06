import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((c) => (
            <th key={c.path}>{c.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
