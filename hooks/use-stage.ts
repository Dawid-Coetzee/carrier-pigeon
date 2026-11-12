import { useState } from "react";

type Options<T> = {
    initialState: T;
}

export default function useStage<T extends number>({initialState}: Options<T>) {
    const [stage, setStage] = useState<T>( initialState );
    
    const handleBack = () => {
        //handle state of the stage
        setStage((prev) => prev - 1 as T);
    };

    const handleNext = () => {
        //handle state of the stage
        setStage((prev) => prev + 1 as T);
    };

    const moveTo = (stage: T) => {
        setStage(stage)
    }

    return { stage, handleBack, handleNext, moveTo };
}