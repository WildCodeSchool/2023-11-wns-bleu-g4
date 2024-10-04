import { SidebarProvider, useSidebar } from "@/context/SideNavbarContext";
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
        <link rel="icon" href="/geargo.ico" />
      </Head>
      <div className="flex min-h-[100vh]">
        <SidebarProvider>
          <SideNavbar />
          <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
      </div>
    </>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <main className={`space-y-4 ${isExpanded ? "ml-60" : "ml-[4.5rem]"} p-6 w-full duration-300`}>{children}</main>
  );
}
