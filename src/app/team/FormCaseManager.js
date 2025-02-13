'use client'
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {

    const [formCaseManager, setformCaseManager] = useState({
        caseManager_id: '',
        caseManager_name: '',
        caseManager_lastname: '',
    });

    const [id, setId] = useState('');

    useEffect(() => {
        setId(uuidv4());
    }, []);

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
        const updatedformCaseManager = {
            ...formCaseManager,
        };

        const formData = {
            ...updatedformCaseManager,
        };

        console.log(formData);

        try {
            const response = await fetch('http://localhost:8000/api/casemanagers/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle successful response
                console.log('Case manager successfully registred');
            } else {
                // Handle error response
                console.error('Failed to submit case manager register');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.input__container}>
                <h3>Ingresa los datos del nuevo gestor de casos</h3>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="case_manager_first_name">Nombre:</label>
                    <input className={styles.form__element_input} type="text" name="case_manager_first_name" onChange={handleChangeCaseManager} placeholder="Diego" required />
                </div>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="case_manager_lastt_name_last_name">Apellido:</label>
                    <input className={styles.form__element_input} type="text" name="case_manager_last_name" onChange={handleChangeCaseManager} placeholder="Mejia" required />
                </div>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="case_manager_id">Id:</label>
                    <input className={styles.form__element_input} type="text" name="case_manager_id" value={id} onChange={handleChangeCaseManager} placeholder="21" readOnly />
                </div>
            </div>
            <input type="submit" value="Registrar" className={styles.btn} />
        </form>
    )
}