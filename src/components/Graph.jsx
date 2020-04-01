import React from "react";

import { Line } from "react-chartjs-2";

const Graph = ({ chart, country }) => {
  return (
    <Line
      data={chart}
      height={400}
      options={{
        maintainAspectRatio: false,
        title: {
          display: true,
          text: `Covid-19 Historic Info Of ${country}`,
          fontSize: 25
        },
        legend: {
          display: true,
          position: "bottom"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "index",
          intersect: false
        }
      }}
    />
  );
};

export default Graph;
