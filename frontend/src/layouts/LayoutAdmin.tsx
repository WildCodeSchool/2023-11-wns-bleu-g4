import SideNavbar from "@/features/navigation/components/SideNavbar";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	pageTitle?: string;
}

export default function LayoutAdmin({ children, pageTitle }: LayoutProps) {
	return (
		<>
			<Head>
				<title>Next Template - {pageTitle}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex h-[100vh]">
				<SideNavbar />
				<main className="overflow-y-auto p-6">{children}</main>
			</div>
		</>
	);
}
