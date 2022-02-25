import { Button, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import { OrganismPostCreateModal } from "components/organisms";
import { MdAdd } from "react-icons/md";

interface MoleculePostHeaderTimelineProps {}

const MoleculePostHeaderTimeline: React.FC<
  MoleculePostHeaderTimelineProps
> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <OrganismPostCreateModal size="lg" isOpen={isOpen} onClose={onClose} />

      <HStack w="full" justifyContent="space-between">
        <Heading size="lg">Timeline</Heading>
        <Button size="sm" rightIcon={<MdAdd />} onClick={onOpen}>
          Create New Post
        </Button>
      </HStack>
    </>
  );
};

export default MoleculePostHeaderTimeline;
