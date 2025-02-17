import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useState, useEffect} from 'react';
const data = [
  {
    name: 'Sem1',
    mas: 30,
    fem: 70,
  },
  {
    name: 'Sem2',
    mas: 40,
    fem: 45,
  },
  {
    name: 'Sem3',
    mas: 80,
    fem: 120
  },
  {
    name: 'Sem4',
    mas: 60,
    fem: 67,
  }
];

const VerticalComposedChart = () => {
  const [fetched, setFetched] = useState([]);
  const [data, setData] = useState([
    {
      name: 'Sem1',
      mas: 0,
      fem: 0,
    },
    {
      name: 'Sem2',
      mas: 0,
      fem: 0,
    },
    {
      name: 'Sem3',
      mas: 0,
      fem: 0
    },
    {
      name: 'Sem4',
      mas: 0,
      fem: 0,
    }
  ]);

  useEffect(()=>{
      async function getData(){
        try{
          const response = await fetch('http://localhost:8000/api/getGraph3/');
          const data = await response.json();
          await setFetched(data);
        }catch(e){
          console.error(e)
        }
      }
      getData()
    },[])

  useEffect(()=>{
    const handleSaveData = () => {
      const formattedData = data.map((week, index) => {
        return {
          ...week,
          mas: fetched.reduce((sum, item) => sum + (item[0] === 'Masculino' ? item[index + 1] : 0), 0),
          fem: fetched.reduce((sum, item) => sum + (item[0] === 'Femenino' ? item[index + 1] : 0), 0)
        };
      });
  
      setData(formattedData);
    };
    handleSaveData()
    console.log(data)
  },[fetched])

  return (
    <ResponsiveContainer width="95%" height="85%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="mas" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="fem" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VerticalComposedChart;