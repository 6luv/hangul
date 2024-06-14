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
import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hangulNftMetadata: IHangulNftMetadata | undefined;
}

const MintModal: FC<MintModalProps> = ({
  isOpen,
  onClose,
  hangulNftMetadata,
}) => {
  const { setIsPassed } = useOutletContext<OutletContext>();

  const onClickClose = () => {
    onClose();
    setIsPassed(false);
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
              한글 NFT #{hangulNftMetadata?.tokenId} [{hangulNftMetadata?.name}]
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onClickClose}
            textColor="black"
            fontSize={20}
            h={12}
            w={20}
            bgColor="white"
          >
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
