import Footer from '@/features/navigation/components/Footer';
import Navbar from '@/features/navigation/components/Navbar';
import SubNavbar from '@/features/navigation/components/SubNavbar';
import Head from 'next/head';
import { ReactNode } from 'react';

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
      <main className="py-8 max-md:mt-10 md:px-[6.25rem] md:py-[3.125rem]">{children}</main>
      <Footer />
    </>
  );
}
