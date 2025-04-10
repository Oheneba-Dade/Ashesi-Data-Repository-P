import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import HeroBlock from "@/components/HeroBlock";
import CustomButton from "@/components/CustomButton";
import Slideshow from "@/components/Slideshow";


export default function Card() {
  return (
    <div className="relative w-full">
			<Slideshow/>

			<div className="max-h-[800px]"></div>
			<div className="w-full mb-16 text-center mx-auto max-w-4xl"> 
				<Skeleton width={300} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8" />
			</div>
			
		{/* some collections */}
		<div className="mb-14 mx-auto w-full max-w-4xl">
			
	        {/* first */}
	        <div className="py-6 px-4">
			  <Skeleton width={300} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <Skeleton height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
	
			  <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
			</div>
			
  			{/* Second */}
  			<div className="py-6 px-4">
			  <Skeleton width={300} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <Skeleton height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
	
			  <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
			</div>
  			
  			{/* Third */}
  			<div className="py-6 px-4">
			  <Skeleton width={300} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <Skeleton height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
	
			  <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
			</div>
			
			{/* Fourth */}
			<div className="py-6 px-4">
			  <Skeleton width={300} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <Skeleton height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
	
			  <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
			</div>			
			
			
			{/* Fifth */}
			<div className="py-6 px-4">
			  <Skeleton width={300} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <Skeleton height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  <div className="mt-4 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
	
			  <div className="mt-1 flex flex-wrap justify-between text-sm text-ashesi-gray">
				<Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				<Skeleton width={210} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			  </div>
			</div>
        </div>
  			
  	</div>
  );
}