"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import KeywordInput from "@/components/KeywordInput";
import DynamicFieldGroup from "@/components/DynamicFieldGroup";
import CustomButton from "@/components/CustomButton";



export default function AddDataset() {
	const [keywords, setKeywords] = useState([]);
	const router = useRouter()

	useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            router.push("/auth"); // Redirect to login if no token
        }
    }, []);

	return (
		<form className="container mx-auto mt-32 px-48">
			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					Introduction
				</h2>
				<hr className="my-4" />

				{/* Input Group 1 */}
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="title" className="w-40 text-left">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="p-2 border border-ashesi-red rounded-md w-96 focus:outline-ashesi-red"
						required
					/>
				</div>
				<div className="flex items-center justify-left gap-4 mb-8">
					<DynamicFieldGroup
						labelText="Authors"
						namePrefix="authors"
						fields={[
							{
								type: "text",
								placeholder: "First Name",
								name: "firstName",
								required: true,
							},
							{
								type: "text",
								placeholder: "Last Name",
								name: "lastName",
								required: true,
							},
							{
								type: "email",
								placeholder: "Email",
								name: "email",
								required: true,
							},
						]}
					/>
				</div>

				{/* Input Group 2 */}
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="doi" className="w-40 text-left">
						DOI Link <span className="text-red-500">*</span>
					</label>
					<input
						type="url"
						id="doi"
						name="doi"
						className="p-2 border border-ashesi-red rounded-md w-96 focus:outline-ashesi-red"
						required
					/>
				</div>
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="keywords" className="w-40 text-left">
						Keywords
					</label>
					<KeywordInput onKeywordsChange={setKeywords} />
				</div>
			</section>

			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					About Dataset
				</h2>
				<hr className="my-4" />
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="abstract" className="w-40 text-left">
						Abstract <span className="text-red-500">*</span>
					</label>
					<textarea
						id="abstract"
						name="abstract"
						className="p-2 border border-ashesi-red rounded-md w-5/6 h-40 focus:outline-ashesi-red"
						rows="5"
						required
					></textarea>
				</div>
				<div className="flex items-center justify-left gap-4 mb-8">
					<label
						htmlFor="dataset-represent"
						className="w-40 text-left"
					>
						What do the instances in this dataset represent?{" "}
						<span className="text-red-500">*</span>
					</label>
					<textarea
						id="dataset-represent"
						name="dataset-represent"
						className="p-2 h-40 border border-ashesi-red rounded-md focus:outline-ashesi-red w-5/6"
						rows="5"
						required
					></textarea>
				</div>
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="missing-values" className="w-40 text-left">
						Any missing values?{" "}
						<span className="text-red-500">*</span>
					</label>
					<select
						id="missing-values"
						name="missing-values"
						className="p-2 border border-ashesi-red rounded-md w-24 focus:outline-ashesi-red"
						required
					>
						<option value="no">Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			</section>
			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					Data & Files
				</h2>
				<hr className="my-4" />
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="data-file" className="w-40 text-left">
						Zipped Data File <span className="text-red-500">*</span>
					</label>
					<input
						type="file"
						id="data-file"
						name="data-file"
						className="p-2 border border-ashesi-red rounded-md w-96 focus:outline-ashesi-red"
						required
					/>
				</div>
				<div className="flex items-center justify-left gap-4 mb-8">
					<label htmlFor="comments" className="w-40 text-left">
						Comments <span className="text-red-500">*</span>
					</label>
					<textarea
						id="comments"
						name="comments"
						className="p-2 w-5/6 h-20 border border-ashesi-red rounded-md focus:outline-ashesi-red"
						rows="3"
						required
					></textarea>
				</div>
			</section>
			<div className="flex justify-center mb-16">
				<CustomButton text="Submit" />
			</div>
		</form>
	);
}
