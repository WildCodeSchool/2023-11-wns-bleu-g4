import LightLogo from "/public/svg/lightLogo.svg";
import Image from "next/image";
import { adminNavigation } from "../helpers/adminNavigation";
import { useRouter } from "next/router";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeToggle from "@/shared/components/ThemeToggle";

export default function SideNavbar() {
	const router = useRouter();

	const isActive = (path: string) => {
		return router.pathname === path;
	};

	return (
		<nav className="flex h-full w-56 flex-col justify-between bg-cactus-400 p-3">
			<div className="flex flex-col gap-3">
				<Link href="/">
					<Image src={LightLogo} alt="Logo de l'entreprise" />
				</Link>
				<hr className="bg-light" />
				<div className="flex flex-col gap-3">
					{adminNavigation.map((navItem, index) => (
						<Link
							key={index}
							href={navItem.path}
							className={`flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-light hover:bg-cactus-300 hover:text-dark ${isActive(navItem.path) ? "bg-cactus-300 text-dark" : ""}`}
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
					className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-light hover:bg-cactus-300 hover:text-dark"
				>
					<BackspaceIcon className="h-6 w-6" />
					<span>Back to website</span>
				</Link>
			</div>
		</nav>
	);
}
