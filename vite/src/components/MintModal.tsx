import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
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
            onClick={onClose}
            textColor="blue.500"
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
