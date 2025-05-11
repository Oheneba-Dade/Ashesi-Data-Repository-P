"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
	const pathname = usePathname();
	const [logIn, setLogIn] = useState(null);
	const [userEmail, setUserEmail] = useState("");
	const [user, setUser] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dropdownRef = useRef();
	const mobileMenuRef = useRef();

	useEffect(() => {
		setUserEmail(localStorage.getItem("email"));
		setLogIn(localStorage.getItem("jwt"));
		setUser(localStorage.getItem("user"));
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setMenuOpen(false);
			}
			if (
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target)
			) {
				setMobileMenuOpen(false);
			}
		};

		if (menuOpen || mobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen, mobileMenuOpen]);

	// Function to determine active styles
	const getLinkClass = (href) =>
		pathname === href
			? "font-normal border-b-2 border-ashesi-red"
			: "font-light hover:font-normal";

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("email");
		localStorage.removeItem("user");
		setLogIn(null);
		setUserEmail("");
		setMenuOpen(false);
		setMobileMenuOpen(false);
		setUser("");

		window.location.href = "/";
	};

	const router = useRouter();

	return (
		<>
			{/* Navbar */}
			<div className="relative flex items-center justify-between px-4 md:px-10 py-4 bg-white shadow-lg z-20">
				{/* Left Section */}
				<Link href="/" className="flex items-center gap-2 md:gap-6">
					<Image
						src="/images/logo.webp"
						alt="Ashesi Logo"
						width={45}
						height={45}
						className="object-contain"
					/>
					<div className="font-montserrat text-lg md:text-xl text-black">
						Data Repository
					</div>
				</Link>

				{/* Middle Section - Hidden on mobile */}
				<div className="hidden md:flex w-1/2 items-center justify-center">
					<SearchBar />
				</div>

				{/* Right Section - Desktop */}
				<div className="hidden md:flex w-1/4 gap-4 items-center justify-end">
					<Link href="/" className={getLinkClass("/")}>
						Home
					</Link>
					<Link href="/about" className={getLinkClass("/about")}>
						About
					</Link>
					{/* Avatar & Dropdown */}
					{logIn ? (
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
							>
								<div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
									{userEmail[0].toUpperCase()}
								</div>
								<FaChevronDown
									className={`text-gray-600 transition-transform ${
										menuOpen ? "rotate-180" : "rotate-0"
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{menuOpen && user && (
								<div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
									<p className="text-gray-700 text-sm px-2">
										{userEmail
											? userEmail.split("@")[0]
											: "No Email"}
									</p>
									<p className="text-gray-700 text-sm px-2">
										{user || "No User"}
									</p>
									{user == "admin" && (
										<button
											onClick={() =>
												router.push(
													"/admin_collections"
												)
											}
											className="w-full text-left px-2 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded-md"
										>
											Admin Page
										</button>
									)}
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
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-gray-600 hover:text-gray-800"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? (
						<FaTimes className="w-6 h-6" />
					) : (
						<FaBars className="w-6 h-6" />
					)}
				</button>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div
						ref={mobileMenuRef}
						className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-30"
					>
						<div className="px-4 py-2">
							<SearchBar />
						</div>
						<div className="flex flex-col px-4 py-2">
							<Link
								href="/"
								className={`py-2 ${getLinkClass("/")}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								href="/about"
								className={`py-2 ${getLinkClass("/about")}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
							<Link
								href="/collections"
								className="py-2 hover:font-normal"
								onClick={() => setMobileMenuOpen(false)}
							>
								Collections
							</Link>
							<Link
								href="/add_collection"
								className="py-2 hover:font-normal"
								onClick={() => setMobileMenuOpen(false)}
							>
								Contribute Collection
							</Link>
							<Link
								href="/policy"
								className="py-2 hover:font-normal"
								onClick={() => setMobileMenuOpen(false)}
							>
								Policy
							</Link>
							{logIn ? (
								<>
									<div className="py-2 text-gray-700">
										{userEmail
											? userEmail.split("@")[0]
											: "No Email"}
									</div>
									{user == "admin" && (
										<button
											onClick={() => {
												router.push(
													"/admin_collections"
												);
												setMobileMenuOpen(false);
											}}
											className="py-2 text-left text-blue-600"
										>
											Admin Page
										</button>
									)}
									<button
										onClick={() => {
											handleLogout();
											setMobileMenuOpen(false);
										}}
										className="py-2 text-left text-red-600"
									>
										Logout
									</button>
								</>
							) : (
								<Link
									href="/auth"
									className={`py-2 ${getLinkClass("/auth")}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
							)}
						</div>
					</div>
				)}

				{/* Floating Div Below Navbar - Hidden on mobile */}
				<div className="hidden md:block absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-1/2 bg-white shadow-md p-4 text-center rounded-lg z-10 flex flex-wrap md:flex-nowrap justify-center md:justify-around font-light gap-4 md:gap-8">
					<Link
						href="/collections"
						className="hover:font-normal px-4 py-2"
					>
						Collections
					</Link>
					<Link
						href="/add_collection"
						className="hover:font-normal px-4 py-2"
					>
						Contribute Collection
					</Link>
					<Link
						href="/policy"
						className="hover:font-normal px-4 py-2"
					>
						Policy
					</Link>
				</div>
			</div>
		</>
	);
}
