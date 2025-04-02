import CustomButton from "@/components/CustomButton";

const HeroBlock = ({
	header,
	subheader,
	text,
	visibleButton = false,
	customButtons = [],
}) => {
	return (
		<div>
			<div className="absolute top-32 left-1/2 transform -translate-x-1/2 lg:translate-y-1/2 md:translate-y-1/4 bg-white shadow-lg rounded-lg p-6 lg:w-3/4 md:w-3/4 sm:w-3/4 text-center z-10">
				<h1 className="text-2xl font-bold text-ashesi-red">{header}</h1>
				<p className="text-ashesi-red mb-5">{subheader}</p>
				<p className="px-8"> {text}</p>

				{visibleButton && (
					<div className="mt-10 flex justify-center gap-4">
						{customButtons.length > 0 ? (
							customButtons.map((button, index) => (
								<div key={index}>{button}</div>
							))
						) : (
							<>
								<CustomButton
									text="ALL COLLECTIONS"
									bgColor="bg-ashesi-red"
									width="w-48"
									href="/collections"
								/>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default HeroBlock;
