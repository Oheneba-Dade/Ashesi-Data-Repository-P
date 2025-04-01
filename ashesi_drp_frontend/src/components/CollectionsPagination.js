"use client";

export default function CollectionsPagination({ nextUrl, previousUrl, onPageChange }) {
    return (
        <div className="flex justify-between mt-8">
            <button
                onClick={() => onPageChange(previousUrl)}
                disabled={!previousUrl}
                className={`px-4 py-2 rounded ${!previousUrl ? 'bg-gray-300 cursor-not-allowed' : 'bg-ashesi-red text-white'}`}
            >
                Previous
            </button>

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