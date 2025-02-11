import styles from "./styles.module.css";


export default function Page() {
return <main className={styles.container}>
  <div className={styles.form}>
    <form action="post">
      <div className={styles.input__container}>
        <label for="">
          <h3>Fecha de registro</h3> </label>
        <input className={styles.form__element} type="date" name="registerDate" id=""
          placeholder="Fecha de registro del caso" required />
      </div>
      <input className={styles.form__element} type="text" name="nameClient" id="" placeholder="Nombre cliente"
        required />
      <input className={styles.form__element} type="text" name="nameOperator" id="" placeholder="Nombre operador"
        required />
      <input className={styles.form__element} type="number" name="caseUrgency" id="" placeholder="Urgencia del caso"
        min="1" max="5" required />
      <input className={styles.form__element} type="number" name="age" id="" placeholder="Edad" min="0" max="115"
        required />
      <div className={styles.input__container}>
        <label for="status">
          <h3>Status</h3> </label>
        <select name="" id="" required className={styles.form__element}>
          <option value="">Resuelto</option>
          <option value="">En proceso</option>
          <option value="">No resuelto</option>
        </select>
      </div>
      <input type="text" name="" id="" placeholder="Caso remitido a..." className={styles.form__element} />
      <div className={styles.input__container}>
        <label for="sex">
          <h3>Sexo</h3> </label>
        <select name="sex" id="" required className={styles.form__element}>
          <option value="">Hombre</option>
          <option value="">Mujer</option>
          <option value="">Otro</option>
        </select>
      </div>
      <div className={styles.input__container}>
        <label for="sex">Descripción:</label>
        <textarea className={`${styles.form__element, styles.textarea}`} name="description" id="" required>
            Escribe acá la descripción del caso...
          </textarea>
      </div>
      <input className={styles.form__element} type="date" name="" id="" placeholder="Fecha de resolución del caso" />
      <input type="submit" value="Enviar caso" className={styles.btn}/>
    </form>
  </div>
  <div className={styles.table}>

  </div>
  Hola esta es la página de casos, habran tablas y un formulario
</main>
}