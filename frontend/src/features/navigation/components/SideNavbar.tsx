import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { adminNavigation } from "../helpers/adminNavigation";
import LightLogo from "/public/svg/lightLogo.svg";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSidebar } from "@/context/SideNavbarContext";
import { Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

export default function SideNavbar() {
  const { t } = useTranslation("Navbar");
  const router = useRouter();
  const { isExpanded, toggleSidebar } = useSidebar();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav
      className={`fixed flex h-full ${isExpanded ? "w-60" : "w-[4.5rem]"} 
    flex-col justify-between bg-cactus-400 p-3 transition-width duration-300`}
    >
      <div className="flex flex-col gap-3">
        <div className={`flex items-center ${!isExpanded && "justify-center"}`}>
          {isExpanded && (
            <span className="overflow-hidden">
              <Image src={LightLogo} alt="Logo de l'entreprise" className="max-h-12 min-w-fit" priority />
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="flex cursor-pointer items-center gap-4 rounded-full m-2 p-2 text-dark bg-cactus-300"
          >
            <ChevronRightIcon className={`h-4 w-4 ${isExpanded && "rotate-180"}`} />
          </button>
        </div>
        <hr className="bg-light" />
        <div className="flex flex-col gap-3">
          {adminNavigation.map(navItem => (
            <Fragment key={navItem.id}>
              <Tooltip
                label={navItem.title}
                placement="right"
                hasArrow
                className={`${isExpanded && "hidden"}`}
                borderRadius={4}
              >
                <Link
                  href={navItem.path}
                  className={`flex cursor-pointer items-center gap-3 rounded p-3 text-light 
                  hover:bg-cactus-300 hover:text-dark ${
                    isActive(navItem.path) && "bg-cactus-300 text-dark"
                  } ${isExpanded && "overflow-hidden"}`}
                >
                  {navItem.icon}
                  {isExpanded && <span>{navItem.title}</span>}
                </Link>
              </Tooltip>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <hr className="w-full bg-light" />
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-3 rounded p-3 text-light hover:bg-cactus-300 overflow-hidden
          hover:text-dark w-full whitespace-nowrap"
        >
          <BackspaceIcon className="h-6 w-6 min-w-fit" />
          {isExpanded && <span>{t("Back to website")}</span>}
        </Link>
      </div>
    </nav>
  );
}
