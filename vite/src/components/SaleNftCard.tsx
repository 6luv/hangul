import { GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";
import SaleNftModal from "./SaleNftModal";
import { formatEther } from "ethers";

interface SaleNftCardProps {
  tokenId: number;
  saleId: number;
  price: bigint;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId, saleId, price }) => {
  const [nftMetadata, setNftMetadata] =
    useState<IHangulPriceNftMetadata | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [isTokenOwner, setIsTokenOwner] = useState<boolean>(false);
  const { signer, mintContract, saleContract } =
    useOutletContext<OutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getNftMetadata = async () => {
    try {
      const uri = await mintContract?.uri(tokenId);
      const metadataResponse = await axios.get<INftMetadata>(uri);

      setNftMetadata({
        ...metadataResponse.data,
        tokenId,
        amount,
        saleId,
        price,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTokenOwner = async () => {
    try {
      if (!signer || !saleContract || !nftMetadata) return;

      const response = await saleContract?.getOwner(nftMetadata?.saleId);
      setIsTokenOwner(response === signer.address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mintContract || !saleContract || !tokenId) return;

    getNftMetadata();
    setAmount(1);
  }, [mintContract, saleContract, tokenId]);

  useEffect(() => {
    if (!signer || !saleContract || !nftMetadata) return;

    getTokenOwner();
  }, [signer, saleContract, nftMetadata]);

  return (
    <>
      <GridItem display="flex" flexDir="column" w={[40, 48, 48, 48]}>
        <Image
          src={nftMetadata?.image}
          alt={nftMetadata?.name}
          bgColor="white"
          rounded="lg"
          border="1px"
          boxShadow="xl"
          p={4}
          cursor="pointer"
          _hover={{ bgColor: "gray.200", opacity: "150%" }}
          onClick={onOpen}
        />
        <Text mt={4} fontSize={20} fontWeight="bold" textAlign="center">
          #{nftMetadata?.tokenId} {nftMetadata?.name}
        </Text>
        {nftMetadata?.price ? (
          <Text
            fontSize={16}
            fontWeight="bold"
            textAlign="center"
            textColor="blue.500"
          >
            {formatEther(nftMetadata.price)} ETH
          </Text>
        ) : (
          ""
        )}
      </GridItem>
      <SaleNftModal
        isOpen={isOpen}
        onClose={onClose}
        nftMetadata={nftMetadata}
        isTokenOwner={isTokenOwner}
      />
    </>
  );
};

export default SaleNftCard;
