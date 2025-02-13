'use client'
import React, { useState, useEffect, use } from 'react';
import SearchForm from './SearchForm';

export default function Table() {
    const [reports, setReports] = useState([]);
    const [newSearch, setNewSearch] = useState({
        report_id: "",
        reporter_id: "",
        manager_id: "",
        register_date: "",
        atention_date: "",
        close_date: "",
        priority: "",
        status: ""
    });

    function isEmpty(formData){
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key] !== "") {
            return false;
          }
        }
        return true;
    } 
    
    
    useEffect(() => {
        async function fetchData() {
            if(isEmpty(newSearch)){
                try{
                    const response = await fetch('http://localhost:8000/api/reports/');
                    const data = await response.json();
                    setReports(data);
                } catch (error) {
                    console.error(error);
                }
            }else{
                let url = "http://localhost:8000/api/reports/?";
                const params = new URLSearchParams();
                for(const key in newSearch){
                    if(newSearch.hasOwnProperty(key) && newSearch[key] !== ""){
                        params.append(key, newSearch[key]);
                    }
                }
                url += params.toString();
                try{
                    const response = await fetch(url);
                    const data = await response.json();
                    setReports(data);
                } catch (error) {
                    console.error(error);
                }

            }

        };
        fetchData();
    }, [newSearch]);
    
    const handleReportData = (data) => {
        console.log('Data received from SearchForm:', data);
        setNewSearch(data);
        console.log(isEmpty(newSearch));
    };

    console.log(reports);
    return(
        <div>
            <SearchForm onSubmit={handleReportData}/>
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
        </div>
    )
}