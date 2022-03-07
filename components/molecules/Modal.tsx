import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface MoleculeModalProps {
  id?: string;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  scrollBehavior?: "inside" | "outside";
}

const MoleculeModal: React.FC<MoleculeModalProps> = (props) => {
  const { id, onClose, isOpen, size, title, children, scrollBehavior } = props;

  return (
    <Modal
      id={id}
      onClose={onClose}
      size={size}
      isOpen={isOpen}
      scrollBehavior={scrollBehavior}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MoleculeModal;
