import "../globals.css";
import CollectionsContainer from "@/components/CollectionsContainer";
import { BASE_URL } from "@/utils/constants";

export default async function FeaturedCollections() {
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
        <div className="mb-14 mx-auto w-full max-w-4xl">
            <CollectionsContainer initialCollections={initialCollections} filterOn={false} />
        </div>
    );
}