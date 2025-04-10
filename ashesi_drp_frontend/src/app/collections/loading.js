import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default function Card() {
  return (
    <div className="relative w-full">
        <div className="mt-24 max-h-[800px]">
			<h1 className="md:col-span-4 font-semibold text-2xl text-center">
				<Skeleton width={350} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
			</h1>
		</div>
		
		<div className="container mx-auto">
			<hr className="my-4" />
		</div>
		
		<div className="mb-4 mx-auto w-full grid grid-cols-1 md:grid-cols-6 gap-10 px-12 ">
			<div className="md:col-span-2">
				{/*empty div to help with alignment*/}
			</div>
		</div>
				
        <div className="mb-14 mx-auto w-full grid grid-cols-1 md:grid-cols-6 gap-20 px-16">
			<div className="md:col-span-2 mt-8" >
				<div className="flex flex-col items-center bg-gray-50 py-8 rounded-lg justify-center mb-8 ml-12 w-96 shadow-md">
					<div className="mb-8">
						<Skeleton width={100} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						<Skeleton width={350} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</div>
		
					<div className="mb-8">
						<Skeleton width={100} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						<Skeleton width={350} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</div>
					
					<div className="mb-8">
						<Skeleton width={100} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						<Skeleton width={350} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</div>
		
					<span className="text-center text-gray-600 mb-4">
						<Skeleton width={200} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</span>
					<div className="flex justify-between w-full items-center mb-8">
						<Skeleton width={100} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
		
						<Skeleton width={50} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						<Skeleton width={100} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</div>
					<div className="mb-4 flex justify-between w-full px-8">
						<Skeleton width={150} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
						<Skeleton width={150} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					</div>
				</div>
			</div>
			
			{/* some collections */}
			<div className="md:col-span-4 max-w-3xl">

				{/* first */}
				<div className="py-4 px-4">
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
				<div className="py-4 px-4">
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
				<div className="py-4 px-4">
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
				<div className="py-4 px-4">
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
				<div className="py-4 px-4">
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
				  
				  <div className="flex justify-between mt-8">
					<Skeleton width={100} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
					<Skeleton width={100} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
		          </div>
				</div>	
			</div>
			</div>
		</div>
  );
}