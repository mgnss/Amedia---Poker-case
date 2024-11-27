import { HandT } from "../../lib/types";
import Card from "../Card";
import styles from "./Hand.module.scss";

const Hand = ({ hand }: { hand: HandT }) => {
    return (
        <div className={styles.hand}>
            <div className={styles.cardsContainer}>
                {hand.cards.map((card, i) => (
                    <div key={i} className={styles.cardContainer}>
                        <Card card={card} />
                    </div>
                ))}
            </div>
            <div className={styles.categoryContainer}>
                <p>{hand.category}</p>
            </div>
        </div>
    );
};

export default Hand;
