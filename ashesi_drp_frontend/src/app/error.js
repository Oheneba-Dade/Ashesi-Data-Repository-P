// 'use client'
//
// export default function Error({ error, reset }) {
//     return (
//         <html>
//         <body>
//         <h2>Something went wrong!</h2>
//         <button onClick={() => reset()}>Try again</button>
//         </body>
//         </html>
//     )
// }

'use client';

import "./globals.css";
import CustomButton from "@/components/CustomButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ErrorPage(error, reset) {

    const [animationData, setAnimationData] = useState(null);

    // Dynamically fetch the JSON file
    useEffect(() => {
        fetch("/error-animation.json")
            .then((response) => response.json())
            .then((data) => setAnimationData(data))
            .catch((error) => console.error("Error loading animation:", error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white px-6">
            {/* Lottie Animation (Only Render if JSON is Loaded) */}
            {animationData && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-100 h-100 lg:w-[300px] lg:h-[300px]"
                >
                    <Lottie animationData={animationData} loop={true} />
                </motion.div>
            )}
            {/* Go Home Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                <p className="text-2xl font-bold text-ashesi-red mt-8">
                    Oops, It looks like something went wrong. Please try again.
                </p>
                <div className="mt-7 px-6 py-2 flex justify-center items-center">
                    <CustomButton
                        text="Go Home"
                        bgColor="bg-ashesi-red"
                        width="w-48"
                        href="/"
                    />
                </div>
            </motion.div>
        </div>
    );
}
