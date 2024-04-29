import Footer from "@/features/navigation/Footer";
import Navbar from "@/features/navigation/Navbar";
import SubNavbar from "@/features/navigation/SubNavbar";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	pageTitle?: string;
}

export default function Layout({ children, pageTitle }: LayoutProps) {
	return (
		<Layout>
			<Head>
				<title>Next Template - {pageTitle}</title>
				<meta name="description" content="ads website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<Navbar />
				<SubNavbar />
			</header>
			<main>
				{children}
			</main>
			<Footer />
		</Layout>
	);
}
