"use client";
import { useState } from "react";

export default function DynamicFieldGroup({ labelText, fields, namePrefix, onGroupsChange }) {
	const [count, setCount] = useState(1);
	// Ensure fields is always an array
	const safeFields =
		Array.isArray(fields) && fields.length > 0
			? fields
			: [{ type: "text", placeholder: "Enter text", name: "field" }];

	const [fieldGroups, setFieldGroups] = useState([
		createEmptyGroup(safeFields),
	]);

	function createEmptyGroup(fields) {
		return fields.map((field) => ({
			type: field.type,
			name: field.name || "field", // Assign a name if not provided
			placeholder: field.placeholder || "",
			value: field.type === "file" ? null : "",
		}));
	}

	const handleChange = (groupIndex, fieldIndex, value) => {
		const updatedGroups = [...fieldGroups];
		updatedGroups[groupIndex][fieldIndex].value = value;
		setFieldGroups(updatedGroups);
		if(onGroupsChange) onGroupsChange(updatedGroups);
	};

	const addGroup = () => {
		const newGroups = [...fieldGroups, createEmptyGroup(safeFields)];
		setFieldGroups(newGroups);
		if(onGroupsChange) onGroupsChange(newGroups);
	};

	const removeGroup = (index) => {
		if (fieldGroups.length > 1) {
			const newGroups = fieldGroups.filter((_, i) => i !== index);
			setFieldGroups(newGroups);
			if(onGroupsChange) onGroupsChange(newGroups);
		}
	};

	return (
		<div className="flex items-start gap-4 mb-8">
			<label className="w-40 text-left pt-2">
				{labelText} <span className="text-red-500">*</span>
			</label>
			<div className="flex flex-col gap-2 flex-1">
				{fieldGroups.map((group, groupIndex) => (
					<div key={groupIndex} className="flex items-center gap-2 w-full">
						{group.map((field, fieldIndex) => (
							<input
								key={fieldIndex}
								type={field.type}
								name={`${namePrefix}[${groupIndex}][${field.name}]`}
								value={
									field.type === "text" || field.type === "email"
										? field.value
										: undefined
								}
								onChange={(e) =>
									handleChange(
										groupIndex,
										fieldIndex,
										field.type === "file"
											? e.target.files[0]
											: e.target.value
									)
								}
								className="p-2 border border-ashesi-red rounded-md focus:outline-ashesi-red flex-1"
								placeholder={field.placeholder}
							/>
						))}

						{/* Buttons */}
						<div className="flex-shrink-0">
							{groupIndex === 0 ? (
								<button
									onClick={addGroup}
									type="button"
									className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ashesi-red hover:bg-ashesi-red hover:text-white border border-ashesi-red"
								>
									+
								</button>
							) : (
								<button
									onClick={() => removeGroup(groupIndex)}
									type="button"
									className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ashesi-red hover:bg-ashesi-red hover:text-white border border-ashesi-red"
								>
									-
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}