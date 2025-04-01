import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../globals.css";

export default function Card() {
  return (
    <div className="max-w-5xl mx-auto mt-20 px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column */}
        <div className="md:col-span-3">
                        
            {/* Title Section */}
			<div>
                <Skeleton width={200} height={20} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				
		        <hr className="my-3" />
		        
                <Skeleton width={700} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8" className="mt-2"/>

		        <p className="mt-2 text-blue-800 underline">
                    <Skeleton width={300} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
				</p>
				
				<div className="mt-10 flex flex-wrap justify-between text-ashesi-gray">
				    <div>
                        <Skeleton width={250} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
				    </div>
				    <div>
                        <Skeleton width={150} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
				    </div>
				</div>
				
				<div className="mt-2 flex flex-wrap justify-between text-ashesi-gray">
				    <div>
                        <Skeleton width={300} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				    </div>
				    <div>
                        <Skeleton width={300} height={30} baseColor="#dce3e8" highlightColor="#f0f4f8" />
				    </div>
				</div>
				
				<hr className="mt-5 mb-8" />
			</div>
	
	        {/* Abstract Section */}
	        <div>
		        <hr className="my-3" />
		        
		        <Skeleton width="100%" height={100} baseColor="#dce3e8" highlightColor="#f0f4f8" />

		        <hr className="mt-5 mb-8" />
	        </div>  
	        
	        {/*  INTRODUCTORY PAPER */}
	        <div>
				<hr className="my-3" />
				
                <Skeleton width="100%" height={100} baseColor="#dce3e8" highlightColor="#f0f4f8" />
				
				<hr className="mt-5 mb-8" />
	        </div>
	        
	        {/*  DATASET INFORMATION */}
	        <div>
				<hr className="my-3" />
				
                <Skeleton width="100%"  height={100} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
				
				<hr className="mt-5 mb-8" />
	        </div>

	        
	        {/*  FILES */}
	        <div>
				<hr className="my-3" />
				
                <Skeleton width="100%"  height={100} baseColor="#dce3e8" highlightColor="#f0f4f8" />
				
				<hr className="mt-5 mb-8" />
	        </div>
	    </div>
      
    
        {/* Right Column*/}
        <div className="bg-gray-50 px-4 py-8 rounded-lg shadow-md h-auto self-start">
	        <Skeleton width="100%"  height={40} baseColor="#dce3e8" highlightColor="#f0f4f8" />
            <Skeleton width="100%"  height={40} baseColor="#dce3e8" highlightColor="#f0f4f8" />
            <Skeleton width="100%"  height={40} baseColor="#dce3e8" highlightColor="#f0f4f8" />

			
			<div className="my-5">
		        <div className="">
                    <Skeleton width={80}  height={30}  baseColor="#dce3e8" highlightColor="#f0f4f8" />
		        </div>
		        <div className="flex items-center gap-4 mt-3">
					<Skeleton width={120}   height={30}  baseColor="#dce3e8" highlightColor="#f0f4f8" />
		        </div>
		        <div className="flex items-center gap-4 mt-3">
					<Skeleton width={120}   height={30}  baseColor="#dce3e8" highlightColor="#f0f4f8" />
 		        </div>
	        </div>
	        
	        <hr className="my-6" />
	        
            <Skeleton width="100%" height={60} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
	
	        <hr className="my-6" />
	        
            <Skeleton width="100%" height={100} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
	    </div>
    
    </div>
  
  );
}