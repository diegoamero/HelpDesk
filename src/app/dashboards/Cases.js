import React from 'react'
import styles from './styles.module.css'

const data = 203;

function Cases() {
  return (
    <div className={styles.city}>
        <h3 className={styles.chartTitles}>Cantidad de casos recibidos:</h3>
        <p className={styles.chartTitles}>{data}</p>
    </div>
  )
}

export default Cases