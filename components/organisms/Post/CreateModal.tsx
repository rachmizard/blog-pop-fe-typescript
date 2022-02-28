import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import { AtomInputText, AtomInputTextArea, Form } from "components/atoms";

import {
  MoleculeAlertDialog,
  MoleculeInputGroupSwitch,
  MoleculeInputGroupText,
} from "components/molecules";

import { AtomInputSwitch } from "components/atoms";
import { ICreatePostVariables } from "types/post.type";

import { usePost } from "hooks";
import { PostValidation } from "validations";

interface OrganismPostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "lg";
}

const OrganismPostCreateModal: React.FC<OrganismPostCreateModalProps> = ({
  onClose,
  isOpen,
  size = "lg",
}) => {
  const {
    isOpen: isOpenAlertDialog,
    onClose: onCloseAlertDialog,
    onOpen: onOpenAlertDialog,
  } = useDisclosure();

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate, isLoading } = usePost.useCreatePostMutation();

  const onSubmit = (values: ICreatePostVariables) => {
    mutate(values, {
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description: error.message,
          position: "top",
          status: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);

        onClose();
        toast({
          title: "Cooool!",
          description: "Your post has been created",
          position: "top",
          status: "success",
        });
      },
    });
  };

  const closeAlertDialog = () => {
    onCloseAlertDialog();
  };

  const closeAlertDischard = () => {
    onCloseAlertDialog();
    onClose();
  };

  return (
    <>
      <Modal
        onClose={onClose}
        size={size}
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <Form
          defaultValues={{
            title: "",
            content: "",
            published: false,
          }}
          onSubmit={onSubmit}
          validationSchema={PostValidation.PostSchemaValidation}
        >
          {({ formState }) => {
            const { isDirty } = formState;

            const onCloseModal = () => {
              if (isDirty) {
                onOpenAlertDialog();
              } else {
                onClose();
              }
            };

            return (
              <>
                <ModalOverlay
                  bg="blackAlpha.300"
                  backdropFilter="blur(10px) hue-rotate(90deg)"
                />
                <ModalContent>
                  <ModalHeader>Create New Post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={4}>
                      <MoleculeInputGroupText
                        label="Title"
                        name="title"
                        component={AtomInputText}
                        helperText="The title of the post"
                      />
                      <MoleculeInputGroupText
                        label="Content"
                        name="content"
                        component={AtomInputTextArea}
                      />

                      <MoleculeInputGroupSwitch
                        name="published"
                        label="Published"
                        component={AtomInputSwitch}
                      />
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Stack direction="row">
                      <Button
                        isLoading={isLoading}
                        size="sm"
                        colorScheme="telegram"
                        type="submit"
                      >
                        Create new Post!
                      </Button>
                      <Button size="sm" onClick={onCloseModal}>
                        Close
                      </Button>
                    </Stack>
                  </ModalFooter>
                </ModalContent>
              </>
            );
          }}
        </Form>
      </Modal>

      <MoleculeAlertDialog
        title="Dischard all changes?"
        description="Are you sure you want to close the modal?"
        isOpen={isOpenAlertDialog}
        onClose={closeAlertDialog}
        onCloseDischard={closeAlertDischard}
      />
    </>
  );
};

export default OrganismPostCreateModal;
