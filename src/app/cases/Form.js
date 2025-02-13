'use client'
import styles from './styles.module.css';
import { useState } from 'react';
export default function Form() {
    const [formReportData, setFormReportData] = useState({
        manager_id: '',
        priority: '',
        status: '',
        description: ''
    });

    const [formReporterData, setFormReporterData] = useState({
        reporter_first_name: '',
        reporter_last_name: '',
        reporter_age: '',
        reporter_sex: ''
    });

    const handleChangeReport = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormReportData({
            ...formReportData,
            [name]: value
        });
    };

    const handleChangeReporter = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormReporterData({
            ...formReporterData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormReportData = {
            ...formReportData,
            register_date: new Date().toISOString().split('.')[0]
        };
        console.log(updatedFormReportData.register_date);
        const formData = { 
            ...updatedFormReportData,
            ...formReporterData
        };

        console.log(formData);

        try {
            const response = await fetch('http://localhost:8000/api/report/create/', {
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
    };

    return(
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input__container}>
                    <h3>Información del cliente</h3>

                    <label htmlFor="reporter_first_name">Nombre:</label>
                    <input className={styles.form__element} type="text" name="reporter_first_name" onChange={handleChangeReporter} placeholder="Victor" required />
                    
                    <label htmlFor="reporter_last_name">Apellido:</label>
                    <input className={styles.form__element} type="text" name="reporter_last_name" onChange={handleChangeReporter} placeholder="Mejias" required />
                    
                    <label htmlFor="reporter_age">Edad:</label>
                    <input className={styles.form__element} type="number" name="reporter_age" onChange={handleChangeReporter} placeholder="21" required />
                                   
                    <label htmlFor="reporter_sex">Sexo:</label>
                    <select name="reporter_sex" onChange={handleChangeReporter} value={formReporterData.reporter_sex} required className={styles.form__element}>
                        <option value=""></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className={styles.input__container}>
                    <h3>Datos</h3> 
                    <label htmlFor="manager_id">ID del operador:</label>
                    <input className={styles.form__element} type="number" name="manager_id" onChange={handleChangeReport} placeholder="ID operador" required />
                    
                    <label htmlFor="priority">Urgencia del caso:</label>
                    <select name="priority" onChange={handleChangeReport} value={formReportData.priority} required className={styles.form__element}>
                        <option value=""></option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    
                    <label htmlFor="status">Estado del caso:</label>
                    <select name="status" onChange={handleChangeReport} value={formReportData.status} required className={styles.form__element}>
                        <option value=""></option>
                        <option value="Cerrado">Cerrado</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Pausado">Pausado</option>
                    </select>
                </div>

                <label htmlFor="description">Descripción:</label>
                <textarea className={`${styles.form__element} ${styles.textarea}`} name="description" onChange={handleChangeReport} placeholder='Escriba la descripcion del caso aqui' required></textarea>
                
                <input type="submit" value="Enviar caso" className={styles.btn}/>
            </form>
        </div>
    )
}