import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CardItem from "./CardItem";
import cards from "./cards.json";

export default function CardItemCarousel() {
  const colorDots = useColorModeValue("red", "green");
  const colorActiveDots = useColorModeValue("blue", "yellow");
  const slidesToShow = useBreakpointValue({ base: 2, md: 2, lg: 4, xl: 5 });
  const arrowDisplay = useBreakpointValue({ base: "none", md: "block" });
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <>
      <Global
        styles={css`
          .slick-dots li button:before {
            color: ${colorDots};
          }
          .slick-dots li.slick-active button:before {
            color: ${colorActiveDots};
          }
        `}
      />
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index}>
            <CardItem text={card.text} image={card.image} />
          </div>
        ))}
      </Slider>
    </>
  );
}
