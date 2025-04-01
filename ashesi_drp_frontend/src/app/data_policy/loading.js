import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default function Card() {
  return (
        <div className="container mx-auto mt-32 px-64">
            <Skeleton width="30%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className="mb-8 "/>

			<p className="mb-8">
                <Skeleton width="100%" height={100} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			</p>
			<h2 className="mb-8">
                <Skeleton width="80%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			</h2>
			<ul className="list-disc mb-16">
				<li className="mb-8">
                    <Skeleton width="100%" height={70} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				</li>
				<li className="mb-8">
                    <Skeleton width="100%" height={70} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				</li>
				<li className="mb-8">
                    <Skeleton width="100%" height={70} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				</li>
				<li className="mb-6">
                    <Skeleton width="100%" height={70} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				</li>
			</ul>

			<p className=" mb-12">
                <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			</p>

			<div className="flex justify-center items-center mb-24">
                <Skeleton width={300} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			</div>
		</div>                                                                                                            
  );
}
