import {
  Button,
  //   Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  //   nftMetadata: INftMetadata | undefined;
}

const MintModal: FC<MintModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>축하합니다!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Image
            src={`/images/nfts/${nftMetadata?.tokenId}.png`}
            alt={nftMetadata?.name}
          />
          <Text>{nftMetadata?.name}</Text> */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
