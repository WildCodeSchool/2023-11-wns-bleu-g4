import ThemedLogo from "@/shared/components/ThemedLogo";
import { Card, useColorModeValue } from "@chakra-ui/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation("Footer");
  
  type Footer = {
    name: string;
    link: string;
  };

  const isDark = useColorModeValue(false, true);

  const aboutUs: Footer[] = [
    {
      name: t("The company"),
      link: "#",
    },
    {
      name: t("Recruitement"),
      link: "#",
    },
    {
      name: t("Accessibility : partially compliant"),
      link: "#",
    },
    {
      name: t("Sitemap"),
      link: "#",
    },
    {
      name: t("Legal notice"),
      link: "#",
    },
    {
      name: t("Personal data"),
      link: "#",
    },
  ];

  return (
    <footer className="px-0 lg:px-24">
      <Card variant="footerCard" direction={{ base: "column", md: "row" }}>
        {/**About Us */}
        <ul className="w-full space-y-2 p-3 md:w-1/3">
          <li className="font-normal text-slate-500">{t("About us")}</li>

          {aboutUs.map((el: any, index: number) => {
            return (
              <li key={index} className="group w-fit hover:cursor-pointer">
                <Link href={el.link}>{el.name}</Link>
                <div
                  className={`h-1 w-2 border-b ${isDark ? "border-white" : "border-black"} duration-500 ease-in-out group-hover:w-full`}
                ></div>
              </li>
            );
          })}
        </ul>

        {/**Contact */}
        <ul className="w-full space-y-2 p-3 md:w-1/3">
          <li className="text-slate-500">{t("Let's connect")}</li>
          <li className="group w-fit hover:cursor-pointer">
            {t("Connect us")}
            <div
              className={`h-1 w-2 border-b ${isDark ? "border-white" : "border-black"} duration-500 ease-in-out group-hover:w-full`}
            ></div>
          </li>
          <li className="group w-fit hover:cursor-pointer">
            <Link href="https://www.facebook.com/?locale=fr_FR" target="_blank" className="flex items-center gap-2">
              {t("Facebook")}
              <ThemedLogo type="facebook" alt="Facebook Logo" />
              <ArrowTopRightOnSquareIcon width={18} height={18} />
            </Link>
            <div
              className={`h-1 w-2 border-b ${isDark ? "border-white" : "border-black"} duration-500 ease-in-out group-hover:w-full`}
            ></div>
          </li>
          <li className="group w-fit hover:cursor-pointer">
            <Link href="https://www.instagram.com/" target="_blank" className="flex items-center gap-2">
              {t("Instagram")}
              <ThemedLogo type="instagram" alt="Instagram Logo" />
              <ArrowTopRightOnSquareIcon width={18} height={18} />
            </Link>
            <div
              className={`h-1 w-2 border-b ${isDark ? "border-white" : "border-black"} duration-500 ease-in-out group-hover:w-full`}
            ></div>
          </li>
        </ul>

        {/**Logo */}
        <div className="flex w-full flex-col items-center py-3 md:w-1/3 md:items-start md:justify-between md:border-l-2 md:border-l-slate-300 md:px-12">
          <Link href="/" className="flex w-full justify-center md:justify-start">
            <ThemedLogo />
          </Link>
          <p className="justify-center text-xs font-thin md:justify-start">{t("Copyright © 2024 All Rights Reserved.")}</p>
        </div>
      </Card>
    </footer>
  );
}
