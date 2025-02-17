import React from 'react'
import styles from './styles.module.css'

const mayor = {
    name: '',
    numCases: 0,
};
const data = [
    {
        name: 'Maracaibo',
        numCases:300,
    },
    {
        name: 'Caracas',
        numCases: 242,
    },
    {
        name: 'Valencia',
        numCases: 120,
    },
    {
        name: 'Lecheria',
        numCases: 50,
    },
]

function City() {
  return (
    <div className={styles.city} height={300} width={300}>
        {   
            data.map((ciudad)=>{
                if(ciudad.numCases > mayor.numCases) {
                    mayor.numCases = ciudad.numCases;
                    mayor.name = ciudad.name;
                }
            })
        }
        <h3 className={styles.chartTitles}>Ciudad con más reportes</h3>
        <p className={styles.chartTitles}>{mayor.name}</p>
    </div>
  )
}

export default City