"use client";
import CustomButton from "@/components/CustomButton";
import KeywordInput from "@/components/KeywordInput";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

export default function Filter({ onFilterResults, onResetFilter, setLoading }) {
	const d = new Date();
	const [fromYear, setFromYear] = useState("1900");
	const [toYear, setToYear] = useState(new Date().getFullYear().toString());
	const [keywords, setKeywords] = useState([]);
	const searchParams = useSearchParams();
	const initialTitle = searchParams.get("title") || "";

	useEffect(() => {
		if (searchParams.toString()) {
			handleSearch();
		}
	}, [searchParams]);

	const handleFromChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 4) value = value.slice(0, 4);

		let numValue = parseInt(value, 10);
		if (isNaN(numValue) || numValue < 1900) numValue = 1900;
		if (numValue > toYear) numValue = toYear;

		setFromYear(numValue.toString());
	};

	const handleToChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 4) value = value.slice(0, 4);

		let numValue = parseInt(value, 10);
		if (isNaN(numValue) || numValue < fromYear) numValue = fromYear;
		if (numValue > d.getFullYear()) numValue = d.getFullYear();

		setToYear(numValue.toString());
	};

	//TODO: Add authorization headers to include access tokens
	const sendFilterRequest = async (baseURL, queryParams, callback) => {
		const url = new URL(`${baseURL}/collections`);

		// Add each query parameter to the URL
		Object.keys(queryParams).forEach((key) => {
			if (queryParams[key]) {
				if (
					key === "keywords" &&
					Array.isArray(queryParams[key]) &&
					queryParams[key].length > 0
				) {
					url.searchParams.append(key, queryParams[key].join(","));
				} else {
					url.searchParams.append(key, queryParams[key]);
				}
			}
		});

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok)
				throw new Error(`HTTP error! Status: ${response.status}`);
			const result = await response.json();

			// Call the callback with the result
			if (callback) callback(result);

			return result;
		} catch (error) {
			console.error("Error sending request:", error);
			throw error;
		}
	};

	const handleSearch = async (e) => {
		if (e) e.preventDefault(); // Prevent default only if triggered by an event
		setLoading(true);

		let collectionName =
			document.getElementsByName("collection-name")[0].value;
		let author = document.getElementsByName("author")[0].value;

		const queryParams = {
			title: collectionName,
			keywords: keywords,
			authors: author,
			published_after: fromYear,
			published_before: toYear,
		};

		try {
			await sendFilterRequest(BASE_URL, queryParams, onFilterResults);
		} catch (error) {
			console.error("Error sending GET request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		// Reset form fields
		document.getElementsByName("collection-name")[0].value = "";
		document.getElementsByName("author")[0].value = "";
		setKeywords([]);
		setFromYear("1900");
		setToYear(new Date().getFullYear().toString());

		if (onResetFilter) {
			onResetFilter();
		}
	};

	return (
		<form className="flex flex-col bg-gray-50 py-6 sm:py-8 rounded-lg p-4 sm:p-6 w-full shadow-sm">
			<div className="mb-6 sm:mb-8 w-full">
				<label
					htmlFor="search-collection"
					className="mb-2 sm:mb-4 text-gray-600 block text-sm sm:text-base"
				>
					Search by collection name{" "}
				</label>
				<input
					type="text"
					className="w-full outline-ashesi-red border border-ashesi-red rounded-md py-2 px-4 text-sm sm:text-base"
					name="collection-name"
					defaultValue={initialTitle}
				/>
			</div>

			<div className="mb-6 sm:mb-8 w-full">
				<label
					htmlFor="search-collection"
					className="mb-2 sm:mb-4 text-gray-600 block text-sm sm:text-base"
				>
					Search by author{" "}
				</label>
				<input
					type="text"
					className="w-full outline-ashesi-red border border-ashesi-red rounded-md py-2 px-4 text-sm sm:text-base"
					name="author"
				/>
			</div>

			<div className="mb-6 sm:mb-8 w-full">
				<label
					htmlFor="search-collection"
					className="mb-2 sm:mb-4 text-gray-600 block text-sm sm:text-base"
				>
					Search by keyword
				</label>
				<KeywordInput onKeywordsChange={setKeywords} />
			</div>

			<span className="text-center text-gray-600 mb-4 text-sm sm:text-base">
				PUBLISHED FROM
			</span>
			<div className="flex gap-4 sm:gap-8 w-full items-center justify-center mb-6 sm:mb-8">
				<input
					type="number"
					className="w-20 border border-ashesi-red rounded-md p-2 pl-4 focus:outline-ashesi-red text-sm sm:text-base"
					placeholder="YYYY"
					value={fromYear}
					onChange={handleFromChange}
					onKeyDown={(e) => {
						if (["e", "E", "+", "-", "."].includes(e.key))
							e.preventDefault();
					}}
					onBlur={() => {
						if (!fromYear) setFromYear("1900");
					}}
				/>

				<span className="text-gray-600 text-sm sm:text-base">TO</span>
				<input
					type="number"
					className="w-20 border border-ashesi-red rounded-md p-2 pl-4 focus:outline-ashesi-red text-sm sm:text-base"
					placeholder="YYYY"
					value={toYear}
					onChange={handleToChange}
					onKeyDown={(e) => {
						if (["e", "E", "+", "-", "."].includes(e.key))
							e.preventDefault();
					}}
					onBlur={() => {
						if (!toYear) setToYear("2100");
					}}
				/>
			</div>
			<div className="mb-4 flex justify-between w-full px-4 sm:px-12 gap-4">
				<CustomButton
					text="GO"
					width="w-24 sm:w-28"
					height="h-8 sm:h-10"
					onClick={handleSearch}
					type="button"
					className="text-sm sm:text-base"
				/>
				<CustomButton
					text="RESET"
					width="w-24 sm:w-28"
					height="h-8 sm:h-10"
					onClick={handleReset}
					type="button"
					className="text-sm sm:text-base"
				/>
			</div>
		</form>
	);
}
