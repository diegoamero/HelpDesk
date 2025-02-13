import styles from "./styles.module.css"

export default function Member_card(props){
    return(
        <div className={styles.card}>
            <p className={styles.card__element}>{props.id}</p>
            <p className={styles.card__element}>{props.name}</p>
            <p className={styles.card__element}>{props.lastname}</p>
            <p className={styles.card__element}>{props.sex}</p>
        </div>
    )
};