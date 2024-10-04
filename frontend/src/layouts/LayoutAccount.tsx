import Footer from "@/features/navigation/components/Footer";
import Navbar from "@/features/navigation/components/Navbar";
import SubNavbar from "@/features/navigation/components/SubNavbar";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export default function LayoutAccount({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <Head>
        <title>GearGo - {pageTitle}</title>
        <meta
          name="description"
          content="Explore the great outdoors with our wide range of equipments of our rental platform. Find hiking material, bikes, surf boards, and more. Get active and enjoy nature!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/geargo.ico" />
      </Head>
      <header>
        <Navbar />
        <SubNavbar />
      </header>
      <main className="pb-5 xl:pt-5 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
