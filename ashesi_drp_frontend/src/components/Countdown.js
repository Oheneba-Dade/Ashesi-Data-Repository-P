"use client";

import React from "react";
import { useEffect, useState } from "react";

const CountdownTimer= ({setTimerActive}) => {
    const [countdown, setCountdown] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(()=>{
        if(countdown) {
            setTimerActive(true);
            const countdownInterval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(countdownInterval);
                        setCountdown(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(countdownInterval);
        } else {
            setTimerActive(false);
            return;
        }
    }, [countdown, timeRemaining]);

    return(
        <div>
            {countdown && (
                <div>
                    {timeRemaining}
                </div>
            )}
        </div>
    )
}

export default CountdownTimer;