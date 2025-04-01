"use client";

import Link from "next/link";
import "./globals.css";
import CustomButton from "@/components/CustomButton";
import { motion } from "framer-motion";
// import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFoundPage() {

    const [animationData, setAnimationData] = useState(null);

      // Dynamically fetch the JSON file
      useEffect(() => {
        fetch("/404-animation.json")
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
                className="w-100 h-100 lg:w-[900px] lg:h-[500px]"
              >
                <Lottie animationData={animationData} loop={true} />
              </motion.div>
          )}
        
            {/* 404 message */}
            {!animationData && (
              <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-8xl font-bold text-ashesi-red"
              >
                404
              </motion.h1>
            )}
        
            {/* Message */}
            {!animationData && (   
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg text-ashesi-gray mt-4"
              >
                Oops! The page you're looking for doesn't exist.
              </motion.p>
            )}
          {/* Go Home Button */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                 <div className="mt-7 px-6 py-2 ">
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
