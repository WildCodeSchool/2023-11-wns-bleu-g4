import { Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<SunIcon width={32} />
			<Switch
				size="md"
				isChecked={colorMode === "dark"}
				onChange={toggleColorMode}
			/>
			<MoonIcon width={26} />
		</>
	);
}
