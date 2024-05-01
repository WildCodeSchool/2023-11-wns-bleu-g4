import { useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import DarkLogo from "/public/svg/darkLogo.svg";
import darkMobileLogo from "/public/svg/darkMobileLogo.svg";
import Facebook from "/public/svg/facebook.svg";
import FacebookLight from "/public/svg/facebookLight.svg";
import Instagram from "/public/svg/instagram.svg";
import InstagramLight from "/public/svg/instagramLight.svg";
import LightLogo from "/public/svg/lightLogo.svg";
import lightMobileLogo from "/public/svg/lightMobileLogo.svg";

interface ThemedLogoProps {
	type?: "default" | "facebook" | "instagram";
	alt?: string;
}

export default function ThemedLogo({ type = "default" }: ThemedLogoProps) {
	const [isMobile] = useMediaQuery("(max-width: 767px)");
	const alt = "";

	const logoImage = useColorModeValue(DarkLogo, LightLogo);
	const mobileLogoImage = useColorModeValue(lightMobileLogo, darkMobileLogo);
	const facebook = useColorModeValue(Facebook, FacebookLight);
	const instagram = useColorModeValue(Instagram, InstagramLight);

	let selectedLogo;
	if (type === "default") {
		selectedLogo = isMobile ? mobileLogoImage : logoImage;
	}
	if (type === "facebook") {
		selectedLogo = facebook;
	} else if (type === "instagram") {
		selectedLogo = instagram;
	}

	return <Image src={selectedLogo} alt={alt} />;
}
