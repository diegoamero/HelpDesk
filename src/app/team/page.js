'use client';
import styles from "./styles.module.css";
import Member_card from "./Member_card.js";
import { useEffect, useState } from "react";
import FormCaseManager from './FormCaseManager';

export default function Page() {
  const[data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/casemanagers/');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return(
    <main className={styles.team__container}>
      {/**<div className={styles.card__container}>
      {data.map((member) => (
        <Member_card key={member[0]} id={member[0]} name={member[1]} lastname={member[2]} sex={member[3]}/>
      ))
      }
      </div>**/}
      <FormCaseManager/>
    </main>
  );
}