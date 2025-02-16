import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Junio',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Julio',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Agosto',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Septiembre',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Octubre',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Noviembre',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/vertical-composed-chart-6r8xmw';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
