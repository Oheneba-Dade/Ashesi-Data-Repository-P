// // src/components/CollectionClientLoader.js
// 'use client';
//
// import { useEffect, useState } from "react";
// import CollectionsDetails from "./CollectionDetails";
// import CollectionSidebar from "./CollectionSidebar";
// import { BASE_URL } from "@/utils/constants";
//
// export default function CollectionClientLoader({ collectionId }) {
//     const [initialCollection, setInitialCollection] = useState(null);
//     const [downloadData, setDownloadData] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const jwt = localStorage.getItem("jwt");
//
//             if (!jwt) {
//                 console.error("No JWT found in localStorage.");
//                 return;
//             }
//
//             try {
//                 const collectionRes = await fetch(
//                     `${BASE_URL}/get_collection/?collection_id=${collectionId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${jwt}`,
//                         },
//                     }
//                 );
//
//                 const downloadRes = await fetch(
//                     `${BASE_URL}/get_dataset/?collection_id=${collectionId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${jwt}`,
//                         },
//                     }
//                 );
//
//                 const collectionJson = await collectionRes.json();
//                 const downloadJson = await downloadRes.json();
//
//                 setInitialCollection(collectionJson);
//                 setDownloadData(downloadJson);
//             } catch (err) {
//                 console.error("Error fetching collection:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, [collectionId]);
//
//     if (loading) {
//         return (
//             <>
//                 <div className="md:col-span-3 space-y-4">
//                     <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
//                     <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
//                     <div className="h-40 bg-gray-200 rounded animate-pulse" />
//                 </div>
//                 <div className="space-y-4">
//                     <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
//                     <div className="h-32 bg-gray-200 rounded animate-pulse" />
//                 </div>
//             </>
//         );
//     }
//
//     return (
//         <>
//             <div className="md:col-span-3">
//                 <CollectionsDetails initialCollection={initialCollection} />
//             </div>
//             <CollectionSidebar
//                 initialCollection={initialCollection}
//                 downloadData={downloadData}
//             />
//         </>
//     );
// }

'use client';

import { useEffect, useState } from "react";
import CollectionsDetails from "./CollectionDetails";
import CollectionSidebar from "./CollectionSidebar";
import { BASE_URL } from "@/utils/constants";

export default function CollectionClientLoader({ collectionId }) {
    const [initialCollection, setInitialCollection] = useState(null);
    const [downloadData, setDownloadData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const jwt = localStorage.getItem("jwt");

            // Conditionally add the Authorization header
            const headers = jwt
                ? {
                    Authorization: `Bearer ${jwt}`,
                }
                : {};

            try {
                const collectionRes = await fetch(
                    `${BASE_URL}/get_collection/?collection_id=${collectionId}`,
                    { headers }
                );

                const downloadRes = await fetch(
                    `${BASE_URL}/get_dataset/?collection_id=${collectionId}`,
                    { headers }
                );

                const collectionJson = await collectionRes.json();
                const downloadJson = await downloadRes.json();

                setInitialCollection(collectionJson);
                setDownloadData(downloadJson);
            } catch (err) {
                console.error("Error fetching collection:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionId]);

    if (loading) {
        return (
            <>
                <div className="md:col-span-3 space-y-4">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                    <div className="h-64 bg-gray-200 rounded animate-pulse" />
                    <div className="h-64 bg-gray-200 rounded animate-pulse" />
                    <div className="h-64 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-4">
                    <div className="h-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-96 bg-gray-200 rounded animate-pulse" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="md:col-span-3">
                <CollectionsDetails initialCollection={initialCollection} />
            </div>
            <CollectionSidebar
                initialCollection={initialCollection}
                downloadData={downloadData}
            />
        </>
    );
}

