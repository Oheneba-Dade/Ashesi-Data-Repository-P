import "../globals.css";
import CollectionsContainer from "@/components/CollectionsContainer";
import { BASE_URL } from "@/utils/constants";

export default async function Collections() {
	let initialCollections = [];

	try {
		const response = await fetch(`${BASE_URL}/get_all_collections`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		initialCollections = await response.json();
	} catch (error) {
		console.error("Failed to fetch collections:", error);
	}

	return (
		<div>
			<div className="relative w-full">
				<div className="mt-24 max-h-[800px]">
					<h1 className="md:col-span-4 font-semibold text-2xl text-center">
						PUBLISHED COLLECTIONS
					</h1>
				</div>

				<div className="container mx-auto">
					<hr className="my-4" />
				</div>

				<div className="mb-4 mx-auto w-full grid grid-cols-1 md:grid-cols-6 gap-10 px-12 ">
					<div className="md:col-span-2">
						{/*empty div to help with alignment*/}
					</div>
				</div>

				<CollectionsContainer initialCollections={initialCollections} />
			</div>
		</div>
	);
}
