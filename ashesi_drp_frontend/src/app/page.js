import Slideshow from "@/components/Slideshow";
import "./globals.css";
import CustomButton from "@/components/CustomButton";
import HeroBlock from "@/components/HeroBlock";
import CollectionsContainer from "@/components/CollectionsContainer";
import { BASE_URL } from "@/utils/constants";

export default async function Home() {

	let initialCollections = [];

	try {
		const response = await fetch(`${BASE_URL}/get_all_collections?page=1`);
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
			<HeroBlock
				header="Welcome to Ashesi Data Repository"
				subheader="Welcome to the heart of Ashesi’s research excellence"
				text="At Ashesi University, we are committed to fostering a culture of academic
					excellence, collaboration, and ethical research. The Ashesi Research Data
					Repository (ARDR) is designed to empower our researchers, faculty, and students
					by offering a secure and dynamic platform for managing, archiving, and sharing
					research data across all disciplines.
					The ARDR is currently home to [X] active researchers, hosting [Y] research
					datasets, including publicly accessible collections that promote interdisciplinary
					knowledge sharing. By providing a seamless interface for research data
					management, Ashesi University aims to support the growing movement towards
					Open Science and FAIR data practices."
				visibleButton={true}
				customButtons={
					[
						<CustomButton
							text="ALL COLLECTIONS"
							bgColor="bg-ashesi-gray"
							width="w-48"
							href="/collections"
						/>,
						<CustomButton
							text="CONTRIBUTE"
							href="/add_collection"
						/>
					]
				}
			/>
			<div className="sm:mt-96 md:mt-96 lg:mt-64 mb-[310px] max-h-[800px]"></div>
			<h1 className="font-semibold w-full text-center text-xl">
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
