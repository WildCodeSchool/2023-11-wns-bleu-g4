import { Card, CardFooter, Flex, Image, Text } from "@chakra-ui/react";

const cards = [
  {
    text: "Ski",
    image: "https://www.blizzard-tecnica.com/storage/ProductCategory/bac6d6b77f4d9f059ddaa1a4b1f74bfc.jpg",
  },
  // {
  //   text: "Hiking",
  //   image:
  //     "https://www.shape.com/thmb/oAnU3qGLLeS9CDt7gceJRTo0-po=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/endurance-4d8dfc8fd70741f5a8ee810d816f52d0.jpg",
  // },
  // {
  //   text: "Surf",
  //   image:
  //     "https://img.redbull.com/images/c_crop,x_1457,y_0,h_3456,w_2592/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2022/11/23/ugejjjmmgpr91xifbxds/ian-walsh-surf-tube",
  // },
  // {
  //   text: "Kayak",
  //   image:
  //     "https://res.cloudinary.com/outtrip/image/fetch/f_auto,q_auto,w_2048/https://cms.outtrip.fr/assets/leMag/peut-on-faire-du-kayak-librement-1.jpg",
  // },
];

export default function CardList() {
  return (
    <Flex gap={8}>
      {cards.map((card, index) => (
        <CardItem key={index} text={card.text} image={card.image} />
      ))}
    </Flex>
  );
}

interface CardItemProps {
  text: string;
  image: string;
}

function CardItem({ text, image }: CardItemProps) {
  return (
    <Card width={[44, 44, 60, 72]} height={[64, 64, 80, 96]} borderRadius="16px" position="relative" overflow="hidden">
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
        h={{ base: "56px", lg: "80px" }}
        alignItems={"center"}
        py={2.5}
        px={4}
      >
        <Text color="white" fontSize={{ base: "24px", lg: "5xl" }} fontWeight={"700"}>
          {text}
        </Text>
      </CardFooter>
    </Card>
  );
}
