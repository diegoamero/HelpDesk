'use client'
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {

    const [formCaseManager, setformCaseManager] = useState({
        manager_id: '',
        manager_first_name: '',
        manager_last_name: '',
        manager_sex : ''
    });

    const handleChangeCaseManager = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setformCaseManager({
            ...formCaseManager,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formCaseManager);

        try {
            const response = await fetch('http://localhost:8000/api/casemanagers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formCaseManager)
            });
            if (response.ok) {
                // Handle successful response
                console.log('Case manager successfully registred');
                alert('Registro exitoso');
            } else {
                // Handle error response
                console.error('Failed to submit case manager register');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input__container}>
                <h3>Ingresa los datos del nuevo gestor de casos</h3>
                <div className={styles.form__element__container}>
                    <label className={styles.form__element_title} htmlFor="manager_id">ID:</label>
                    <input className={styles.form__element_input} type="number" name="manager_id" onChange={handleChangeCaseManager} placeholder="20" required />
                </div>
                <div className={styles.form__element__container}>
                    <label className={styles.form__element_title} htmlFor="manager_first_name">Nombre:</label>
                    <input className={styles.form__element_input} type="text" name="manager_first_name" onChange={handleChangeCaseManager} placeholder="Diego" required />
                </div>
                <div className={styles.form__element__container}>
                    <label className={styles.form__element_title} htmlFor="manager_lastt_name_last_name">Apellido:</label>
                    <input className={styles.form__element_input} type="text" name="manager_last_name" onChange={handleChangeCaseManager} placeholder="Mejia" required />
                </div>
                <div className={styles.form__element__container}>
                    <label className={styles.form__element_title} htmlFor="manager_lastt_name_last_name">Sexo:</label>
                    <select name="manager_sex" onChange={handleChangeCaseManager}>
                        <option value=""></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Mujer">Otro</option>
                    </select>
                </div>
            </div>
            <input type="submit" value="Registrar" className={styles.btn} />
        </form>
    )
}