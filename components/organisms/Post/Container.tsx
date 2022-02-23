import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { OrganismPostItem } from "components/organisms";
import { usePost } from "hooks";
import { MdAdd } from "react-icons/md";

const OrganismPostContainer: React.FC = () => {
  const { data, isLoading, isError, error } = usePost.useFetchPosts();

  return (
    <Flex gap={4} direction="column">
      <HStack w="full" justifyContent="space-between">
        <Heading size="lg">Timeline</Heading>
        <Button size="sm" rightIcon={<MdAdd />}>
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
        data?.data.data.map((post) => (
          <OrganismPostItem key={post.id} post={post} />
        ))
      )}
    </Flex>
  );
};

export default OrganismPostContainer;
