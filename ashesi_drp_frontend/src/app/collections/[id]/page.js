// import "../../globals.css";
//
// import CollectionsDetails from "@/components/CollectionDetails";
// import { BASE_URL } from "@/utils/constants";
// import CollectionSidebar from "@/components/CollectionSidebar";
//
// export default async function CollectionPage({ params }) {
// 	//The download count has a different endpoint, hence we fetch from both
// 	const collectionId = params.id;
// 	const jwt = localStorage.getItem("jwt");
//
// 	const collectionData = await fetch(
// 		`${BASE_URL}/get_collection/?collection_id=${collectionId}`,
// 		{
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		}
// 	);
// 	const downloadDataResponse = await fetch(
// 		`${BASE_URL}/get_dataset/?collection_id=${collectionId}`,
// 		{
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		}
// 	);
// 	const downloadData = await downloadDataResponse.json();
// 	const initialCollection = await collectionData.json();
//
// 	return (
// 		<div className="max-w-5xl mx-auto mt-20 px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
// 			{/* Left Column */}
// 			<div className="md:col-span-3">
// 				{/* Collection Detail */}
// 				<CollectionsDetails initialCollection={initialCollection} />
// 			</div>
//
// 			{/* Right Column*/}
// 			<CollectionSidebar
// 				initialCollection={initialCollection}
// 				downloadData={downloadData}
// 			/>
// 		</div>
// 	);
// }




import "../../globals.css";
import CollectionClientLoader from "@/components/CollectionClientLoader"; // We'll create this

export default function CollectionPage({ params }) {
    const collectionId = params.id;

    return (
        <div className="max-w-5xl mx-auto mt-20 px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <CollectionClientLoader collectionId={collectionId} />
        </div>
    );
}
