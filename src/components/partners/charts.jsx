import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

class Charts extends Component {
  state = {
    chartData: {
      labels: ["Allocated points", "Redeemed points"],
      datasets: [
        {
          label: "Points",
          data: [],
          backgroundColor: ["rgb(46, 184, 46)", "rgb(255, 140, 26)"],
        },
      ],
    },
    barData: {
      labels: ["Allocated points", "Redeemed points"],
      datasets: [
        {
          label: "Points",
          data: [],
          backgroundColor: ["rgb(46, 184, 46)", "rgb(255, 140, 26)"],
        },
      ],
    },
  };

  componentDidMount() {
    const { transactions } = this.props;
    let allocatedPoints = 0;
    let redeemedPoints = 0;
    console.log(transactions, "FROM chart");

    transactions.map((t) => {
      t.type === "earned_points"
        ? (allocatedPoints += t.points)
        : (redeemedPoints += t.points);
    });
    console.log(allocatedPoints, "allocated");

    const chartData = { ...this.state.chartData };
    chartData.datasets[0].data = [allocatedPoints, redeemedPoints];
    this.setState({ chartData });
  }
  render() {
    const { chartData } = this.state;
    if (
      chartData.datasets[0].data.length === 0 ||
      (chartData.datasets[0].data[0] === 0 &&
        chartData.datasets[0].data[1] === 0)
    )
      return <p>There is no relative data for charts. Sorry!</p>;
    return (
      <div>
        <Doughnut data={chartData} />
        {/* <Bar data={chartData} /> */}
      </div>
    );
  }
}

export default Charts;
