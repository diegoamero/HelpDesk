'use client';
import styles from "./styles.module.css";
import Member_card from "./Member_card.js";
import { useEffect, useState } from "react";
import FormCaseManager from './FormCaseManager';

export default function Page() {
  const[data, setData] = useState([]);
  const[activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/supporters/');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

const handleTabClick = (tab) => {
    setActiveTab(tab);
};

  return(
    <div className={styles.component__main}>
      <nav className={styles.nav}>
        <button 
          className={`${activeTab === 'form' ? styles.btn_active : styles.btn_inactive}`}
          onClick={() => handleTabClick('team')}
        >
          Form
        </button>
        <button 
          className={`${activeTab === 'table' ? styles.btn_active : styles.btn_inactive}`}
          onClick={() => handleTabClick('form')}
        >
          Table
        </button>
      </nav>
      {
        activeTab === 'team'?            
          (<div className={styles.team__container}>
            <div className={styles.card__container}>
              {data.map((supporter) => (
                <Member_card key={supporter[0]} name={supporter[1]} lastname={supporter[2]} department={supporter[3]}/>
              ))}
            </div>
          </div>):
          <FormCaseManager/>
      }
    </div>
  )
}