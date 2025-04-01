import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default async function UsersTable() {

  return (
        <div className="max-w-5xl mx-auto my-24 p-6">
            <div className="flex justify-between items-center space-x-4 mb-4">
               <div className="flex space-x-4">
                  <Skeleton width={150} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
                  <Skeleton width={150} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
               </div>
              
              <div>
                <Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
              </div>   
             </div>
             <div className="w-full mt-8 bg-white rounded-lg overflow-hidden">
                <table className="w-full border-collapse border-separate border-spacing-y-8">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-600">
                        <th><Skeleton width={200} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                        <th><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                        <th><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                        <th><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                        <th><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                        <th><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></th>
                    </tr>
                  </thead>
        
                  {/* Table Body */}
                  <tbody className="space-y-4 pb-12">
                      <tr className="border-b space-y-8 shadow-md shadow-gray-100">
                        <td><Skeleton width={200} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                      </tr>
                      
                      <tr className="border-b space-y-8 shadow-md shadow-gray-100">
                        <td><Skeleton width={200} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                      </tr>
                      
                      <tr className="border-b space-y-8 shadow-md shadow-gray-100">
                        <td><Skeleton width={200} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                        <td><Skeleton width={100} height={40} baseColor="#dce3e8" highlightColor="#f0f4f8"/></td>
                      </tr>
                  </tbody>
                </table>
            </div>
                
        </div>
        
  );
  
}