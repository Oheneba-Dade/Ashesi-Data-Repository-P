import "../globals.css";
import CollectionsContainer from "@/components/CollectionsContainer";
import { BASE_URL } from "@/utils/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Collections() {
	let initialCollections = [];

	try {
		const response = await fetch(`${BASE_URL}/get_all_collections/`, {
			cache: "no-store",
			next: { revalidate: 0 },
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		initialCollections = await response.json();
	} catch (error) {
		console.error("Failed to fetch collections:", error);
	}

	return (
		<div className="relative w-full">
			<div className="mt-24 mb-8">
				<h1 className="font-semibold text-2xl text-center">
					PUBLISHED COLLECTIONS
				</h1>
			</div>

			<div className="container mx-auto">
				<hr className="mb-8" />
			</div>

			{/* Remove the empty alignment div and let CollectionsContainer handle the layout */}
			<CollectionsContainer initialCollections={initialCollections} />
		</div>
	);
}
