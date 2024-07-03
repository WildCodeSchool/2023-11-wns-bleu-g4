import ThemeToggle from "@/shared/components/ThemeToggle";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { adminNavigation } from "../helpers/adminNavigation";
import LightLogo from "/public/svg/lightLogo.svg";

export default function SideNavbar() {
  const { t } = useTranslation("Navbar");
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav className="fixed flex h-full w-60 flex-col justify-between bg-cactus-400 p-3">
      <div className="flex flex-col gap-3">
        <Link href="/">
          <Image src={LightLogo} alt="Logo de l'entreprise" priority />
        </Link>
        <hr className="bg-light" />
        <div className="flex flex-col gap-3">
          {adminNavigation.map((navItem) => (
            <Link
              key={navItem.id}
              href={navItem.path}
              className={`flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-light 
                hover:bg-cactus-300 hover:text-dark ${isActive(navItem.path) && "bg-cactus-300 text-black"}`}
            >
              {navItem.icon}
              {navItem.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ThemeToggle className="text-light" />
        <hr className="w-full bg-light" />
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-light hover:bg-cactus-300 
          hover:text-dark w-full"
        >
          <BackspaceIcon className="h-6 w-6" />
          <span>{t("Back to website")}</span>
        </Link>
      </div>
    </nav>
  );
}
