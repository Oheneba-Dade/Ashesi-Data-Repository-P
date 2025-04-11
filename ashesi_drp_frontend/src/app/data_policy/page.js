"use client";
import CustomButton from "@/components/CustomButton";
import "../globals.css";

export default function DataPolicy() {
	return (
		<div className="container mx-auto mt-32 px-64">
			<h1 className="text-ashesi-red font-bold text-4xl mb-8 ">
				Data Policy
			</h1>
			<p className="text-base/8 mb-8">
				Thank you for considering the contribution of a dataset to the
				Ashesi Data Repository. By donating your dataset, you are
				actively supporting and advancing research in data science and
				machine learning, ensuring the continued strength and relevance
				of these fields in academia and beyond.
			</p>
			<h2 className="text-ashesi-red text-xl mb-8 font-semibold">
				Before donating a dataset, please read the IMPORTANT information
				below:
			</h2>
			<ul className="list-disc mb-16">
				<li className="mb-8">
					You must obtain explicit permission before making a dataset
					publicly available. If you are not the original data
					collector, it is essential that the original collector is
					informed about your intention to contribute the dataset to
					the Ashesi Data Repository and provides their consent.
				</li>
				<li className="mb-8">
					If your dataset contains any Personally Identifiable
					Information (PII), ensure that all such data is removed
					prior to submission to prevent the identification of
					individuals.
				</li>
				<li className="mb-8">
					Approved datasets will be assigned a Digital Object
					Identifier (DOI) if they do not already have one. DOIs
					enable &quot;persistent and actionable identification &quot;
					of datasets, a critical element in ensuring reproducible
					research. For more details about DOIs, please consult the
					DOI Handbook.
				</li>
				<li className="mb-8">
					All datasets in the repository will be licensed under the
					Creative Commons Attribution 4.0 International license (CC
					BY 4.0), which permits the sharing and adaptation of the
					dataset for any purpose, provided that appropriate credit is
					given (refer to the Citation Policy). For further
					information about the CC BY 4.0 license, please consult the
					license deed.
				</li>
			</ul>

			<p className="text-ashesi-red text-xl mb-12 font-semibold">
				For questions, please email .....@ashesi.edu.gh
			</p>

			<div className="flex justify-center items-center mb-24">
				<CustomButton
					text="LOGIN BEFORE CONTRIBUTING"
					bgColor="bg-gray-100"
					textColor="text-ashesi-red"
					border="border border-ashesi-red"
					width="1/2"
					href="/auth"
				/>
			</div>
		</div>
	);
}
