'use client';
import { AreaChart } from 'recharts';
import BarrasSimples from './BarrasSimples';
import styles from './styles.module.css';
import VerticalComposedChart from './VerticalComposedChart';


export default function Page() {
  return (
    <div className={styles.dashboard}>
      <h1>Reporte mensual</h1>
      <div className={styles.chartContainer}>
        <div className={styles.chartContainer1} height={300} width={300}>
          <VerticalComposedChart />
        </div>
        <div className={styles.chartContainer2} height={300} width={300}>
          <BarrasSimples />
        </div>
        <div className={styles.chartContainer3} height={300} width={300}>
          <AreaChart/>
        </div>
      </div>
    </div>
  );
}
