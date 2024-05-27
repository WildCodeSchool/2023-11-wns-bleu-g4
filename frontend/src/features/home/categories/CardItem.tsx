import { Card, CardFooter, Image, Text } from "@chakra-ui/react";

interface CardItemProps {
  text: string;
  image: string;
}

export default function CardItem({ text, image }: CardItemProps) {
  return (
    <Card width="16em" height="24em" borderRadius="16px" position="relative" overflow="hidden">
      <Image
        objectFit="cover"
        boxSize={"full"}
        src={image}
        alt={text}
        borderRadius="16px"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.3)",
        }}
      />
      <CardFooter
        justify="space-between"
        bg="rgba(0, 0, 0, 0.80)"
        borderRadius="0 0 16px 16px"
        position="absolute"
        bottom="0"
        w="full"
        h="4em"
        alignItems={"center"}
        py={2.5}
        px={4}
      >
        <Text color="white" fontSize="1.5em" fontWeight={"700"}>
          {text}
        </Text>
      </CardFooter>
    </Card>
  );
}
