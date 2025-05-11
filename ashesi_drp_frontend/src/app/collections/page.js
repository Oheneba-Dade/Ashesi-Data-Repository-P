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
		<div className="relative w-full min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-8">
					<h1 className="font-semibold text-xl sm:text-2xl text-center">
						PUBLISHED COLLECTIONS
					</h1>
				</div>

				<div className="w-full">
					<hr className="mb-6 sm:mb-8" />
				</div>

				<CollectionsContainer initialCollections={initialCollections} />
			</div>
		</div>
	);
}
