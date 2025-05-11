import { useState, useEffect } from "react";
import { NUM_COLLECTIONS_PER_PAGE } from "@/utils/constants";

export default function CollectionsPagination({
	nextUrl,
	previousUrl,
	onPageChange,
	currentPage,
	numberCollections,
	adminsAddition = 0,
}) {
	const [numberOfPages, setNumberOfPages] = useState(1);

	useEffect(() => {
		setNumberOfPages(
			Math.ceil(
				numberCollections / (NUM_COLLECTIONS_PER_PAGE + adminsAddition)
			)
		);
	}, [numberCollections]);

	return (
		<div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-10">
			<button
				onClick={() => onPageChange(previousUrl)}
				disabled={!previousUrl}
				className={`px-4 py-2 rounded-md text-sm sm:text-base transition-colors duration-200 ${
					!previousUrl
						? "bg-gray-200 text-gray-500 cursor-not-allowed"
						: "bg-ashesi-red text-white hover:bg-red-700"
				}`}
			>
				Previous
			</button>

			<div className="text-sm sm:text-base text-gray-600">
				Page {currentPage} of {numberOfPages}
			</div>

			<button
				onClick={() => onPageChange(nextUrl)}
				disabled={!nextUrl}
				className={`px-4 py-2 rounded-md text-sm sm:text-base transition-colors duration-200 ${
					!nextUrl
						? "bg-gray-200 text-gray-500 cursor-not-allowed"
						: "bg-ashesi-red text-white hover:bg-red-700"
				}`}
			>
				Next
			</button>
		</div>
	);
}
