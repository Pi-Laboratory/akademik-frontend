import React, { PureComponent } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const tasks = [
  {
    startDate: new Date("Sun Dec 09 00:00:00 EST 2012"),
    endDate: new Date("Sun Dec 09 01:00:00 EST 2012"),
    name: "Matematika",
    status: "FAILED"
  },
  {
    startDate: new Date("Sun Dec 09 01:00:00 EST 2012"),
    endDate: new Date("Sun Dec 09 02:00:00 EST 2012"),
    name: "Fisika",
    status: "RUNNING"
  },
  {
    startDate: new Date("Sun Dec 09 01:00:00 EST 2012"),
    endDate: new Date("Sun Dec 09 02:00:00 EST 2012"),
    name: "Maintenance and Repair",
    status: "RUNNING"
  },

  {
    startDate: new Date("Sun Dec 09 02:00:00 EST 2012"),
    endDate: new Date("Sun Dec 09 03:00:00 EST 2012"),
    name: "ELektronika Analog",
    status: "RUNNING"
  }
];

function convertTasksToRechartsData(tasks) {
  const minTimestamp = tasks[0].startDate.valueOf();

  return tasks.map((task) => {
    const startTimestamp = task.startDate.getTime();
    const duration = task.endDate.valueOf() - startTimestamp;
    return {
      ...task,
      value: startTimestamp - minTimestamp + duration / 2
    };
  });
}

const noLine = () => ({
  lineStart() {},
  lineEnd() {},
  point(x, y) {}
});

const CustomizedDot = (props) => {
  const { cx, cy, payload: task } = props;
  // const width = task.endDate.valueOf() - startTimestamp;
  const width = 80;
  const height = 16;
  return (
    <rect
      width={width}
      height={height}
      x={cx - width / 3}
      y={cy - height / 2}
      fill={task.status === "FAILED" ? "red" : "green"}
    />
  );
};

// const XAxisTickFormatter = (value) => {
//   console.log(args);
// };

class Chart extends PureComponent {
  render() {
    return (
      <LineChart
        layout="vertical"
        width={900}
        height={300}
        data={convertTasksToRechartsData(tasks)}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(value) => value} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Line
          dataKey="value"
          type={noLine}
          stroke="#8884d8"
          dot={CustomizedDot}
          activeDot={false}
          legendType="none"
          isAnimationActive={false}
        />
      </LineChart>
    );
  }
}

export default Chart;