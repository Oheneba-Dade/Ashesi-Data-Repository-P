"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default function Card() {
  return (
    <div className="container max-w-lg mx-auto mt-40 mb-40">
        <div className="flex flex-row p-5">
            <Skeleton width={200} height={55} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
        </div>
        <div className="bg-gray p-8 rounded-md shadow-lg">
            <div>
                <div className="flex flex-col p-4 mr-8">
                <label className="text-white font-bold pb-2">
                    <Skeleton width={170} height={35} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                </label>
                    <Skeleton width={400} height={35} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                </div>
                <div className="flex flex-row mt-2 mr-10 text-white justify-end">
                    <Skeleton width={30} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                </div>
            </div>
            <div className="flex flex-row justify-end p-4 mt-2 mr-4">
                <div className="mr-4">
                    <Skeleton width={50} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>    
                </div>
                <div className="">
                    <Skeleton width={50} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>    
                </div>
            </div>
        </div>
    </div>
                    
  )
}