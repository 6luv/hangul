import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { formatEther } from "ethers";
import { FC } from "react";

interface NftCardProps {
  name: string;
  image: string;
  tokenId?: number;
  amount?: number;
  price?: bigint;
  onOpen: () => void;
}

const NftCard: FC<NftCardProps> = ({
  name,
  image,
  tokenId,
  amount,
  price,
  onOpen,
}) => {
  return (
    <GridItem display="flex" flexDir="column" w={[40, 48, 48, 48]}>
      <Box pos="relative">
        {amount && (
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
        )}
        <Image
          src={image}
          alt={name}
          bgColor="white"
          rounded="lg"
          border="1px"
          boxShadow="xl"
          p={4}
          cursor="pointer"
          _hover={{ bgColor: "gray.200", opacity: "150%" }}
          onClick={onOpen}
        />
      </Box>
      <Text mt={4} fontSize={20} fontWeight="bold" textAlign="center">
        #{tokenId} {name}
      </Text>
      {price !== undefined && (
        <Text
          fontSize={16}
          fontWeight="bold"
          textAlign="center"
          textColor="blue.500"
        >
          {formatEther(price)} ETH
        </Text>
      )}
    </GridItem>
  );
};

export default NftCard;
