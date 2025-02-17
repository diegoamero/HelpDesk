import React, { use, useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function SearchForm(props) {

    const [formReportData, setFormReportData] = useState({
        ticket_id: '',
        client_id: '',
        supporter_id: '',
        ticket_generation_date: '',
        ticket_close_date: '',
        ticket_status: '',
        ticket_category: ''
    });

    const [departments, setDepartments] = useState([])
    const [clientName, setClientName] = useState('');
    const [clientId, setClientId] = useState('');
    const [supporterName, setSupporterName] = useState('');
    const [supporterId, setSupporterId] = useState('');

    useEffect(()=>{
        async function getDepartments(){
            try{
                const response = await fetch('http://localhost:8000/api/departments/');
                const data = await response.json();
                await setDepartments(data);
            } catch (error) {
                console.error(error);
            }
        }   
        getDepartments();
    },[])

    useEffect(()=>{
        console.log(formReportData);
        props.onSubmit(formReportData);
    }, [formReportData.client_id, formReportData.supporter_id]);

    async function getSupporterID(supporter_name){
        try{
            let url = 'http://localhost:8000/api/supporters/?'
            const params = new URLSearchParams();
            params.append('name', supporter_name);
            url += params.toString()
            const response = await fetch(url);
            const data = await response.json();
            console.log(data[0][0])
            return data[0][0]
        }catch{
            return null;
        }
    }

    async function getClientID(client_name){
        try{
            let url = 'http://localhost:8000/api/clients/?'
            const params = new URLSearchParams();
            params.append('name', client_name);
            url += params.toString()
            const response = await fetch(url);
            const data = await response.json();
            return data[0][0]
        }catch{
            return null;
        }
    }

    const handleChangeReport = (e) => {
        if(e.target.name === 'client_name'){
            setClientName(e.target.value)
            console.log(e.target.value)
        }else if(e.target.name === 'supporter_name'){
            setSupporterName(e.target.value)
            console.log(e.target.value)
        }else{
            const { name, value } = e.target;
            console.log(name, value);
            setFormReportData({
                ...formReportData,
                [name]: value === ''? '' : value
            });
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        formReportData.client_id = '';
        formReportData.supporter_id = '';
        let clientIdResult = null;
        let supporterIdResult = null;
        if(clientName !== ''){
            clientIdResult = await getClientID(clientName);
        }
        if(supporterName !== ''){
            supporterIdResult = await getSupporterID(supporterName);
        }
        setFormReportData(prevData => ({
            ...prevData,
            client_id: clientIdResult !== null ? clientIdResult : prevData.client_id,
            supporter_id: supporterIdResult !== null ? supporterIdResult : prevData.supporter_id
        }));
    };

    const handleReset = () => {
        setFormReportData({ // Restablece el estado a los valores iniciales
            ticket_id: '',
            client_name: '',
            supporter_name: '',
            ticket_generation_date: '',
            ticket_close_date: '',
            ticket_status: '',
            ticket_category: ''
        });
        setClientName('');
        setSupporterName('');
        console.log(formReportData)
        console.log(clientName)
        console.log(supporterName)
    };

    return(
        <form className={styles.searchForm} onSubmit={handleSubmit} onReset={handleReset}>
            <input className={styles.formInput} type="text" name="ticket_id" placeholder="ID del reporte" onChange={handleChangeReport}/>
            <input className={styles.formInput} type="text" name="client_name" placeholder="Nombre del cliente" onChange={handleChangeReport}/>
            <input className={styles.formInput} type="text" name="supporter_name" placeholder="Nombre del supporter" onChange={handleChangeReport}/>
            <input className={styles.formInput} type="date" name="ticket_generation_date" placeholder="Fecha de registro" onChange={handleChangeReport}/>
            <input className={styles.formInput} type="date" name="ticket_close_date" placeholder="Fecha de cierre" onChange={handleChangeReport}/>

            <select className={styles.formInput} name="ticket_status" onChange={handleChangeReport}>
                <option value=""></option>
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
            </select>

            <select className={styles.formInput} name="ticket_category" onChange={handleChangeReport}>
                <option value=""></option>
                {departments.map((department)=>{
                        return(
                            <option key={department[0]} value={department[0]}>{department[1]}</option>
                        )
                })}
            </select>
            <button className={styles.formButton} type='reset'>Limpiar</button>
            <button className={styles.formButton} type="submit">Buscar</button>
        </form>
    )
}