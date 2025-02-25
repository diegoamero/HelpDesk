import React, { use, useEffect, useState } from 'react';
import { preconnect } from 'react-dom';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

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

const PieGrafico = () => {
    const [clients, setClients] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [data, setData] = useState([
        { name: 'Masculino', value: 65 },
        { name: 'Femenino', value: 73 },
        { name: 'Otro', value: 10 },
    ])

    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch('http://localhost:8000/api/clients/');
                const data = await response.json();
                await setClients(data);
            } catch (error) {
                console.error(error);
            }

            try{
                const response = await fetch('http://localhost:8000/api/tickets/');
                const data = await response.json();
                await setTickets(data);
            } catch (error) {
                console.error(error);
            }

        }   
        getData();
    },[])

    useEffect(()=>{
        let Masculino = 0;
        let Femenino = 0;
        let Otro = 0
        tickets.map((ticket)=>{
            clients.map((client)=>{
                if(ticket[7] === client[0]){
                    if(client[6] === 'Masculino'){
                        Masculino++
                    }else if(client[6] === 'Femenino'){
                        Femenino++
                    }else{
                        Otro++
                    }
                }
            })
        })

        const handleClick = (index) => {
            setData(prevState => {
              const newData = [...prevState];
              newData[0].value = Masculino,
              newData[1].value = Femenino,
              newData[2].value = Otro
              return newData;
            });
        };

        handleClick()
    },[clients, tickets])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieGrafico;
