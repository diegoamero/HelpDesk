'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';
import styles from './styles.module.css'

const datos = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={datos}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {datos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const data = [
  { name: 'Enero', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Febrero', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Marzo', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Abril', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Mayo', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Junio', uv: 239, pv: 3800, amt: 2500 },
];

export default function Page() {
  return (
    <div className={styles.dashboard}>
      <div>
      <h1>Reporte mensual</h1>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
      <div style={{ width: '500px', height: '300px' }}> {/* Set a specific width and height */}
      <PieChartComponent />
    </div>
    </div>
  );
}
