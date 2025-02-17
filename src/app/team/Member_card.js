import styles from "./styles.module.css"
import { useEffect, useState } from "react";

export default function Member_card(props){

    const [departments, setDepartments] = useState([]);

    useEffect(()=>{
        async function getDepartments(){
            try{
                let url = 'http://localhost:8000/api/departments/?';
                const params = new URLSearchParams();
                params.append('department_id', props.department);
                url += params.toString();
                const response = await fetch(url);
                const data = await response.json();
                await setDepartments(data[0]);
            } catch (error) {
                console.error(error);
            }
        }   
        getDepartments();

    },[]);

    useEffect(()=>{
        console.log(departments[1])
    },[departments])

    return(
        <div className={styles.card}>
            <p className={styles.card__name}>{props.name}</p>
            <p className={styles.card__name}>{props.lastname}</p>
            <p className={styles.card__department}>{departments[1]}</p>
        </div>
    )
};