
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Reembolsos',
    mas: 1500,
    fem: 2500,
    fc: 4000,
  },
  {
    name: 'Aplicacion',
    mas: 3000,
    fem: 1398,
    fc: 2210,
  },
  {
    name: 'Repartidor',
    mas: 2000,
    fem: 9800,
    fc: 2290,
  },
  {
    name: 'Pedido',
    mas: 2780,
    fem: 3908,
    fc: 2000,
  },
];

const BarrasSimples = () => {
  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{color: 'black'}}/>
        <Legend />
        <Bar dataKey="fem" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="mas" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarrasSimples;