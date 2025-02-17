'use client'
import React, { useState, useEffect, use } from 'react';
import SearchForm from './SearchForm';
import styles from './styles.module.css';

export default function Table() {
    const [tickets, setTickets] = useState([]);
    const [newSearch, setNewSearch] = useState({
        ticket_id: '',
        client_id: '',
        supporter_id: '',
        ticket_generation_date: '',
        ticket_close_date: '',
        ticket_status: '',
        ticket_category: ''
    });
    const [clientNames, setClientNames] = useState({});
    const [supportersNames, setSupportersNames] = useState({});

    function isEmpty(formData){
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key] !== "") {
            return false;
          }
        }
        return true;
    } 
    
    async function getClientName(client_id){
        let url = 'http://localhost:8000/api/clients/?'
        const params = new URLSearchParams();
        params.append('client_id', client_id);
        url += params.toString()
        const response = await fetch(url);
        const data = await response.json();
        return data[0][1];
    }


    async function getSupporterName(supporter_id){
        let url = 'http://localhost:8000/api/supporters/?'
        const params = new URLSearchParams();
        params.append('id', supporter_id);
        url += params.toString()
        const response = await fetch(url);
        const data = await response.json();
        return data[0][1];
    }
    
    useEffect(() => {
        console.log(newSearch)
        async function fetchData() {
            if(isEmpty(newSearch)){
                try{
                    const response = await fetch('http://localhost:8000/api/tickets/');
                    const data = await response.json();
                    console.log(data);
                    setTickets(data);
                } catch (error) {
                    console.error(error);
                }
            }else{
                let url = "http://localhost:8000/api/tickets/?";
                const params = new URLSearchParams();
                for(const key in newSearch){
                    if(newSearch.hasOwnProperty(key) && newSearch[key] !== ""){
                        params.append(key, newSearch[key]);
                    }
                }
                url += params.toString();
                try{
                    console.log(url);
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    setTickets(data);
                } catch (error) {
                    console.error(error);
                }

            }

        };
        fetchData();
    }, [newSearch]);

useEffect(()=>{
    async function fetchClientNames() {
        const names = {};
        for (const ticket of tickets) { // Itera sobre los tickets
            const client_id = ticket[7];
            console.log(client_id);
            try {
              const name = await getClientName(client_id)
              names[client_id] = name;
            } catch (error) {
              console.error("Error fetching client name:", error);
              names[client_id] = "Error"; // O un valor por defecto
            }
        }
        setClientNames(names);
    }
    fetchClientNames();

    async function fetchSupportersNames() {
        const names = {};
        for (const ticket of tickets) { // Itera sobre los tickets
            const supporter_id = ticket[2];
            try {
              const name = await getSupporterName(supporter_id)
              names[supporter_id] = name;
            } catch (error) {
              console.error("Error fetching client name:", error);
              names[supporter_id] = "Error"; // O un valor por defecto
            }
        }
        setSupportersNames(names);
    }
    fetchSupportersNames();
}, [tickets])
    
    const handleReportData = (data) => {
        console.log('Data received from SearchForm:', data);
        setNewSearch(data);
        console.log(isEmpty(newSearch));
    };

    return(
        <div className={styles.searchTickets}>
            <SearchForm onSubmit={handleReportData}/>
            <table className={styles.searchTable}>
                <thead className={styles.tableHead}>
                    <tr key="header" className={styles.tableHeadRow}>
                        <th className={styles.headBox}>Ticket ID</th>
                        <th className={styles.headBox}>Departamento</th>
                        <th className={styles.headBox}>Supporter Name</th>
                        <th className={styles.headBox}>Client name</th>
                        <th className={styles.headBox}>Register Date</th>
                        <th className={styles.headBox}>Close Date</th>
                        <th className={styles.headBox}>Description</th>
                        <th className={styles.headBox}>Status</th>
                    </tr>
                </thead>
                <tbody className={styles.dataBody}>
                    {tickets.map((ticket, index) =>{
                        return(
                            <tr key={index} className={styles.dataRow}>
                                <td className={styles.dataBox}>{ticket[0]}</td>
                                <td className={styles.dataBox}>{ticket[1]}</td>
                                <td className={styles.dataBox}>{supportersNames[ticket[2]] || 'Cargando...'}</td>
                                <td className={styles.dataBox}>{clientNames[ticket[7]] || 'Cargando...'}</td>
                                <td className={styles.dataBox}>{ticket[4] == null? '' : ticket[4]}</td>
                                <td className={styles.dataBox}>{ticket[5]}</td>
                                <td className={styles.dataBox}>{ticket[6]}</td>
                                <td className={styles.dataBox}>{ticket[3]}</td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}