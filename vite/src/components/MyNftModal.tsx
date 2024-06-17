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
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import { parseEther } from "ethers";

interface MyNftModalProps {
  isOpen: boolean;
  onClose: () => void;
  hangulNftMetadata: IHangulNftMetadata | null;
  isApprovedForAll: boolean;
}

const MyNftModal: FC<MyNftModalProps> = ({
  isOpen,
  onClose,
  hangulNftMetadata,
  isApprovedForAll,
}) => {
  const [salePrice, setSalePrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSell, setCanSell] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { signer, saleContract } = useOutletContext<OutletContext>();

  const onClickSetForSaleNft = async () => {
    try {
      setIsLoading(true);
      if (!salePrice || isNaN(Number(salePrice))) return;

      const response = await saleContract?.setForSaleNft(
        hangulNftMetadata?.tokenId,
        parseEther(salePrice)
      );
      await response.wait();

      setIsLoading(false);
      onClose();
      getToast("등록 성공!", "판매 등록되었습니다.", "success");
      navigate("/sale");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      getToast("등록 실패", "판매 등록에 실패했습니다.", "error");
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

  useEffect(() => {
    getCanSell();
  }, [signer, saleContract, hangulNftMetadata]);

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
              한글 NFT #{hangulNftMetadata?.tokenId} [{hangulNftMetadata?.name}]
            </Text>
            {isApprovedForAll &&
              (canSell ? (
                <InputGroup w="70%" mt={4}>
                  <Input
                    fontSize={24}
                    value={salePrice}
                    textAlign="right"
                    isDisabled={isLoading}
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
              ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            className="modalButtonStyle"
            onClick={onClose}
            textColor={isApprovedForAll ? "red.500" : "blue.500"}
            isDisabled={isLoading}
          >
            {isApprovedForAll ? "취소" : "확인"}
          </Button>
          {isApprovedForAll && (
            <Button
              className="modalButtonStyle"
              textColor="blue.500"
              onClick={onClickSetForSaleNft}
              isDisabled={isLoading || !canSell || !salePrice}
              isLoading={isLoading}
              loadingText="등록중"
            >
              등록
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyNftModal;
