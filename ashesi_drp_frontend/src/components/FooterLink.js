import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const FooterLink = ({ title, link }) => {
	return (
		<Link href={link} className="block">
		  <div className="bg-ashesi-gray w-full mb-2 p-2 hover:cursor-pointer hover:bg-gray-400 flex justify-between items-center">
		    <span className="text-white px-2">{title}</span>
		    <LuArrowRight className="text-white" />
		  </div>
		</Link>
	);
};

export default FooterLink;
