import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";

const categories = {
	Sea: ["Option 1", "Option 2", "Option 3"],
	Mountain: ["Option 1", "Option 2", "Option 3"],
	Outdoor: ["Option A", "Option B", "Option C"],
};

export default function SubNavbar() {
	return (
		<Flex
			display={{ base: "none", md: "flex" }}
			className="mb-5 h-8 w-full justify-between px-5"
		>
			<Stack direction="row" spacing={4}>
				{Object.entries(categories).map(([category, items], index) => (
					<Menu key={index}>
						<MenuButton
							as={Button}
							size="sm"
							variant="subNavButton"
							borderRadius="md"
							borderWidth="1px"
							rightIcon={<ChevronDownIcon width={24} />}
							py={4} // Ajoute un padding vertical de 2 unités
						>
							{category}
						</MenuButton>
						<MenuList bg="white">
							{items.map((item, i) => (
								<MenuItem bg="white" color="black" key={i}>
									{item}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				))}
			</Stack>
			<Button
				size="sm"
				as={Button}
				borderRadius="md"
				borderWidth="1px"
				variant="cartButton"
				leftIcon={<ShoppingCartIcon width={18} />}
			>
				My basket
			</Button>
		</Flex>
	);
}
