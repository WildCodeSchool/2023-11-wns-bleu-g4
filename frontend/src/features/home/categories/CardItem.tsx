import { useColorModeValue } from "@chakra-ui/color-mode";
import { Card, CardFooter, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface CardItemProps {
  text: string;
  image: string;
  id: number;
}

export default function CardItem({ text, image, id }: CardItemProps) {
  const color = useColorModeValue("transparent", "transparent");

  const router = useRouter();
  const navigateToCategory = (categoryId: number) => {
    router.push(`/productsByCategory/${categoryId}`);
  };

  return (
    <Card
      width={{ base: "11.2em", lg: "16em" }}
      height={{ base: "16.8em", lg: "24em" }}
      position="relative"
      overflow="hidden"
      bg={color}
      borderRadius="16px"
      onClick={() => navigateToCategory(id)}
    >
      <Image
        objectFit="cover"
        boxSize="full"
        src={image}
        alt={text}
        borderRadius="16px"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.1)",
        }}
      />
      <CardFooter
        justify="space-between"
        bg="rgba(0, 0, 0, 0.80)"
        borderRadius="0 0 16px 16px"
        position="absolute"
        bottom="0"
        width="100%"
        height="4em"
        alignItems="center"
        py={2.5}
        px={4}
      >
        <Text color="white" fontSize="1.5em" fontWeight="700">
          {text}
        </Text>
      </CardFooter>
    </Card>
  );
}
