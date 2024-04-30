import SearchBar from "@/shared/components/SearchBar";
import ThemeToggle from "@/shared/components/ThemeToggle";
import ThemedLogo from "@/shared/components/ThemedLogo";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	return (
		<nav className="inline-flex h-16 w-full justify-between border-b border-zinc-300 px-5">
			<ul className="flex w-full items-center justify-start gap-8">
				<div className="flex grow">
					<ThemedLogo />
				</div>

				<SearchBar onSearch={(query) => console.log(query)} placeholder="Search" />
				<li>
					<Menu>
						<MenuButton
							as={Button}
							size="sm"
							leftIcon={<UserCircleIcon width={24} />}
							variant="profilButton"
						>
							Profil
						</MenuButton>
						<MenuList>
							<MenuItem>My Account</MenuItem>
							<MenuItem>Payments </MenuItem>
						</MenuList>
					</Menu>
				</li>
				<ThemeToggle />
			</ul>
		</nav>
	);
}
