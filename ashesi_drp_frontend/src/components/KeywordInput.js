"use client";
import { useState } from "react";

export default function KeywordInput({ onKeywordsChange }) {
	const [keywords, setKeywords] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (e) => {
		const trimmed = inputValue.trim();
		if (e.key === "Enter" && trimmed !== "") {
			e.preventDefault();
			if (!keywords.includes(trimmed)) {
				const newKeywords = [...keywords, trimmed];
				setKeywords(newKeywords);
				onKeywordsChange(newKeywords);
			}
			setInputValue("");
		}
	};

	const removeKeyword = (index) => {
		const newKeywords = keywords.filter((_, i) => i !== index);
		setKeywords(newKeywords);
		onKeywordsChange(newKeywords);
	};

	return (
		<div className="flex items-center gap-4 w-full">
			<div className="flex flex-wrap items-center gap-2 py-1 px-4 border border-ashesi-red rounded-md w-full min-h-[42px]">
				{keywords.map((keyword, index) => (
					<span
						key={index}
						className="flex items-center gap-1 px-2 py-1 text-white bg-ashesi-red rounded-md text-sm sm:text-base transition-all duration-200"
					>
						{keyword}
						<button
							onClick={() => removeKeyword(index)}
							className="text-sm text-white hover:text-gray-200"
						>
							✕
						</button>
					</span>
				))}

				{/* Ghost tag preview */}
				{inputValue && !keywords.includes(inputValue.trim()) && (
					<span className="flex items-center gap-1 px-2 py-1 text-white bg-ashesi-red/70 rounded-md italic opacity-80 text-sm sm:text-base">
						{inputValue}
					</span>
				)}

				<input
					type="text"
					id="keywords"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type and press Enter..."
					className={`p-1 outline-none flex-grow min-w-[100px] bg-transparent text-sm sm:text-base ${
						inputValue ? "text-ashesi-red" : ""
					}`}
				/>
			</div>
		</div>
	);
}
