import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { formatEther } from "ethers";
import { FC, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

interface SaleNftModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftMetadata: IHangulPriceNftMetadata | null;
  isTokenOwner: boolean;
}

const SaleNftModal: FC<SaleNftModalProps> = ({
  isOpen,
  onClose,
  nftMetadata,
  isTokenOwner,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { saleContract } = useOutletContext<OutletContext>();

  const onClickPurchaseNft = async () => {
    try {
      setIsLoading(true);
      if (!saleContract || !nftMetadata) return;

      const response = await saleContract.purchaseNft(nftMetadata.saleId, {
        value: nftMetadata.price,
      });
      await response.wait();

      setIsLoading(false);
      onClose();
      navigate("/my");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border="3px solid black">
        <ModalHeader>
          <Flex alignItems="center" w="fit-content">
            <Box mr={2} bgColor="red" p="6px" rounded="full" />
            <Box mr={2} bgColor="orange" p="6px" rounded="full" />
            <Box bgColor="green" p="6px" rounded="full" />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Image
              w={96}
              src={`/images/nfts/${nftMetadata?.tokenId}.png`}
              alt={nftMetadata?.name}
            />
            <Text fontSize={24} fontWeight="bold" textAlign="center" w="80%">
              한글 NFT #{nftMetadata?.tokenId} [{nftMetadata?.name}]
            </Text>
            {nftMetadata?.price ? (
              <Text
                fontSize={20}
                fontWeight="bold"
                textAlign="center"
                textColor="blue.500"
              >
                {formatEther(nftMetadata.price)} ETH
              </Text>
            ) : (
              ""
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            fontSize={20}
            h={12}
            w={20}
            bgColor="white"
            onClick={onClose}
            isDisabled={isLoading}
          >
            취소
          </Button>
          <Button
            textColor="red.500"
            fontSize={20}
            h={12}
            w={20}
            bgColor="white"
            onClick={onClickPurchaseNft}
            isDisabled={isTokenOwner || isLoading}
            isLoading={isLoading}
            loadingText="구매중"
          >
            구매
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleNftModal;
