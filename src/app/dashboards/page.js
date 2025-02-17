'use client';
import BarrasSimples from './BarrasSimples';
import styles from './styles.module.css';
import VerticalComposedChart from './VerticalComposedChart';
import City from './City';
import PieGrafico from './pieChart';
import Cases from './Cases';

export default function Page() {
  return (
    <div className={styles.dashboard}>
      <h1>Reporte mensual</h1>
      <div className={styles.chartContainer}>
        <div className={styles.chartContainer1} height={300} width={300}>
          <h4 className={styles.chartTitles}>Tendencia de reportes según el género</h4>
          <VerticalComposedChart />
        </div>
        <div className={styles.chartContainer2} height={300} width={300}>
          <h4 className={styles.chartTitles}>Departamentos con más reportes</h4>
          <BarrasSimples />
        </div>
        <div className={styles.chartContainer3}>
          <City />
        </div>
        <div className={styles.chartContainer4}>
          <h4 className={styles.chartTitles}>Casos por género</h4>
          <PieGrafico />
        </div>
        <div className={styles.chartContainer5}>
          <Cases/>
        </div>
      </div>
    </div>
  );
}
