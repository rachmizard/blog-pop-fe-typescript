import {
  Box,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

import { MoleculePostHeaderTimeline } from "components/molecules";
import { OrganismPostItem } from "components/organisms";

import { usePost } from "hooks";

const OrganismPostContainer: React.FC = () => {
  const { data, isLoading } = usePost.useFetchPosts({
    orderBy: "createdAt:desc",
    filter: {
      published: false,
    },
    page: 1,
    limit: 2,
  });

  return (
    <Flex gap={4} direction="column">
      <MoleculePostHeaderTimeline />

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
    </Flex>
  );
};

export default OrganismPostContainer;
