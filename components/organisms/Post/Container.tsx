import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { OrganismPostItem } from "components/organisms";
import { usePost } from "hooks";
import { MdAdd } from "react-icons/md";
import OrganismPostCreateModal from "./CreateModal";

const OrganismPostContainer: React.FC = () => {
  const { data, isLoading } = usePost.useFetchPosts({
    orderBy: "createdAt:desc",
    filter: `published equals "false"`,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex gap={4} direction="column">
      <HStack w="full" justifyContent="space-between">
        <Heading size="lg">Timeline</Heading>
        <Button size="sm" rightIcon={<MdAdd />} onClick={onOpen}>
          Create New Post
        </Button>
      </HStack>

      <Divider />

      {isLoading ? (
        <Box padding="4" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ) : (
        <Stack spacing={10}>
          {data?.data.data.map((post) => (
            <OrganismPostItem key={post.id} post={post} />
          ))}
        </Stack>
      )}

      <OrganismPostCreateModal size="lg" isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default OrganismPostContainer;
