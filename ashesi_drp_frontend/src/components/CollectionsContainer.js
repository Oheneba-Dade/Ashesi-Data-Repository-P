"use client";
import CollectionItem from "@/components/CollectionItem";
import CollectionsPagination from "@/components/CollectionsPagination";
import Filter from "@/components/Filter";
import { motion } from "framer-motion";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { BASE_URL } from "@/utils/constants";
import Skeleton from "react-loading-skeleton";


export default function CollectionsContainer({ initialCollections, filterOn=true }) {
    const [collections, setCollections] = useState(initialCollections);
    const [loading, setLoading] = useState(false);
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("/search-not-found-animation.json")
            .then((response) => response.json())
            .then((data) => setAnimationData(data))
            .catch((error) => console.error("Error loading animation:", error));
    }, []);

    const fetchPage = async (url) => {
        if (!url) return;

        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(response);
            setCollections(data);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleFilterResults = (filteredData) => {
        // Check if the data has the expected structure
        if (filteredData && filteredData.results !== undefined) {
            setCollections(filteredData);
        } else {
            // Handle the case where the response doesn't have the expected structure
            setCollections({ results: [], next: null, previous: null });
        }
    };

    // Handle filter reset
    const handleResetFilter = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/get_all_collections/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCollections(data);
        } catch (error) {
            console.error("Error resetting collections:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mb-14 mx-auto w-full grid grid-cols-1 md:grid-cols-6 gap-20 px-16">

            {
                filterOn && (
                    <div className="md:col-span-2 mt-10">
                        <Filter
                            onFilterResults={handleFilterResults}
                            onResetFilter={handleResetFilter}
                            setLoading={setLoading}
                        />
                    </div>
                )
            }

            <div className={filterOn ? "md:col-span-4 max-w-3xl" : "md:col-span-6 max-w-3xl"}>
                {loading ? (
                    <div className="py-10 px-4 border-b">
                        <div className="py-10 px-4 border-b ">
                            <Skeleton width={550} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            <Skeleton height={100} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
                                <Skeleton width={210} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                                <Skeleton width={200} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            </div>

                            <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
                                <Skeleton width={200} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                                <Skeleton width={250} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            </div>
                        </div>

                        {/* Second */}
                        <div className="py-10 px-4 border-b ">
                            <Skeleton width={550} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            <Skeleton height={100} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
                                <Skeleton width={210} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                                <Skeleton width={200} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            </div>

                            <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
                                <Skeleton width={200} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                                <Skeleton width={250} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {collections.results && collections.count > 0 ? (
                            <>
                                <ul>
                                    {collections.results.map((collection) => (
                                        <CollectionItem
                                            key={collection.id}
                                            collection_id={collection.id}
                                            title={collection.title}
                                            authors={collection.authors}
                                            abstract={collection.abstract}
                                            date_of_publication={collection.date_of_publication}
                                            doi_link={collection.doi_link}
                                            keywords={collection.keywords}
                                        />
                                    ))}
                                </ul>

                                {
                                    filterOn && (
                                        <CollectionsPagination
                                            nextUrl={collections.next}
                                            previousUrl={collections.previous}
                                            onPageChange={fetchPage}
                                        />
                                    )
                                }
                            </>
                        ) : (
                            <>
                            <div className="flex flex-col items-center justify-center text-white px-6">
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
                                <div className="flex flex-col items-center justify-center py-20">
                                    <p className="text-xl text-gray-600 mb-4">Sorry, no results found</p>
                                    <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                                </div>
                            </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}