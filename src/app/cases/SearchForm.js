import React, { useState } from 'react';

export default function SearchForm(props) {

    const [formReportData, setFormReportData] = useState({
        report_id: '',
        reporter_id: '',
        manager_id: '',
        register_date: '',
        atention_date: '',
        close_date: '',
        priority: '',
        status: '',
    });

    const handleChangeReport = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormReportData({
            ...formReportData,
            [name]: value
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.onSubmit(formReportData);
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="report_id" placeholder="ID del reporte" onChange={handleChangeReport}/>
                <input type="text" name="reporter_id" placeholder="ID del cliente" onChange={handleChangeReport}/>
                <input type="text" name="manager_id" placeholder="ID del gestor" onChange={handleChangeReport}/>
                <input type="date" name="register_date" placeholder="Fecha de registro" onChange={handleChangeReport}/>
                <input type="date" name="atention_date" placeholder="Fecha de atencion" onChange={handleChangeReport}/>
                <input type="date" name="close_date" placeholder="Fecha de cierre" onChange={handleChangeReport}/>

                <select name="priority" onChange={handleChangeReport}>
                        <option value=""></option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                </select>

                <select name="status" onChange={handleChangeReport}>
                    <option value=""></option>
                    <option value="Cerrado">Cerrado</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Pausado">Pausado</option>
                </select>

                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}