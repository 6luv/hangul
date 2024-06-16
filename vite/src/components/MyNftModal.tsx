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
import { FC, useEffect, useState } from "react";
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
  const [canSell, setCanSell] = useState<boolean>(false);
  const { signer, saleContract } = useOutletContext<OutletContext>();

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

  const getCanSell = async () => {
    try {
      if (!signer || !saleContract || !hangulNftMetadata) return;

      const response = await saleContract.canSell(
        signer.address,
        hangulNftMetadata.tokenId
      );

      setCanSell(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCanSell();
  }, [signer, saleContract, hangulNftMetadata]);

  useEffect(() => console.log(canSell), [canSell]);

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
            {isApprovedForAll && canSell ? (
              <InputGroup w="70%" mt={4}>
                <Input
                  fontSize={24}
                  value={salePrice}
                  textAlign="right"
                  onChange={(e) => setSalePrice(e.target.value)}
                />
                <InputRightAddon>ETH</InputRightAddon>
              </InputGroup>
            ) : (
              <Text
                fontSize={20}
                fontWeight="semibold"
                textColor="blue.500"
                textAlign="center"
                w="80%"
              >
                이미 판매 등록 되었습니다!
              </Text>
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
                isDisabled={isLoading || !canSell}
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
