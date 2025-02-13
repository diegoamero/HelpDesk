'use client'
import React, { useState, useEffect } from 'react';

export default function Table() {
    const [reports, setReports] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch('http://localhost:8000/api/reports/');
                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    
    console.log(reports);
    return(
        <table>
            <thead>
                <tr key="header">
                    <th>ID Reporte</th>
                    <th>Cliente ID</th>
                    <th>Manager ID</th>
                    <th>Register Date</th>
                    <th>Attention Date</th>
                    <th>Close Date</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report, index) => (
                    <tr key={index}>
                        <td>{report[0]}</td>
                        <td>{report[1]}</td>
                        <td>{report[2]}</td>
                        <td>{report[3]}</td>
                        <td>{report[4] == null? '' : report[4]}</td>
                        <td>{report[5] == null? '' : report[5]}</td>
                        <td>{report[6]}</td>
                        <td>{report[7]}</td>
                        <td>{report[8]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}