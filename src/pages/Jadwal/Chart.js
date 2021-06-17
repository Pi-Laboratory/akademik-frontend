import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
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
  console.log(props);
  const { cx, cy, stroke, payload: task, value } = props;
  const startTimestamp = task.startDate.getTime();
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

  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="green"
      viewBox="0 0 1024 1024"
    >
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
    </svg>
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