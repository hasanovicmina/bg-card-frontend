import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  createKey = (item, column) => {
    return item._id + column.path;
  };

  renderCell = (item, column) => {
    return _.get(item, column.path);
  };
  render() {
    const { columns, data } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
