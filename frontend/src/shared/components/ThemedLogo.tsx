import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import DarkLogo from "/public/svg/darkLogo.svg";
import LightLogo from "/public/svg/lightLogo.svg";

const ThemedLogo = () => {
	const logoImage = useColorModeValue(DarkLogo, LightLogo);

	return <Image src={logoImage} alt="Logo de l'entreprise" />;
};

export default ThemedLogo;
