import { Box, Flex, Text } from "@chakra-ui/react";
import HeroCarousel from "@/features/home/welcome/components/HeroCarousel";

export default function Welcome() {
    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" p={8}>
            <Box flex={1} mr={{ base: 0, md: 8 }}>
                <Text fontSize="6xl" fontWeight="bold" lineHeight="normal"  mb={2} >Welcome on GearGo</Text>
                <Text fontSize="lg">Explore our outdoor equipment rental service
                    for the mountains and the sea. <br/>
                    GearGo offers a wide selection of quality gear.
                    Simply rent what you need and embark on your
                    adventure with ease.</Text>
            </Box>
            <Box w={{ base: "full", md: "65%" }}>
                <HeroCarousel/>
            </Box>
        </Flex>
    );
}