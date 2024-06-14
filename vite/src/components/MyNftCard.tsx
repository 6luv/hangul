import { Box, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";
import MyNftModal from "./SaleModal";

interface MyNftCardProps {
  tokenId: number;
  amount: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId, amount }) => {
  const [hangulNftMetadata, setHangulNftMetadata] =
    useState<IHangulNftMetadata | null>(null);
  const { mintContract } = useOutletContext<OutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !tokenId) return;
      const response = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setHangulNftMetadata({ ...response.data, tokenId, amount });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <>
      <GridItem display="flex" flexDir="column" w={[40, 48, 48, 48]}>
        <Box pos="relative">
          <Text
            pos="absolute"
            top={2}
            right={2}
            fontSize={20}
            fontWeight="semibold"
            rounded="lg"
            px={1}
          >
            x{amount}
          </Text>
          <Image
            src={hangulNftMetadata?.image}
            alt={hangulNftMetadata?.name}
            bgColor="white"
            rounded="lg"
            border="1px"
            boxShadow="xl"
            p={4}
            onClick={onOpen}
            cursor="pointer"
            _hover={{ bgColor: "gray.200", opacity: "150%" }}
          />
          <Text mt={4} fontSize={20} fontWeight="bold" textAlign="center">
            #{hangulNftMetadata?.tokenId} {hangulNftMetadata?.name}
          </Text>
        </Box>
      </GridItem>
      <MyNftModal
        isOpen={isOpen}
        onClose={onClose}
        hangulNftMetadata={hangulNftMetadata}
      />
    </>
  );
};

export default MyNftCard;
