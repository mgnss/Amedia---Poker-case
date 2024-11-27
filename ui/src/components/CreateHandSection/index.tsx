import useCreateHand from "../../lib/useCreateHand";
import Button from "../Button";
import Hand from "../Hand";
import styles from "./CreateHandSection.module.scss";

const CreateHandSection = () => {
    const { data, loading, error, setTrigger } = useCreateHand(
        `http://localhost:3000/api/createHand`
    );

    const buttonHandler = () => {
        setTrigger(true);
    };

    return (
        <section className={styles.createHandContainer}>
            {data && !loading && (
                <>
                    <Hand hand={data} />
                </>
            )}
            {loading && <p>Deler ut hånden...</p>}
            {error && <p>Kunne ikke lage ny hånd...</p>}

            {!data && !loading && !error && (
                <p>Trykk på knappen for å lage en ny hånd</p>
            )}
            <Button text={"Ny hånd"} onClick={buttonHandler} />
        </section>
    );
};

export default CreateHandSection;
