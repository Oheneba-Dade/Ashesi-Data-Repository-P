
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scroll from "@/components/Scroll";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "600", "700"],
	variable: "--font-montserrat",
});

export default function RootLayout({ children }) {

	return (
		<html lang="en">
		<head>
			<link rel="icon" href="/images/favicons/Ashesi_University_Logo_BW_favicon-150x150.webp" sizes="any" />
		</head>
		<Scroll />
		<body className={`${montserrat.className} flex flex-col `}>
		<Navbar />
		<main >{children}</main>
		<Footer />
		</body>
		</html>
	);
}
