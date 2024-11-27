import styles from "./Button.module.scss";

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
    return (
        <button className={styles.button} onClick={() => onClick()}>
            <p>{text}</p>
        </button>
    );
};

export default Button;
