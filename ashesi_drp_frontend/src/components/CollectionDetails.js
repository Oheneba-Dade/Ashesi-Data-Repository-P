"use client";

// import "../../globals.css";
import CustomButton from "@/components/CustomButton";
import Link from 'next/link';
import Image from 'next/image';
import Reviews from "@/components/Reviews"; 
import Files from "@/components/Files"; 
import { useState, useEffect } from 'react';
import { AiOutlineDown,  AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Skeleton from "react-loading-skeleton";
import { BASE_URL } from "@/utils/constants";

export default function CollectionsDetails({ initialCollection}) {
    const [collection, setCollections] = useState(initialCollection);
    const [isLoading, setIsLoading] = useState(false);
    const [showAbstract, setShowAbstract] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const[jwt, setJWT] = useState("");
    // const [showReview, setShowReview] = useState(false);
    
    // checking if user is admin
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
      if (localStorage.getItem("user") === "admin") {
        setIsAdmin(true);
      }
      const jwt = localStorage.getItem("jwt");
      setJWT(jwt);
    }, []);
    
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
          
          window.location.href = `/collections/${collectionId}`;
      }
    };
    
    return(
        <div>
            <div>
            
                {/* Title Section */}
                <div>
                    <hr className="my-3" />

                    <h1 className="text-2xl font-bold text-ashesi-red mt-2">
                        {collection.title}
                    </h1>
                    <p className="mt-2 text-blue-800 underline flex gap-4 flex-wrap">
                        {collection.authors.length > 0 ? (
                          collection.authors.map((author) => (
                            <a key={author.id} href={`mailto:${author.email}`} className="hover:text-blue-600">
                              {author.name}
                            </a>
                          ))
                        ) : (
                          <span className="">No author</span>
                        )}
                    </p>

                    <div className="mt-10 flex flex-wrap justify-between text-ashesi-gray">
                        <div>
                            <span>
                                <strong className="pr-2">DOI:</strong> 
                                {collection.doi_link ? 
                                    (
                                        <Link href={`/${collection.doi_link}`} className="cursor-pointer hover:underline hover:text-blue-600 mt-4">
                                            {collection.doi_link}
                                        </Link>
                                    ) : (
                                        <p className="inline">No DOI available</p>
                                    )  
                                }
                            </span>
                        </div>
                        {/* <div>
                            <Link href="/" className="cursor-pointer mt-4 underline text-blue-800 hover:text-blue-600"> request for usage</Link>
                        </div> */}
                        <div>
                            <span><p className=""><strong>Date of publication:</strong> {collection.date_of_publication.slice(0, 10)}</p></span>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-wrap justify-between text-ashesi-gray">
                        <div>
                            <p className=""><strong>keywords: </strong>
                                {collection.keywords?.length > 0
                                    ? collection.keywords.join(", ")
                                    : "No keywords available"}
                            </p>
                        </div>
                    </div>


                    <hr className="mt-5 mb-8" />
                </div>
                
                {/* Abstract Section */}
                <div>
                    <hr className="my-3" />

                    <div className="cursor-pointer" onClick={() => setShowAbstract(!showAbstract)}>
                        <h2 className="text-ashesi-red font-semibold justify-between flex items-center">
                            ABSTRACT
                            <AiOutlineDown
                                className={`mx-2 transform transition-transform duration-500 ease-in-out ${showAbstract ? 'rotate-180' : 'rotate-0'}`} />
                        </h2>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showAbstract ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="mt-4">
                            {collection.abstract}
                        </p>
                    </div>

                    <hr className="mt-5 mb-8" />
                </div>
                
                {/*  INSTANCE REPRESENTATION */}
                <div>
                    <hr className="my-3" />

                    <div className="cursor-pointer" onClick={() => setShowIntro(!showIntro)}>
                        <h2 className="text-ashesi-red font-semibold justify-between flex items-center">
                            INSTANCE REPRESENTATION
                            <AiOutlineDown
                                className={`mx-2 transform transition-transform duration-500 ease-in-out ${showIntro ? 'rotate-180' : 'rotate-0'}`} />
                        </h2>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showIntro ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="mt-4 mb-1"><strong> What do the instances in this dataset represent?</strong></p>
                        <p className="">
                            {collection.instance_representation}
                        </p>

                        {/* <p className="mt-4 mb-1"><strong>  Has Missing Values?</strong></p>
                        { collection.missing_values ? <p className="">Yes</p> : <p className="">No</p>} */}               
                    </div>

                    <hr className="mt-5 mb-8" />
                </div>
                          
                {/*  FILES */}
                <div>
                    <hr className="my-3" />
                    
                    <div className="cursor-pointer" onClick={() => setShowFiles(!showFiles)}>
                      <h2 className="text-ashesi-red font-semibold justify-between flex items-center">
                        FILES
                        <AiOutlineDown 
                          className={`mx-2 transform transition-transform duration-500 ease-in-out ${showFiles ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </h2>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFiles ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="mt-4"></p>
                      
                      <Files collection_id={collection.id}/>
                    </div>
                    
                    <hr className="mt-5 mb-8" />
                </div>
                
                {/*  ADDITIONAL COMMMENT */}
                <div>
                    <hr className="my-3" />

                    <div className="cursor-pointer" onClick={() => setShowInfo(!showInfo)}>
                        <h2 className="text-ashesi-red font-semibold justify-between flex items-center">
                            ADDITIONAL COMMMENT
                            <AiOutlineDown
                                className={`mx-2 transform transition-transform duration-500 ease-in-out ${showInfo ? 'rotate-180' : 'rotate-0'}`} />
                        </h2>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showInfo ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                        { collection.comment ? <p className="mt-4">{collection.comment}</p> : <p className="mt-4">No comment</p>}
                    </div>

                    <hr className="mt-5 mb-8" />
                </div>
                
                {
                    isAdmin && (
                        <div className="my-16">
            				    <div className="mt-2 flex justify-center gap-4">  
                        { isLoading? (
                            <div className="flex justify-center items-center h-40">
                                <div className="w-10 h-10 border-4 border-ashesi-red border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            ) : (
                                <>
                                { collection.approval_status !== "approved" &&
                                    (
                            					<CustomButton 
                            						text="APPROVE"
                            						bgColor = "bg-green-500"
                            						textColor = "text-white"
                            						onClick={() => handleApproval(collection.id, "approved")}
                            						width = ""
                            						height = "h-10"
                            						className="flex items-center justify-center text-sm !font-medium mt-3 py-2 px-4"
                    					       />
                                    )
                                }
                                
                                { collection.approval_status !== "rejected" &&
                                    (
                            					<CustomButton 
                            						text="DISAPPROVE"
                            						bgColor = "bg-ashesi-red"
                            						textColor = "text-white"
                            						onClick={() => handleApproval(collection.id, "rejected")}
                            						width = ""
                            						height = "h-10"
                            						className="flex items-center justify-center text-sm !font-medium mt-3 py-2 px-4"
                            					/>
                                    )
                                }
                                { collection.approval_status !== "pending" &&
                                    (
                            					<CustomButton 
                            						text="PENDING"
                            						bgColor = "bg-gray-500"
                            						textColor = "text-white"
                            						onClick={() => handleApproval(collection.id, "pending")}
                            						width = ""
                            						height = "h-10"
                            						className="flex items-center justify-center text-sm !font-medium border mt-3 py-2 px-4"
                            					/>
                                    )
                                }
                              </>
                            )
                        }
            				</div>
            	        </div>
                    )
                }
                
                {/*  REVIEWS */}
                {/* <div>
                    <hr className="my-3" />
                    
                    <div className="cursor-pointer" onClick={() => setShowReview(!showReview)}>
                      <h2 className="text-ashesi-red font-semibold justify-between flex items-center">
                        REVIEWS
                        <AiOutlineDown 
                          className={`mx-2 transform transition-transform duration-500 ease-in-out ${showReview ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </h2>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showReview ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="mt-4"></p>
        
                        <Reviews rating={4.5} comments={collection.comment} />
                      
                    </div>
                    
                    <hr className="mt-5 mb-8" />
                </div> */}
            </div>
        </div>
    );
}