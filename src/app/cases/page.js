'use client';
import Form from "./Form";
import styles from "./styles.module.css";
import Table from "./Table";
import { useState } from "react";


export default function Page() {
  //Controla el tab activo
  const [activeTab, setActiveTab] = useState('form');

  const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  return(
    <main className={styles.container}>
      <nav className={styles.nav}>
        <button 
          className={`${activeTab === 'form' ? styles.btn_active : styles.btn_inactive}`}
          onClick={() => handleTabClick('form')}
        >
          Form
        </button>
        <button 
          className={`${activeTab === 'table' ? styles.btn_active : styles.btn_inactive}`}
          onClick={() => handleTabClick('table')}
        >
          Table
        </button>
      </nav>
      <div className={styles.tabContent}>
        {activeTab === 'form' && <Form/>}
        {activeTab === 'table' && <Table/>}
      </div>
    </main>

  ) 
}