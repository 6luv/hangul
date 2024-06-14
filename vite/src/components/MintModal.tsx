import {
  Button,
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
        <ModalHeader>축하합니다!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={`/images/nfts/${hangulNftMetadata?.tokenId}.png`}
            alt={hangulNftMetadata?.name}
          />
          <Text>{hangulNftMetadata?.name}</Text>
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
