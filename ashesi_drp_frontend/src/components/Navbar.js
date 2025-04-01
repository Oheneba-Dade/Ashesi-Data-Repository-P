"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { FaChevronDown } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
	const pathname = usePathname();
	const [logIn, setLogIn] = useState(null);
	const [userEmail, setUserEmail] = useState("");
	const [user, setUser] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setUserEmail(localStorage.getItem("email"))
		setLogIn(localStorage.getItem("jwt"));
		setUser(localStorage.getItem("user"));		
	}, []);

	// const payload = JSON.parse(atob(logIn.split(".")[1]));
	// console.log(payload);
	
	// Function to determine active styles
	const getLinkClass = (href) =>
		pathname === href
			? "font-normal border-b-2 border-ashesi-red"
			: "font-light hover:font-normal";
	
	const handleLogout = () => {
		localStorage.removeItem("jwt"); // Clear JWT from local storage
		localStorage.removeItem("email"); 
		localStorage.removeItem("user"); 
		setLogIn(null); // Clear login state
		setUserEmail(""); //clear user email
		setMenuOpen(false); // Close menu after logging out
		setUser("");
		
		window.location.href = "/";

	  };
	
	const router = useRouter();
	
	return (
		<>
			{/* Navbar */}
			<div className="relative flex items-center gap-4 px-10 py-4 bg-white shadow-lg z-20">
				{/* Left Section */}
				<Link
					href="/"
					className="hidden md:flex w-1/4 gap-6 items-center"
				>
					<Image
						src="/images/logo.webp"
						alt="Ashesi Logo"
						width={45}
						height={45}
						className="object-contain"
					/>
					<div className="font-montserrat text-xl text-black">
						Data Repository
					</div>
				</Link>

				{/* Middle Section */}
				<div className="hidden md:flex w-1/2 items-center justify-center">
					<SearchBar />
				</div>

				{/* Right Section */}
				<div className="hidden md:flex w-1/4 gap-4 items-center justify-end">
					<Link href="/" className={getLinkClass("/")}>
						Home
					</Link>
					<Link href="/about" className={getLinkClass("/about")}>
						About
					</Link>
					{/* Avatar & Dropdown */}
					{logIn ? (
				        <div className="relative">
				          <button
				            onClick={() => setMenuOpen(!menuOpen)}
				            className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
				          >
				            {/* Avatar (Replace with actual user image if available) */}
				            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">

				               {userEmail[0].toUpperCase()}

				            </div>
				
				            {/* Rotating Arrow */}
				            <FaChevronDown
				              className={`text-gray-600 transition-transform ${
				                menuOpen ? "rotate-180" : "rotate-0"
				              }`}
				            />
				          </button>
				
				          {/* Dropdown Menu */}
				          {menuOpen && user && (
				            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">

				              <p className="text-gray-700 text-sm px-2">{userEmail? userEmail.split("@")[0] : "No Email"}</p>
				              <p className="text-gray-700 text-sm px-2">{user || "No User"}</p>

				              <button
							      onClick={() => router.push("/admin_collections")}
							      className="w-full text-left px-2 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded-md"
							    >
							      Admin Page
							  </button>
				              <button
				                onClick={handleLogout}
				                className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
				              >
				                Logout
				              </button>
				            </div>
				          )}
				        </div>
				      ) : (
				        <Link href="/auth" className={getLinkClass("/auth")}>
				          Login
				        </Link>
				    )}
					{/* <Link href="/auth" className={getLinkClass("/auth")} onClick={(e) => {
					  if (logIn) {
						    e.preventDefault(); // Prevent navigation
						    localStorage.removeItem("jwt"); // clear jwt in local storage
						    setLogIn(null); // Clear login data
						  }
						}}>
					  {logIn ? <div>Logout</div> : <div>Login</div>}
					</Link> */}
				</div>

				{/* Floating Div Below Navbar */}
				<div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md p-4 text-center rounded-lg z-10 flex justify-around font-light">
					<Link href="/collections" className="hover:font-normal">
						Collections
					</Link>
					<Link href="/add_collection" className="hover:font-normal">
						Contribute Collection
					</Link>

					<Link href="/data_policy" className="hover:font-normal">
						Data Policy
					</Link>
				</div>
			</div>
		</>
	);
}
