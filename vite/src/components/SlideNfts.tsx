import { Box, Flex, Image } from "@chakra-ui/react";
import { FC, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideNfts: FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const imageNumbers = Array.from({ length: 38 }, (_, index) => index + 1);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    centerPadding: "200px",
    arrows: false,
  };

  return (
    <Flex flexDir="column" w="100%" mx="auto" justifyContent="center">
      <Box>
        <Slider ref={sliderRef} {...settings}>
          {imageNumbers.map((i) => (
            <Box key={i} p={4}>
              <Image
                key={i}
                src={`/images/nfts/${i}.png`}
                alt={`${i}.png`}
                border="2px"
                rounded="lg"
                p={2}
                w={40}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

export default SlideNfts;
