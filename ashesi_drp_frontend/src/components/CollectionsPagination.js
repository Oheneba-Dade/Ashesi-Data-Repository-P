import { useState, useEffect } from "react";
import { NUM_COLLECTIONS_PER_PAGE } from "@/utils/constants";

export default function CollectionsPagination({
                                                  nextUrl,
                                                  previousUrl,
                                                  onPageChange,
                                                  currentPage,
                                                  numberCollections,
                                                  adminsAddition=0
                                              }) {
    const [numberOfPages, setNumberOfPages] = useState(1);

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberCollections / (NUM_COLLECTIONS_PER_PAGE+adminsAddition)));
    }, [numberCollections]);

    return (
        <div className="flex justify-around mt-8">
            <button
                onClick={() => onPageChange(previousUrl)}
                disabled={!previousUrl}
                className={`px-4 py-2 rounded ${!previousUrl ? 'bg-gray-300 cursor-not-allowed' : 'bg-ashesi-red text-white'}`}
            >
                Previous
            </button>

            <div>
                Page {currentPage} of {numberOfPages}
            </div>

            <button
                onClick={() => onPageChange(nextUrl)}
                disabled={!nextUrl}
                className={`px-4 py-2 rounded ${!nextUrl ? 'bg-gray-300 cursor-not-allowed' : 'bg-ashesi-red text-white'}`}
            >
                Next
            </button>
        </div>
    );
}
