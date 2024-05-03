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
        <title>GearGo - {pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[100vh]">
        <SideNavbar />
        <main className="ml-56 p-6 w-full">{children}</main>
      </div>
    </>
  );
}
