'use client'
import styles from './styles.module.css';
import { useState, useEffect, use } from 'react';
import stylesG from '../stylesG.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
    const [formTicketData, setFormTicketData] = useState({
        ticket_category: '',
        ticket_supporter: '',
        ticket_description: '',
        ticket_generation_date: '',
        ticket_id: ''
    });

    const [formClientData, setFormClientData] = useState({
        client_name: '',
        client_lastname: '',
        client_age: '',
        client_sex: '',
        client_id: '',
        client_document: '',
        client_city: ''
    });

    const [isNewClient, setIsNewClient] = useState(false);
    const [supporters, setSupporters] = useState([])
    const [departments, setDepartments] = useState([])
    const [clientDocument, setClientDocument] = useState();

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
        async function getSupporters(){
            try{
                if(formTicketData.ticket_category !== ''){
                    let url = 'http://localhost:8000/api/supporters/?';
                    const params = new URLSearchParams();
                    params.append('department', formTicketData.ticket_category);
                    url += params.toString();
                    const response = await fetch(url);
                    const data = await response.json();
                    await setSupporters(data);
                }
            } catch (error) {
                console.error(error);
            }
        }   
        getSupporters();
    }, [formTicketData.ticket_category])

    const handleCheckbox = (e)=>{
        console.log('changing');
        setIsNewClient(!isNewClient);
    }

    const handleChangeReport = (e) => {
        const { name, value } = e.target;
        console.log(typeof(value));
        setFormTicketData({
            ...formTicketData,
            [name]: value
        });
    };

    const handleChangeClient = (e) => {
        const { name, value } = e.target;
        console.log(typeof(value));
        setFormClientData({
            ...formClientData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isNewClient){    
            setFormClientData({
                ...formClientData,
                [client_id] : uuidv4()
            })
        }else{
            setFormClientData({
                ...formClientData,
                client_document : clientDocument
            }) 
        }
        
        try{
            if(!isNewClient){
                let url = 'http://localhost:8000/api/clients/?';
                const params = new URLSearchParams();
                params.append('document', clientDocument);
                url += params.toString();
                console.log(url)
                const response = await fetch(url);
                const data = await response.json();
                setFormClientData((prevState)=>({
                    ...prevState,
                    client_id : data[0][0]
                }))
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        async function sendForm() {
            console.log(formClientData)

            const updatedFormReportData = {
                ...formTicketData,
                ticket_generation_date: new Date().toISOString().split('.')[0]
            };
            console.log(updatedFormReportData.ticket_generation_date);
            const formData = { 
                ...updatedFormReportData,
                ...formClientData,
                isNewClient : isNewClient,
                ticket_id : uuidv4()
    
            };

            console.log(formData)

            try {
                const response = await fetch('http://localhost:8000/api/tickets/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    // Handle successful response
                    console.log('Case submitted successfully');
                } else {
                    // Handle error response
                    console.error('Failed to submit case');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        sendForm();
    },[formClientData.client_id])

    return(
        <form onSubmit={handleSubmit} className={stylesG.form}>
            <div className={stylesG.input__main__container}>

                <div className={stylesG.input__container}>
                    <h3 className={stylesG.form__titles}>Información del cliente</h3>
                    <div className={stylesG.newSelector__container}>
                        <label>Cliente existente:</label>
                        <input className={styles.form__element} type='checkbox' onChange={handleCheckbox}></input>
                    </div>
                    <div className={isNewClient? stylesG.newClient__container : stylesG.nonNewClient__container}>
                        {
                            isNewClient? (
                                <>
                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor="client_name">Nombre:</label>
                                        <input className={styles.form__element} type="text" name="client_name" onChange={handleChangeClient} placeholder="Victor" required />
                                    </div>
                                    
                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor="client_lastname">Apellido:</label>
                                        <input className={styles.form__element} type="text" name="client_lastname" onChange={handleChangeClient} placeholder="Mejias" required /> 
                                    </div>
                                    
                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor='client_document' >Documento:</label>
                                        <input className={styles.form__element} type='number' name='client_document' onChange={handleChangeClient} required></input>
                                    </div>

                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor='client_city'>Ciudad:</label>
                                        <select name='client_city' onChange={handleChangeClient} required>
                                            <option value='' ></option>
                                            <option value='Barcelona'>Barcelona</option>
                                            <option value='Lecherias'>Lecherias</option>
                                            <option value='Puerto la cruz'>Puerto la cruz</option>
                                        </select>
                                    </div>

                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor="client_age">Edad:</label>
                                        <input className={styles.form__element} type="number" name="client_age" onChange={handleChangeClient} placeholder="21" required />
                                    </div>

                                    <div className={stylesG.form__element__container}>
                                        <label htmlFor="client_sex">Sexo:</label>
                                        <select name="client_sex" onChange={handleChangeClient} required className={styles.form__element}>
                                            <option value=""></option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                </>
                            ) :
                                <>
                                <div className={stylesG.form__element__container}>
                                    <label htmlFor='client_document'>Documento del cliente:</label>
                                    <input className={styles.form__element} type='text' name='client_document' onChange={(e)=>{
                                        setClientDocument(e.target.value)
                                        console.log(clientDocument)
                                    }}required></input>
                                </div>
                                </>
                        }
                    </div>
                </div>

                <div className={stylesG.input__container}>
                    <h3 className={stylesG.form__titles}>Datos</h3> 
                    
                    <div className={stylesG.data__input__container}>
                        <div className={stylesG.form__element__container}>
                            <label htmlFor="ticket_category">Departamento:</label>
                            <select className={styles.form__element} name="ticket_category" onChange={handleChangeReport} required className={styles.form__element}>
                                <option value=""></option>
                                {departments.map((department)=>{
                                    return(
                                        <option key={department[0]} value={department[0]}>{department[1]}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className={stylesG.form__element__container}>
                            <label htmlFor="ticket_supporter">Supporter:</label>
                            <select className={styles.form__element} name="ticket_supporter" onChange={handleChangeReport} required className={styles.form__element}>
                                <option value=""></option>
                                {supporters.map((supporter)=>{
                                    return(
                                        <option key={supporter[0]} value={supporter[0]}>{supporter[1]}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className={stylesG.form__element__container}>
                            <label htmlFor="ticket_description">Descripción:</label>
                            <textarea className={`${stylesG.form__element} ${stylesG.textarea}`} name="ticket_description" onChange={handleChangeReport} placeholder='Escriba la descripcion del caso aqui' required></textarea>
                        </div>    
                    </div>
                </div>
            </div>
            <div className={stylesG.form__submit__container}>
                <input type="submit" value="Enviar caso"  className={stylesG.btn}/>
            </div>
        </form>
    )
}