import { useState, useEffect } from "react";
import { createHandResponseT, HandT } from "./types";

type Response = {
    data: HandT | null;
    error: boolean;
    loading: boolean;
    setTrigger: (value: boolean) => void;
};

//Custom hook for creating a new hand with a trigger
const useCreateHand = (url: string): Response => {
    const [data, setData] = useState<HandT | null>(null);
    const [trigger, setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (trigger) {
            setLoading(true);
            setData(null);
            setError(false);

            (async () => {
                try {
                    const response = await fetch(url);
                    const result: createHandResponseT = await response.json();

                    setLoading(false);

                    setData(result.data);
                    setTrigger(false);
                } catch (err) {
                    setLoading(false);
                    setError(true);
                    console.error("Error: ", err);
                }
            })();
        }
    }, [url, trigger]);

    return { data, loading, error, setTrigger };
};
export default useCreateHand;
