import { useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";
import SaleNftModal from "./SaleNftModal";
import NftCard from "./NftCard";

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
      {nftMetadata && (
        <NftCard
          name={nftMetadata.name}
          image={nftMetadata.image}
          tokenId={nftMetadata.tokenId}
          price={nftMetadata.price}
          onOpen={onOpen}
        />
      )}
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
