"use client";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import CustomButton from "@/components/CustomButton";
import { BASE_URL } from "@/utils/constants";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";

const FileTable = ({
	collection_id,
	showRoles = true,
	textContent = "Want to Download Files?",
}) => {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(true);

	// hooks for popup
	const [showPopup, setShowPopup] = useState(false);
	const [reason, setReason] = useState("");
	const [specificReason, setSpecificReason] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		fetchFile();
	}, [collection_id]);

	const fetchFile = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${BASE_URL}/get_dataset/?collection_id=${collection_id}`
			);
			const data = await response.json();

			if (data.length > 0) {
				setFile(data);
			}
			setLoading(false);
		} catch (error) {
			console.error("Error fetching collection:", error);
			setLoading(false);
		}
	};

	// Function to handle second API call
	const fetchAdditionalData = async () => {
		if (!file || file.length === 0) return;

		setLoading(true);

		try {
			const response = await fetch(`${BASE_URL}/dataset_download/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					filename: file[0].file_name,
					collection_id,
				}),
			});
			const result = await response.json();

			if (result.status == 200) {
				setTimeout(() => {
					window.open(result.file_url, "_blank");
					setLoading(false);
				}, 1000);
			} else {
				alert("Could not get download link");
				setLoading(false);
			}
		} catch (error) {
			console.error("Error in second fetch:", error);
			setLoading(false);
		}
	};

	// Show loading
	if (loading)
		return (
			<div className="flex justify-center items-center h-8">
				<Image
					src="/animation/loading.gif"
					alt="Loading..."
					width={100}
					height={100}
				/>
			</div>
		);
	if (!file || file.length === 0) return <p>No file found.</p>;

	// Pop Up form
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!reason.trim() || !email.trim()) {
			alert("Please enter a reason before downloading.");
			return;
		}
		setShowPopup(false);
		setLoading(true);
		await fetchAdditionalData();

		// Close the popup after submission
		setShowPopup(false);
		// setReason("");
		// setSpecificReason("");
		// setEmail("");
	};

	return (
		<div className="max-w-3xl mx-auto mt-1">
			{/* Top Section */}
			<div className="flex justify-between items-start">
				<p className="text-gray-700 max-w-lg"></p>
				<CustomButton
					text={textContent}
					bgColor="bg-white"
					textColor="text-ashesi-red"
					onClick={() => setShowPopup(true)}
					width={textContent == "Download" ? "w-full" : "w-auto"}
					height="h-10"
					icon={textContent == "Download" ? FiDownload : ""}
					iconPosition={textContent == "Download" ? "right" : ""}
					iconClassName={textContent == "Download" ? "text-md" : ""}
					className={
						textContent == "Download"
							? "flex items-center justify-between text-sm !font-medium border border-ashesi-red py-2 px-4 hover:bg-ashesi-red hover:text-white"
							: "text-sm !font-medium border border-ashesi-red px-4 py-2 px-4 hover:bg-ashesi-red hover:text-white"
					}
				/>

				{/* Popup Modal */}
				{showPopup && (
					<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-120">
							<h2 className="text-xl text-ashesi-red font-semibold mb-4">
								Submit a Reason for Downloading
							</h2>

							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-3 flex-grow"
							>
								<label className="block mb-2 font-medium">
									Email:
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ashesi-red"
									placeholder="Enter your email here..."
									required
								/>

								{/* Reason Selection */}
								<label className="block mt-4 mb-2 font-medium">
									Reason:
								</label>
								<select
									value={reason}
									onChange={(e) => setReason(e.target.value)}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ashesi-red"
									required
								>
									<option value="" disabled>
										Select a reason
									</option>
									<option value="Academic Research">
										Academic Research
									</option>
									<option value="Course Assignment">
										Course Assignment
									</option>
									<option value="Personal Interest">
										Personal Interest
									</option>
									<option value="Industry or Professional Use">
										Industry or Professional Use
									</option>
									<option value="Other">Other</option>
								</select>

								{/* Show text area if 'Other' is selected */}
								<textarea
									value={specificReason}
									onChange={(e) =>
										setSpecificReason(e.target.value)
									}
									className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ashesi-red"
									rows="2"
									placeholder="Please specify your reason..."
									required
								></textarea>

								{/* Buttons */}
								<div className="flex justify-end mt-4 gap-2">
									<CustomButton
										text="Cancel"
										bgColor="bg-gray-400"
										textColor="text-white"
										onClick={() => setShowPopup(false)}
										width="w-auto"
										height="h-10"
										className="px-4 py-2 rounded-md hover:bg-gray-500 transition"
									/>

									<CustomButton
										text="Submit"
										bgColor="bg-ashesi-red"
										textColor="text-white"
										href=""
										width="w-auto"
										height="h-10"
										className="px-4 py-2 rounded-md hover:bg-ashesi-red transition"
									/>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
			{/* <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(file, null, 2)}</pre> */}
			{/* Table */}
			{showRoles && (
				<div className="mt-6 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b">
								<th className="text-left font-semibold py-2">
									Filename
								</th>
								<th className="text-left font-semibold py-2">
									Uploaded On
								</th>
								<th className="text-left font-semibold py-2">
									Type
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b">
								<td className="py-3 flex items-center gap-2">
									<AiOutlineFile className="text-xl text-gray-500" />
									{file[0].file_name}
								</td>

								<td className="text-gray-600">
									{file[0].uploaded_at.slice(0, 10)}
								</td>
								<td className="text-gray-600">
									{file[0].file_type}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default FileTable;
