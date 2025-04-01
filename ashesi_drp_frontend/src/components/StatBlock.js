"use client";

const StatBlock = ({ title, value }) => {
	return (
		<div className="w-full px-4 pt-2 rounded-lg bg-[#F5F5F5] shadow-md mb-2 block">
			<div className="text-3xl font-semibold text-ashesi-red">
				{title}
			</div>
			<div className="text-lg font-light">{value}</div>
		</div>
	);
};

export default StatBlock;
