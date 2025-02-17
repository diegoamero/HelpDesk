import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

/*const mayor = {
    name: '',
    numCases: 0,
};
const data = [
    {
        name: 'Maracaibo',
        numCases:300,
    },
    {
        name: 'Caracas',
        numCases: 242,
    },
    {
        name: 'Valencia',
        numCases: 120,
    },
    {
        name: 'Lecheria',
        numCases: 50,
    },
]*/

function City() {
    const [tickets, setTickets] = useState([]);
    const [clients, setClients] = useState([]);
    const [data, setData] = useState([
        {
            name: 'Barcelona',
            numCases:0,
        },
        {
            name: 'Lecherias',
            numCases: 0,
        },
        {
            name: 'Puerto la cruz',
            numCases: 0,
        }
    ]);
    const [mayor, setMayor] = useState({
        name:'',
        numCases: 0
    })

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
        let barcelona = 0;
        let lecherias = 0;
        let puerto = 0
        tickets.map((ticket)=>{
            clients.map((client)=>{
                if(ticket[7] === client[0]){
                    if(client[4] === 'Barcelona'){
                        barcelona++
                    }else if(client[4] === 'Lecherias'){
                        lecherias++
                    }else if(client[4] === 'Puerto la cruz'){
                        puerto++
                    }
                }
            })
        })

        const handleClick = (index) => {
            setData(prevState => {
                const newData = [...prevState];
                newData[0].numCases = barcelona,
                newData[1].numCases = lecherias,
                newData[2].numCases = puerto
                return newData;
            });
        };

        handleClick()
    },[clients, tickets])

  return (
    <div className={styles.city} height={300} width={300}>
        {   
            data.map((ciudad)=>{
                if(ciudad.numCases > mayor.numCases) {
                    mayor.numCases = ciudad.numCases;
                    mayor.name = ciudad.name;
                }
            })
        }
        <h3 className={styles.chartTitles}>Ciudad con más reportes</h3>
        <p className={styles.chartTitles}>{mayor.name}</p>
    </div>
  )
}

export default City