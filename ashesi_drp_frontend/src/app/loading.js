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
			<HeroBlock
				header="Welcome to Ashesi Data Repository"
				subheader="Welcome to the heart of Ashesi’s research excellence"
				text="At Ashesi University, we are committed to fostering a culture of academic
					excellence, collaboration, and ethical research. The Ashesi Research Data
					Repository (ARDR) is designed to empower our researchers, faculty, and students
					by offering a secure and dynamic platform for managing, archiving, and sharing
					research data across all disciplines.
					The ARDR is currently home to [X] active researchers, hosting [Y] research
					datasets, including publicly accessible collections that promote interdisciplinary
					knowledge sharing. By providing a seamless interface for research data
					management, Ashesi University aims to support the growing movement towards
					Open Science and FAIR data practices."
				visibleButton={true} 
				customButtons={
					[
						<CustomButton
							text="ALL COLLECTIONS" 
							bgColor="bg-ashesi-gray" 
							width="w-48" 
							href="/collections" 
						/>,
						<CustomButton 
							text="CONTRIBUTE" 
							href="/"  
						/>
					]
				}
			/>
			
			<div className="sm:mt-96 md:mt-96 lg:mt-64 mb-[310px] max-h-[800px]"></div>
			<div className="w-full text-center mx-auto max-w-4xl"> 
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