"use client";

import Image from "next/image";
import FooterLink from "./FooterLink";
import {
	SiFacebook,
	SiX,
	SiInstagram,
	SiLinkedin,
	SiYoutube,
} from "react-icons/si";
import { FaUniversity } from "react-icons/fa";
import SocialIcon from "@/components/SocialIcon";
import CustomButton from "@/components/CustomButton";

export default function Footer() {
	const icons = [
		{ component: FaUniversity, link: "https://ashesi.edu.gh/" },
		{ component: SiFacebook, link: "https://www.facebook.com/Ashesi/" },
		{
			component: SiInstagram,
			link: "https://www.instagram.com/ashesi/?hl=en",
		},
		{
			component: SiLinkedin,
			link: "https://gh.linkedin.com/school/ashesiuniversity/",
		},
		{ component: SiX, link: "https://twitter.com/Ashesi/" },
		{ component: SiYoutube, link: "https://www.youtube.com/@ashesiuni" },
	];

	return (
		<>
			<div className="bg-ashesi-red flex justify-center items-center gap-4 py-6">
				<p className="text-white font-semibold">
					Venture into a wide spectrum of datasets submitted by the
					Ashesi Community
				</p>
				{/*<CustomButton bgColor="bg-white" textColor="text-ashesi-red" text="Login Now!" href="/" />*/}
			</div>
			<div className="flex justify-center py-10">
				<div className="w-[300px]">
					<Image
						src="/images/logo.webp"
						alt="Ashesi Logo"
						width={200}
						height={200}
						className="object-contain mx-auto"
					/>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-8 mb-20 px-4 lg:px-32">
				<div className="flex gap-5 justify-center w-[300px]">
					{icons.map(({ component, link }, index) => (
						<SocialIcon key={link} icon={component} link={link} />
					))}
				</div>
				<div className="text-center w-[300px]">
					<p>
						1 University Avenue,
						<br /> Berekuso, Ghana
					</p>
					<br />
					<p>
						<strong>Phone:</strong>&nbsp;&nbsp;+233 302 610 330
					</p>
					<p>
						<strong>Email:</strong>&nbsp;&nbsp;info@ashesi.edu.gh
					</p>
				</div>
				<div className="text-center w-[300px]">
					<FooterLink title="Home" link="/" />
					<FooterLink title="About The Project" link="/about" />
					<FooterLink title="View Collections" link="/collections" />
					<FooterLink title="Policy" link="/policy" />
				</div>
			</div>
			<div className="bg-ashesi-gray flex justify-center items-center py-6">
				<p className="text-white text-sm">
					Copyright {new Date().getFullYear()} ©
					&nbsp;&nbsp;|&nbsp;&nbsp;Ashesi University
				</p>
			</div>
		</>
	);
}
