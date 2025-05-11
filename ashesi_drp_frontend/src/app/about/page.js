import "../globals.css";

import Image from "next/image";
import StatBlock from "@/components/StatBlock";
import { BASE_URL } from "@/utils/constants";

// Cache the page for 3 hours (10800 seconds) and revalidate after that
export const revalidate = 10800;

export default async function About() {
	let stats = {
		collection_count: 0,
		author_count: 0,
		download_count: 0,
		view_count: 0,
	};

	try {
		const response = await fetch(`${BASE_URL}/get_stats?`, {
			next: { revalidate: 10800 }, // Revalidate the data every 3 hours
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		stats = await response.json();
	} catch (error) {
		console.error("Failed to fetch stats:", error);
	}

	return (
		<div className="mx-auto my-10 md:my-20 px-4 sm:px-6">
			<div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 max-w-5xl mx-auto p-4 sm:p-6">
					{/* First Column */}
					<div className="grid grid-rows-4 gap-2">
						<div className="row-span-1">
							<div>
								<span className="block text-ashesi-red text-sm sm:text-base">
									OUR GOAL IS TO ADVANCE
								</span>
								<p className="text-ashesi-red text-xl sm:text-2xl font-medium">
									RESEARCH <br /> EXCELLENCE
								</p>
							</div>
						</div>

						<div className="row-span-3 text-justify leading-6 text-sm sm:text-base">
							<p>
								At Ashesi, we are committed to fostering a
								culture of research, innovation, and knowledge
								sharing. The Ashesi Data Repository is a
								dedicated platform designed to store, manage,
								and provide access to valuable research data
								across various disciplines.
							</p>
							<br />
							<p>
								By centralizing datasets, research findings, and
								academic resources, the repository empowers
								students, faculty, and researchers to
								collaborate, explore new insights, and
								contribute to global knowledge. Through this
								initiative, we aim to enhance transparency,
								reproducibility, and the overall impact of
								research conducted within the Ashesi community
								and beyond.
							</p>
							<br />
							<p>
								Join us in our mission to advance research
								excellence and drive meaningful change through
								data-driven discoveries.
							</p>
						</div>
					</div>

					{/* Second column */}
					<div className="grid grid-rows-2 gap-4">
						<div className="relative w-full aspect-[4/3]">
							<Image
								src="/images/welcome/library.webp"
								alt="Ashesi Logo"
								fill
								className="object-cover rounded-lg border-4 border-ashesi-red"
							/>
						</div>

						<div className="grid grid-cols-2 gap-2 sm:gap-4 mb-8 justify-center items-center text-center h-auto sm:h-16">
							<StatBlock
								title={stats.collection_count}
								value="Collections"
							/>
							<StatBlock
								title={stats.author_count}
								value="Authors"
							/>
							<StatBlock
								title={stats.download_count}
								value="Downloads"
							/>
							<StatBlock title={stats.view_count} value="Views" />
						</div>
					</div>
				</div>
				<div className="max-w-5xl mx-auto p-4 sm:p-6">
					<hr className="mb-10 sm:mb-20" />
					<h3 className="text-ashesi-red uppercase font-medium mb-6 sm:mb-8 text-base sm:text-lg">
						The Ashesi Research Data Repository allows our academic
						community to:
					</h3>
					<ul className="list-disc mb-10 sm:mb-16 pl-4 sm:pl-6 text-sm sm:text-base">
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Publish Research Data:
							</span>{" "}
							Share your findings with the global academic
							community, ensuring your work reaches beyond
							borders.
						</li>
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Enhance Collaboration:
							</span>{" "}
							Connect with fellow researchers and contribute to
							collective knowledge across disciplines
						</li>
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Ensure Data Integrity:
							</span>{" "}
							Securely store, manage, and preserve your research
							data for future reference and validation.
						</li>
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Increase Research Impact:
							</span>{" "}
							Improve visibility and accessibility, allowing your
							work to inform and inspire new discoveries.
						</li>
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Support Open Science:
							</span>{" "}
							Promote transparency and knowledge-sharing by making
							research data
						</li>
						<li className="mb-3 sm:mb-4">
							<span className="font-semibold">
								Facilitate Innovation:
							</span>{" "}
							Provide a foundation for data-driven insights and
							breakthroughs in diverse fields of study.
						</li>
					</ul>
					<hr className="mb-8 sm:mb-10" />
				</div>
			</div>
		</div>
	);
}
