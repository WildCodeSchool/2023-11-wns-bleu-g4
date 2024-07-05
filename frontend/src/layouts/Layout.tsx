import Footer from "@/features/navigation/components/Footer";
import Navbar from "@/features/navigation/components/Navbar";
import SubNavbar from "@/features/navigation/components/SubNavbar";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <>
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
      <main className="pb-5 lg:pt-5 flex flex-col lg:gap-8 ">{children}</main>
      <Footer />
    </>
  );
}
