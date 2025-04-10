import Slideshow from "@/components/Slideshow";
import "./globals.css";
import CustomButton from "@/components/CustomButton";
import HeroBlock from "@/components/HeroBlock";
import CollectionsContainer from "@/components/CollectionsContainer";
import { BASE_URL } from "@/utils/constants";

export const dynamic = "force-dynamic";

export default async function Home() {

	let initialCollections = [];

	try {
		let response;
		response = await fetch(`${BASE_URL}/get_all_collections`, {
			cache: "no-store",
			next: {revalidate: 0}
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		initialCollections = await response.json();
	} catch (error) {
		console.error("Failed to fetch featured collections:", error);
	}

	return (
		<div className="relative w-full">
			<Slideshow/>
			
			<div className="max-h-[800px]"></div>
			<h1 className="font-semibold w-full mb-16 text-center text-xl">
				FEATURED COLLECTIONS
			</h1>
			{/* some collections */}
			<div className="mb-14 mx-auto w-full max-w-4xl">
				<CollectionsContainer initialCollections={initialCollections} filterOn={false} />
			</div>
			<div className="flex justify-center mb-8">
				<CustomButton
					text="View All Collections"
					bgColor="bg-ashesi-gray"
					width="w-64"
					href="/collections"
				/>
			</div>

		</div>
	);
}
