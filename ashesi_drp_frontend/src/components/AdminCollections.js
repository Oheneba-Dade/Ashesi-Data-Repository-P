"use client"
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCircle, FaChevronDown } from "react-icons/fa";
import CustomButton from "@/components/CustomButton";
import Link from 'next/link';
import { BASE_URL } from "@/utils/constants";

export default function AdminCollections() {

    const [jwt, setJWT] = useState("");
    const [selectedCollections, setselectedCollections] = useState([]);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortedCollections, setSortedCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            const jwt = localStorage.getItem("jwt");
            setJWT(jwt);
            const user = localStorage.getItem("user");
    
            if (!jwt && !user) {
              window.location.href = "/auth"; // Redirect to login if no token
            }
            
            getCollections(jwt);
      }, []);

  
    // for bulk operation
    // const toggleSelection = (id) => {
    //   setselectedCollections((prev) =>
    //     prev.includes(id) ? prev.filter((collectionId) => collectionId !== id) : [...prev, id]
    //   );
    // };
    
    // get collections
    const getCollections = async (jwt) => {
        try {
        
          // get pending collections
          const response =  await fetch(`${BASE_URL}/get_all_collections/?status=pending`, {
              method: "GET",
              cache: "no-store",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,
              },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
          
          // get rejected collections
          const response1 = await fetch(`${BASE_URL}/get_all_collections/?status=rejected`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+jwt,
            },
          });
      
          if (!response1.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data1 = await response1.json();
          
          // get aproved collections
          const response2 =  await fetch(`${BASE_URL}/get_all_collections/?status=approved`, {
              method: "GET",
              cache: "no-store",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,
              },
          });
      
          if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data2 = await response2.json();
          
          //concat lists
          const combined = data.results.concat(data1.results);
          const combined1 = combined.concat(data2.results)
         
          setSortedCollections(combined1)
          console.log(combined);
          // Handle data as needed
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
    };
      
    
    // Handle sorting
    const handleSort = (criteria) => {
        setSortCriteria(criteria);
      
        const sorted = [...sortedCollections].sort((a, b) => {
          if (criteria === "title") {
            return a.title.localeCompare(b.title);
          } 
          else if (criteria === "publication_date") {
            return new Date(a.date_of_publication) - new Date(b.date_of_publication);
          } 
          else if (criteria === "submission_date") {
            return new Date(a.date_of_submission) - new Date(b.date_of_submission);
          } 
          else if (criteria === "status-r") {
            const order = { "rejected": 1, "pending": 2, "approved": 3 };
            return (order[a.approval_status] || 4) - (order[b.approval_status] || 4);
          }
          else if (criteria === "status-p") {
            const order = { "pending": 1, "approved": 2, "rejected": 3 };
            return (order[a.approval_status] || 4) - (order[b.approval_status] || 4);
          }
          else if (criteria === "status-a") {
            const order = { "approved": 1, "rejected": 2, "pending": 3 };
            return (order[a.approval_status] || 4) - (order[b.approval_status] || 4);
          }
          return 0;
        });
      
        setSortedCollections(sorted);
    };
          
    
    // Handle status change
    const handleApproval = async (collectionId, status) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/collection_status`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+jwt,
            },
            body: JSON.stringify({
              id: collectionId,
              approval_status: status,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert(`Collection ${status} successfully!`);
            // Optionally, refresh the data or update state
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Error updating status:", error);
          alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
            
            window.location.href = "/admin_collections";
        }
    };
      
    
    return (
        <div className="max-w-5xl mx-auto my-24 p-6">
          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-4 mb-4">
              {/* Buttons for bulk approval */}
              {/* <div className="flex space-x-4">
                  <CustomButton 
              			text="Approve collections"
              			bgColor = "bg-green-100"
              			textColor = "text-green-700"
              			onClick={() => alert("Importing!")}
              			width = ""
              			height = "h-10"
              			className="text-sm border border-green-500 hover:bg-green-200"
              		/>
            		
              		<CustomButton 
              			text="Reject collections"
              			bgColor = "bg-red-100 "
              			textColor = "text-red-700 "
              			onClick={() => alert("Importing!")}
              			width = ""
              			height = "h-10"
              			className="text-sm border border-red-500 hover:bg-red-200"
                	/>
              </div> */}
              
              {/* Right Side - Sort Button with Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  Sort By 
                  <FaChevronDown className={`ml-2 transform transition ${sortOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
            
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <button onClick={() => handleSort('title')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Title (A-Z)</button>
                    <button onClick={() => handleSort('publication_date')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Publication Date</button>
                    <button onClick={() => handleSort('submission_date')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Submission Date</button>
                    <button onClick={() => handleSort('status-r')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Status(Rejcted)</button>
                    <button onClick={() => handleSort('status-p')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Status(Pending)</button>
                    <button onClick={() => handleSort('status-a')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Status(Approved)</button>
                  </div>
                )}
              </div>
            </div>
    
          {/* Table */}
          <div className="w-full mt-8 bg-white rounded-lg overflow-hidden">
            <table className="w-full border-collapse border-separate border-spacing-y-8">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-3">Title</th>
                  <th className="p-3">Submitted By</th>
                  <th className="p-3">Submission Date</th>
                  <th className="p-3">Content</th>
                  <th className="p-3">Abstract</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Update Status</th>
                  {/* <th className="p-3">Actions</th> */}
                </tr>
              </thead>
    
              {/* Table Body */}
              <tbody className="space-y-4">
                  {sortedCollections && sortedCollections.length > 0 ? (
                    sortedCollections.map((collection) => (
                      <tr key={collection.id} className="border-b space-y-2 shadow-md shadow-gray-100">
                        <td className="p-3">{collection.title}</td>
                        <td className="p-3">{collection.authors.length > 0 ? (
                          collection.authors.map((author) => (
                            <a key={author.id} href={`mailto:${author.email}`} className="hover:text-blue-600 block">{author.name}</a>
                          ))
                        ) : (
                          <span>No author</span>
                        )}</td>
                        <td className="p-3">{collection.date_of_publication.slice(0, 10)}</td>
                        <td className="p-3"><Link href={`/collections/${collection.id}`} className="text-ashesi-red font-light cursor-pointer">view</Link></td>
                        <td className="p-3"><button onClick={() => alert(collection.abstract || "No Abstract Available")} className="text-ashesi-red font-light cursor-pointer">abstract</button></td>
                        <td className="p-3 text-center space-x-2 relative group">
                          {collection.approval_status === "approved" ? <FaCircle className="text-green-500 inline-block hover:text-green-600" /> :
                          collection.approval_status === "rejected" ? <FaCircle className="text-red-500 inline-block hover:text-red-600" /> :
                          collection.approval_status === "pending" ? <FaCircle className="text-gray-500 inline-block hover:text-gray-600" /> :
                          <FaCircle className="text-gray-400" />}
                          <span className="absolute -top-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                            {collection.approval_status || "Pending"}
                          </span>
                        </td>
                        
                        {/* Checkbox + Action Buttons */}
                        <td className="p-3 space-x-2">
                        { isLoading? (
                            <div className="flex justify-center items-center h-40">
                                <div className="w-10 h-10 border-4 border-ashesi-red border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            ) : (
                                <>
                                { collection.approval_status !== "approved" &&
                                    (
                                    //   {/* Approve Button with Tooltip */}
                                      <div className="group inline-block relative">
                                        <FaCheckCircle 
                                          className="text-green-500 cursor-pointer hover:text-green-700" 
                                          onClick={() => handleApproval(collection.id, "approved")}
                                        />
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                                          Approve
                                        </span>
                                      </div>
                                    )
                                }
                                    
                                { collection.approval_status !== "rejected" &&
                                    (
                                    //   {/* Reject Button with Tooltip */}
                                      <div className="group inline-block relative">
                                        <FaTimesCircle 
                                          className="text-red-500 cursor-pointer hover:text-red-700" 
                                          onClick={() => handleApproval(collection.id, "rejected")}
                                        />
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                                          Reject
                                        </span>
                                      </div>
                                    )
                                }
                                    
                                { collection.approval_status !== "pending" &&
                                    (
                                    //   {/* Pending Button with Tooltip */}
                                      <div className="group inline-block relative">
                                        <FaCircle 
                                          className="text-gray-500 cursor-pointer hover:text-gray-600" 
                                          onClick={() => handleApproval(collection.id, "pending")}
                                        />
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 w-20 rounded-md">
                                          Pending
                                        </span>
                                      </div>
                                    )
                                }   
                                {/* <input
                                  type="checkbox"
                                  checked={selectedCollections.includes(collection.id)}
                                  onChange={() => toggleSelection(collection.id)}
                                  className="cursor-pointer"
                                /> */}
                                </>
                            )  
                        }
                      </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-3 text-center text-gray-500">
                        <div className="flex justify-center items-center h-40">
                            <div className="w-20 h-20 border-4 border-ashesi-red border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  )}
              </tbody>

            </table>
          </div>
        </div>
    )
}