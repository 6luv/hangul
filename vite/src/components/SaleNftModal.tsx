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
  useToast,
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
  const toast = useToast();
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
      getToast("구매 성공!", "구매 되었습니다.", "success");
      navigate("/my");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      getToast("구매 실패", "구매가 정상적으로 처리되지 않았습니다.", "error");
    }
  };

  const getToast = (
    title: string,
    description: string,
    status: "success" | "error" | "warning" | "info" | "loading"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
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
            className="modalButtonStyle"
            onClick={onClose}
            isDisabled={isLoading}
          >
            취소
          </Button>
          <Button
            className="modalButtonStyle"
            textColor="red.500"
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
