'use client';
import styles from "./styles.module.css";
import Member_card from "./Member_card.js";
import { useEffect, useState } from "react";
import FormCaseManager from './FormCaseManager';

export default function Page() {
  const[data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/supporters/');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return(
    <main className={styles.team__container}>
      <div className={styles.card__container}>
      {data.map((supporter) => (
        <Member_card key={supporter[0]} id={supporter[0]} name={supporter[1]} lastname={supporter[2]} department={supporter[3]}/>
      ))
      }
      </div>
      <FormCaseManager/>
    </main>
  );
}