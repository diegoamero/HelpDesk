import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarrasSimples = () => {
  const [fetched, setFetched] = useState([]);
  const [data, setData] = useState([
    {
      name: 'Contabilidad',
      mas: 0,
      fem: 0,
    },
    {
      name: 'IT',
      mas: 0,
      fem: 0,
    },
    {
      name: 'Legal',
      mas: 0,
      fem: 0,
    },
    {
      name: 'Mercadeo',
      mas: 0,
      fem: 0,
    },
  ]);

  useEffect(()=>{
    async function getData(){
      try{
        const response = await fetch('http://localhost:8000/api/getGraph2/');
        const data = await response.json();
        await setFetched(data);
      }catch(e){
        console.error(e)
      }
    }
    getData()
  },[])

  useEffect(() => {
    if (fetched.length > 0) { // Verifica que fetched tenga datos antes de procesarlos
      const newData = data.map(item => {
        const fetchedItem = fetched.find(f => {
          return (f[0] === 'PYME2' && item.name === 'Contabilidad') ||
                 (f[0] === 'PYME3' && item.name === 'IT') ||
                 (f[0] === 'PYME4' && item.name === 'Legal') ||
                 (f[0] === 'PYME5' && item.name === 'Mercadeo');
        });

        return {
          ...item,
          mas: fetchedItem ? fetchedItem[1] : 0,
          fem: fetchedItem ? fetchedItem[2] : 0,
        };
      });
      setData(newData);
    }
  }, [fetched]);

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