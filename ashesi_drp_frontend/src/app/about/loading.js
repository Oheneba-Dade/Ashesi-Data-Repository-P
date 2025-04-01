import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default function Card() {
  return (
		<div className="mx-auto my-20">
			<div>
				<div className="grid grid-cols-2 gap-32 max-w-5xl mx-auto p-6">
					{/* First Column */}
					<div className="grid grid-rows-4 gap-2">
						<div className="row-span-1">
							<div>
								<span className="block">
                                    <Skeleton width="70%" height={25} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
								</span>
								<p className="text-ashesi-red text-2xl">
				                    <Skeleton width="40%" height={35} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				                    <Skeleton width="50%" height={35} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
								</p>
							</div>
						</div>

						<div className="row-span-3">
                            <Skeleton width="100%" height={400} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</div>
					</div>

                    {/* Second column */}
					<div className="grid grid-rows-2">
                        <Skeleton width="100%" height={250} baseColor="#dce3e8" highlightColor="#f0f4f8"/>

						<div className="grid grid-cols-2 gap-2 mb-8">
			              <Skeleton width="100%" height={90} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			              <Skeleton width="100%" height={90} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			              <Skeleton width="100%" height={90} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			              <Skeleton width="100%" height={90} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</div>
					</div>
				</div>
				<div className="max-w-5xl mx-auto p-6">
					<hr className="mb-20" />
					<h3 className=" mb-8">
						<Skeleton width="90%"height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</h3>
					<ul className="list-disc mb-16">
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
						<li className="mb-4">
                            <Skeleton width="100%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						</li>
					</ul>
					<hr className="mb-10" />
				</div>
			</div>
		</div>
  )
}