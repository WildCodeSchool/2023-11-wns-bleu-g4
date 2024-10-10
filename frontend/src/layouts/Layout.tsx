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
        <title>GearGo - {pageTitle}</title>
        <meta
          name="description"
          content="Explore the great outdoors with our wide range of equipments of our rental platform.
          Find hiking material, bikes, surf boards, and more. Get active and enjoy nature!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
        <SubNavbar />
      </header>
      <main className="xl:pb-5 xl:pt-5 flex flex-col lg:gap-8 flex-grow overflow-y-auto min-h-[calc(100vh-75px)] xl:min-h-[calc(100vh-64px-32px)]">
        <div className="flex-grow">{children}</div>
        <Footer />
      </main>
    </>
  );
}
