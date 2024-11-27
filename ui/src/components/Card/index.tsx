import styles from "./Card.module.scss";

const Card = ({ card }: { card: string }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <p>{card}</p>
            </div>
        </div>
    );
};

export default Card;
