import Form from "./Form";
import styles from "./styles.module.css";
import Table from "./Table";


export default function Page() {
  return(
    <main className={styles.container}>
      <Form/>
      <Table/>
    </main>

  ) 
}