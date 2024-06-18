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
    slidesToShow: 6,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    centerPadding: "200px",
    arrows: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200, // 1200px 이하일 때 적용할 설정
        settings: {
          slidesToShow: 5,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 992, // 992px 이하일 때 적용할 설정
        settings: {
          slidesToShow: 5,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 768, // 768px 이하일 때 적용할 설정
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
        },
      },
    ],
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
                boxShadow="lg"
                p={2}
                w={[12, 28, 28, 28, 36]}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

export default SlideNfts;
