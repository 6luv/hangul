import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import { parseEther } from "ethers";

interface MyNftModalProps {
  isOpen: boolean;
  onClose: () => void;
  hangulNftMetadata: IHangulNftMetadata | null;
  isApprovedForAll: boolean;
  tokenId: number;
}

const MyNftModal: FC<MyNftModalProps> = ({
  isOpen,
  onClose,
  hangulNftMetadata,
  isApprovedForAll,
  tokenId,
}) => {
  const [salePrice, setSalePrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { saleContract } = useOutletContext<OutletContext>();

  const onClickSetForSaleNft = async () => {
    try {
      setIsLoading(true);
      if (!salePrice || isNaN(Number(salePrice))) return;

      const response = await saleContract?.setForSaleNft(
        tokenId,
        parseEther(salePrice)
      );
      await response.wait();

      setIsLoading(false);
      onClose();
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
              src={`/images/nfts/${hangulNftMetadata?.tokenId}.png`}
              alt={hangulNftMetadata?.name}
            />
            <Text fontSize={24} fontWeight="bold" textAlign="center" w="80%">
              한글 NFT #{tokenId} [{hangulNftMetadata?.name}]
            </Text>
            {isApprovedForAll && (
              <InputGroup w="70%" mt={4}>
                <Input
                  fontSize={24}
                  value={salePrice}
                  textAlign="right"
                  onChange={(e) => setSalePrice(e.target.value)}
                />
                <InputRightAddon>ETH</InputRightAddon>
              </InputGroup>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {isApprovedForAll ? (
            <>
              <Button
                onClick={onClose}
                textColor="red.500"
                fontSize={20}
                h={12}
                w={20}
                bgColor="white"
                isDisabled={isLoading}
              >
                취소
              </Button>
              <Button
                textColor="blue.500"
                fontSize={20}
                h={12}
                w={20}
                bgColor="white"
                onClick={onClickSetForSaleNft}
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText="등록중"
              >
                등록
              </Button>
            </>
          ) : (
            <Button
              textColor="blue.500"
              fontSize={20}
              h={12}
              w={20}
              bgColor="white"
              onClick={onClose}
            >
              확인
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyNftModal;
