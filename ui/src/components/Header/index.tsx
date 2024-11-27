import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>Finn pokerhånden</h1>
            </div>
        </header>
    );
};

export default Header;
