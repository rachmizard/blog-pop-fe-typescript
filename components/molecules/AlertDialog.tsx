import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface MoleculeAlertDialogProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "lg";
  onCloseDischard: () => void;
}

const MoleculeAlertDialog: React.FC<MoleculeAlertDialogProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onCloseDischard,
}) => {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={onCloseDischard}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MoleculeAlertDialog;
