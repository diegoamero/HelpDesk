'use client'
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {

    const [formCaseManager, setformCaseManager] = useState({
        supporter_name: '',
        supporter_lastname: '',
        supporter_department: ''
    });
    
    const [departments, setDepartments] = useState([]);
    const [id, setId] = useState('');

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
            const response = await fetch('http://localhost:8000/api/supporters/create', {
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

    useEffect(()=>{
        const newId = uuidv4()
        setId(newId);
        setformCaseManager({
            ...formCaseManager,
            supporter_id: newId 
        })
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
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.input__container}>
                <h3>Ingresa los datos del nuevo gestor de casos</h3>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="supporter_id">ID:</label>
                    <input className={styles.form__element_input} type="text" name="supporter_id" onChange={handleChangeCaseManager} value={id} required readOnly/>
                </div>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="supporter_name">Nombre:</label>
                    <input className={styles.form__element_input} type="text" name="supporter_name" onChange={handleChangeCaseManager} placeholder="Diego" required />
                </div>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="supporter_lastname">Apellido:</label>
                    <input className={styles.form__element_input} type="text" name="supporter_lastname" onChange={handleChangeCaseManager} placeholder="Mejia" required />
                </div>
                <div className="form__element__container">
                    <label className={styles.form__element_title} htmlFor="supporter_department">Departamento:</label>
                    <select name="supporter_department" onChange={handleChangeCaseManager}>
                        <option value=""></option>
                        {departments.map((department)=>{
                            return(
                                <option key={department[0]} value={department[0]}>{department[1]}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <input type="submit" value="Registrar" className={styles.btn} />
        </form>
    )
}