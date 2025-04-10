"use client"
import { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCircle, FaChevronDown, FaCheck,  FaClock, FaTimes } from "react-icons/fa";
import CustomButton from "@/components/CustomButton";
import Link from 'next/link';
import { BASE_URL } from "@/utils/constants";
import CollectionsDetails from './CollectionDetails';




export default function AdminCollections() {

    const [jwt, setJWT] = useState("");
    const [selectedCollections, setselectedCollections] = useState([]);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortedCollections, setSortedCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAbstract, setShowAbstract] = useState(false);
    const [abstract, setAbstract] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const downRef = useRef();

    useEffect(() => {
            const jwt = localStorage.getItem("jwt");
            setJWT(jwt);
            const user = localStorage.getItem("user");
            
            if (!jwt || !user || user !== "admin") {
              window.location.href = "/auth"; // Redirect to login if no token
            }
            
            getCollections(jwt);
      }, []);
      
      
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (downRef.current && !downRef.current.contains(event.target)) {
          setSortOpen(false);
          }
        };
      
        if (sortOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [sortOpen]);

  
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
          // console.log(combined);
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
            console.log(`Collection ${status} successfully!`);
            setStatusMessage(`Collection ${status} successfully!`)
          } else {
            console.error(`Error: ${data.message}`);
            setStatusMessage("Update Failed");
          }
        } catch (error) {
          console.error("Error updating status:", error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = `/admin_collections`;
          },2000)
        }
    };
    
    // show Abstact
    const viewAbstract = (text) => {
      setAbstract(text);
      setShowAbstract(true);
    }
    
    
    // Display Abstract via popup
    const Abstract = ({ text=abstract, onClose }) => {
        return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">	  
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-lg font-semibold text-ashesi-red mb-4">Abstract</h2>
          <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: text }}></div>
          
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        </div>
      );
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
              <div className="relative" ref={downRef}>
                <button 
                  className="flex items-center px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  Sort By 
                  <FaChevronDown className={`ml-2 transform transition ${sortOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                
                {/* Abstract view */}
                {showAbstract && <Abstract onClose={() => setShowAbstract(false)} />}

                
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <button onClick={() => handleSort('title')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Title (A-Z)</button>
                    <button onClick={() => handleSort('publication_date')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Publication Date</button>
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
                <tr className="bg-gray-100 text-center align-top text-sm text-gray-600">
                  <th className="p-3">Title</th>
                  <th className="px-6 p-3">Abstract</th>
                  <th className="px-6 p-3">Submitted By</th>
                  <th className="px-6 p-3">Publication Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Update Status</th>
                  {/* <th className="p-3">Actions</th> */}
                </tr>
              </thead>
    
              {/* Table Body */}
              <tbody className="space-y-4">
                  {sortedCollections && sortedCollections.length > 0 ? (
                    sortedCollections.map((collection) => 
                      (
                      <tr key={collection.id} className="border-b space-y-2 shadow-md shadow-gray-100">   
                                 
                        <td className="w-96 text-justify p-4 mr-8 hover:text-ashesi-red hover:cursor-pointer"><Link href={`/collections/${collection.id}`}>{collection.title}</Link></td>
                        <td className="px-6"><button onClick={() => viewAbstract(collection.abstract)} className="text-ashesi-red font-light cursor-pointer">abstract</button></td>
                        <td className="px-6 text-sm">{collection.authors.length > 0 ? (
                          collection.authors.map((author, index) => (
                            <a key={author.id} href={`mailto:${author.email}`} className="hover:text-blue-600 block pb-2"> <b>{index+1}.</b>  {author.name}</a>
                          ))
                        ) : (
                          <span>No author</span>
                        )}</td>
                        <td className="p-4">{collection.date_of_publication.slice(0, 10)}</td>
                        <td className="p-4 text-center space-x-2 relative group">
                          {collection.approval_status === "approved" ?  
                            (<div className="inline-flex flex-col items-center justify-center text-green-600 border-green-300 rounded px-2 py-1 text-xs"> 
                              <FaCheck className="mb-1" />
                              <span>Approved</span>
                            </div>)  :
                            collection.approval_status === "rejected" ?  
                            (<div className="inline-flex flex-col items-center justify-center text-red-600 border-red-300 rounded px-2 py-1 text-xs"> 
                              <FaTimes className="mb-1" />
                              <span>Rejected</span>
                            </div>)  : 
                            collection.approval_status === "pending" ?  
                            (<div className="inline-flex flex-col items-center justify-center text-yellow-600 border-yellow-300 rounded px-2 py-1 text-xs"> 
                              <FaClock className="mb-1" />
                              <span>Pending</span>
                            </div>) : (
                              <>
                              </>
                            )
                          }
                        </td>
                        
                        {/* Action Buttons */}
                        <td className="p-4 space-x-2">
                        
                          {collection.approval_status == "pending" && (
                            <div className="flex flex-col items-center gap-1">
                              {/* Approve Button */}
                              <CustomButton 
                          			text="Approve"
                          			bgColor = "bg-green-200 "
                          			textColor = "text-green-700 "
                          			onClick={() => handleApproval(collection.id, "approved")}
                          			width = "w-full"
                          			height = "h-8"
                          			className="hover:bg-green-200 text-xs px-2 py-1 rounded-md border border-green-300 transition"
                            	/>
                          
                              {/* Disapprove Button */}
                              <CustomButton 
                          			text="Reject"
                          			bgColor = "bg-red-200 "
                          			textColor = "text-red-700 "
                          			onClick={() => handleApproval(collection.id, "rejected")}
                          			width = "w-full"
                          			height = "h-8"
                          			className="hover:bg-red-200 text-xs px-2 py-1 rounded-md border border-red-300 transition"
                            	/>
                            </div>
                          )}

                              
                          { collection.approval_status == "rejected" &&
                              (

                                <div className="flex flex-col items-center gap-1">
                                  {/* Pending Button */}
                                  <CustomButton 
                              			text="Pending"
                              			bgColor = "bg-yellow-200 "
                              			textColor = "text-yellow-700 "
                              			onClick={() => handleApproval(collection.id, "pending")}
                              			width = "w-full"
                              			height = "h-8"
                              			className="hover:bg-yellow-200 text-xs px-2 py-1 rounded-md border border-yellow-300 transition"
                                	/>
                                	
                                	{/* Approve Button */}
                                  <CustomButton 
                              			text="Approve"
                              			bgColor = "bg-green-200 "
                              			textColor = "text-green-700 "
                              			onClick={() => handleApproval(collection.id, "approved")}
                              			width = "w-full"
                              			height = "h-8"
                              			className="hover:bg-green-200 text-xs px-2 py-1 rounded-md border border-green-300 transition"
                                	/>
                                </div>
                              )
                          }
                              
                          { collection.approval_status == "approved" &&
                              (
                              //   {/* Pending Button with Tooltip */}
                                <div className="flex flex-col items-center gap-1">
                                    {/* Pending Button */}
                                    <CustomButton 
                                			text="Pending"
                                			bgColor = "bg-yellow-200 "
                                			textColor = "text-yellow-700 "
                                			onClick={() => handleApproval(collection.id, "pending")}
                                			width = "w-full"
                                			height = "h-8"
                                			className="hover:bg-yellow-200 text-xs px-2 py-1 rounded-md border border-yellow-300 transition"
                                  	/>
                                  	
                                  	{/* Disapprove Button */}
                                    <CustomButton 
                                			text="Reject"
                                			bgColor = "bg-red-200 "
                                			textColor = "text-red-700 "
                                			onClick={() => handleApproval(collection.id, "rejected")}
                                			width = "w-full"
                                			height = "h-8"
                                			className="hover:bg-red-200 text-xs px-2 py-1 rounded-md border border-red-300 transition"
                                  	/>
                                </div>
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
                          <div className="block font-bold text-2xl text-ashesi-red"> Loading Collections .... </div>
                        </td>
                      </tr>
                    )
                  }
                  
                  { isLoading && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">	  
                      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <div className="flex justify-center items-center h-40">
                            <div className="w-20 h-20 border-4 border-ashesi-red border-t-transparent rounded-full animate-spin"></div>
                        </div>
          
                        {statusMessage ? 
                         
                        (
                            <div className="text-green-700 font-bold text-center">{statusMessage}</div>
                             ) : (
                            <div className="text-gray-700 font-bold text-center">Status is Updating ....</div>
                        )
                        }
                      </div>
                    </div>              
                    )}
              </tbody>

            </table>
          </div>
        </div>
    )
}