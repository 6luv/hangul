import { useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";
import MyNftModal from "./MyNftModal";
import NftCard from "./NftCard";

interface MyNftCardProps {
  tokenId: number;
  amount: number;
  isApprovedForAll: boolean;
}

const MyNftCard: FC<MyNftCardProps> = ({
  tokenId,
  amount,
  isApprovedForAll,
}) => {
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
      {hangulNftMetadata && (
        <NftCard
          name={hangulNftMetadata?.name}
          image={hangulNftMetadata?.image}
          tokenId={hangulNftMetadata?.tokenId}
          amount={hangulNftMetadata?.amount}
          onOpen={onOpen}
        />
      )}
      <MyNftModal
        isOpen={isOpen}
        onClose={onClose}
        hangulNftMetadata={hangulNftMetadata}
        isApprovedForAll={isApprovedForAll}
      />
    </>
  );
};

export default MyNftCard;
