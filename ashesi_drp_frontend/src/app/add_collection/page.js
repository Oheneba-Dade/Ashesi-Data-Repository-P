"use client";
import "../globals.css";
import {useEffect, useState} from "react";
import KeywordInput from "@/components/KeywordInput";
import DynamicFieldGroup from "@/components/DynamicFieldGroup";
import CustomButton from "@/components/CustomButton";
import { FiInfo } from "react-icons/fi";
import { useRouter } from 'next/navigation'
import AxiosInstance from "@/auth_lib/axios";

// Common classes for form fields
const formGroupClass = "flex items-start gap-4 mb-8";
const labelClass = "w-40 text-left pt-2";
const inputClass = "p-2 border border-ashesi-red rounded-md focus:outline-ashesi-red flex-1";
const textareaClass = "p-2 border border-ashesi-red rounded-md focus:outline-ashesi-red flex-1 h-30";


const InfoTooltip = ({ text }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div className="relative inline-block">
			<FiInfo
				size={16}
				className="text-gray-500 inline cursor-help"
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				onClick={() => setShowTooltip(!showTooltip)}
			/>
			{showTooltip && (
				<div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg -left-20 top-6">
					{text}
				</div>
			)}
		</div>
	);
};

const LoadingOverlay = ({ show }) => (
	<div
		className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
			show ? "opacity-100 visible" : "opacity-0 invisible"
		}`}
	>
		<div className="bg-white p-6 rounded-md shadow-lg">
			<p className="text-lg font-semibold text-ashesi-red">
				Publishing Collection...
			</p>
		</div>
	</div>
);

const Modal = ({ show, message, onClose }) => (
	<div
		className={`fixed inset-0 flex items-center justify-center transition-opacity ${
			show ? "opacity-100 visible" : "opacity-0 invisible"
		}`}
	>
		<div className="bg-white p-6 rounded-md shadow-lg text-center max-w-sm">
			<p className="text-lg">{message}</p>
			<button
				className="mt-4 px-4 py-2 bg-ashesi-red text-white rounded-md"
				onClick={onClose}
			>
				OK
			</button>
		</div>
	</div>
);

export default function AddDataset() {
	const [keywords, setKeywords] = useState([]);
	const [authorGroups, setAuthorGroups] = useState([]);
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);



	useEffect(() => {
		const jwt = localStorage.getItem("jwt");

		if (!jwt) {
			router.push("/auth"); // Redirect to login if no token
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = document.getElementById("title").value;
		const date_of_publication = document.getElementById("date_of_publication").value;
		const doi_link = document.getElementById("doi").value;
		const citation = document.getElementById("citation").value;
		const abstract = document.getElementById("abstract").value;
		const instance_representation = document.getElementById("instance_representation").value;
		const zipped_file = document.getElementById("data-file").files[0];
		const comments = document.getElementById("comments").value;

		const authors = authorGroups.map(group => {
			const nameField = group.find(field => field.name === 'name');
			const emailField = group.find(field => field.name === 'email');
			return {
				name: nameField?.value || '',
				email: emailField?.value || ''
			};
		});

		try{
			const response = await AxiosInstance.post("create_collection", {
				"title": title,
				"date_of_publication": date_of_publication,
				"authors": JSON.stringify(authors),
				"doi_link": doi_link,
				"citation": citation,
				"keywords": keywords,
				"abstract": abstract,
				"comment": comments,
				"instance_representation": instance_representation,
				"dataset_file": zipped_file,
			})
			if (response.status === 201) {
				setModalMessage("Collection Published Successfully!");
			} else {
				setModalMessage("Failed to publish collection. Please try again.");
			}
		}catch (error) {
			setModalMessage("Error occurred. Check your connection and try again.");
		} finally {
			setIsLoading(false);
			setShowModal(true);
		}


	}

	return (
	<>
		<LoadingOverlay show={isLoading} />
		<Modal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} />
		<form className="container mx-auto mt-32 max-w-4xl px-4">
			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					Introduction
				</h2>
				<hr className="my-4" />

				<div className={formGroupClass}>
					<label htmlFor="title" className={labelClass}>
						Collection Title <span className="text-red-500">*</span>
					</label>
					<div className="flex-1 flex items-center">
						<input
							type="text"
							id="title"
							name="title"
							className={inputClass}
							required
						/>
					</div>
				</div>

				<div>
					<DynamicFieldGroup
						labelText="Authors"
						namePrefix="authors"
						onGroupsChange={setAuthorGroups}
						fields={[
							{
								type: "text",
								placeholder: "Full Name",
								name: "name",
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

				<div className={formGroupClass}>
					<label htmlFor="title" className={labelClass}>
						Publication Date <span className="text-red-500">*</span>
					</label>
					<div className="flex-1 flex items-center">
						<input
							type="date"
							id="date_of_publication"
							name="date_of_publication"
							className="p-2 border border-ashesi-red rounded-md focus:outline-ashesi-red"
							required
						/>
					</div>
				</div>



			</section>

			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					About Dataset
				</h2>
				<hr className="my-4" />

				<div className={formGroupClass}>
					<label htmlFor="doi" className={labelClass}>
						DOI Link
					</label>
					<input
						type="url"
						id="doi"
						name="doi"
						className={inputClass}
					/>
				</div>

				<div className={formGroupClass}>
					<label htmlFor="citation" className={labelClass}>
						Citation
					</label>
					<textarea
						id="citation"
						name="citation"
						className={textareaClass}
						rows="3"
					></textarea>
				</div>

				<div className={formGroupClass}>
					<label htmlFor="keywords" className={labelClass}>
						Keywords
					</label>
					<div className="flex-1">
						<KeywordInput onKeywordsChange={setKeywords} />
					</div>
				</div>

				<div className={formGroupClass}>
					<label htmlFor="abstract" className={labelClass}>
						Abstract <span className="text-red-500">*</span>
					</label>
					<textarea
						id="abstract"
						name="abstract"
						className={textareaClass}
						rows="5"
						required
					></textarea>
				</div>

				<div className={formGroupClass}>
					<label
						htmlFor="instance_representation"
						className={labelClass}
					>
						What do the records/fields in this dataset represent?{" "}
						<span className="text-red-500">*</span>
					</label>
					<textarea
						id="instance_representation"
						name="instance_representation"
						className={textareaClass}
						rows="5"
						required
					></textarea>
					<InfoTooltip text="Describe your dataset in detail, including the purpose of the data, column names, data types, and what each column represents." />
				</div>
			</section>

			<section className="my-16">
				<h2 className="text-3xl font-semibold text-center text-ashesi-red">
					Data & Files
				</h2>
				<hr className="my-4" />

				<div className={formGroupClass}>
					<label htmlFor="data-file" className={labelClass}>
						Zipped Data File <span className="text-red-500">*</span>
					</label>
					<input
						type="file"
						id="data-file"
						name="data-file"
						className={inputClass}
						required
					/>
				</div>

				<div className={formGroupClass}>
					<label htmlFor="comments" className={labelClass}>
						Licence
					</label>
					<textarea
						id="comments"
						name="comments"
						className={`${inputClass} h-20`}
						rows="3"
					></textarea>
					<InfoTooltip text="Indicate what kind of licence that the collection is governed by, if applicable." />

				</div>

				<div className={formGroupClass}>
					<label htmlFor="comments" className={labelClass}>
						Additional Comments
					</label>
					<textarea
						id="comments"
						name="comments"
						className={`${inputClass} h-20`}
						rows="3"
					></textarea>
				</div>
			</section>
			<div className="flex justify-center mb-16">
				<CustomButton text="Submit" onClick={handleSubmit} />
			</div>
		</form>
	</>
	);
}