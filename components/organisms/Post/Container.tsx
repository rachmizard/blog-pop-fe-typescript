import {
  Box,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

import { MoleculePostHeaderTimeline } from "components/molecules";
import {
  OrganismInfiniteScrollItems,
  OrganismPostItem,
} from "components/organisms";
import { INITIAL_FETCH_STATE_LIMIT } from "constant";

import { usePost } from "hooks";
import { useState } from "react";

const OrganismPostContainer: React.FC = () => {
  const [fetchMore, setFetchMore] = useState(INITIAL_FETCH_STATE_LIMIT);
  const { data, isLoading } = usePost.useFetchPosts({
    orderBy: "createdAt:desc",
    filter: {
      published: {
        equals: true,
      },
    },
    page: 1,
    limit: fetchMore,
  });

  const hasNextPage = data?.data && data.paginate.hasNextPage;
  const dataLength = data?.data ? data.data.length : 0;
  const hasMore = !!hasNextPage;

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
        <OrganismInfiniteScrollItems
          dataLength={dataLength}
          hasMore={hasMore}
          onNext={() => setFetchMore((prev) => prev + 3)}
          endMessageText="You are at the end of the list &#128064;"
        >
          <Stack spacing={10} my="4">
            {data?.data.map((post) => (
              <OrganismPostItem key={post.id} post={post} />
            ))}
          </Stack>
        </OrganismInfiniteScrollItems>
      )}
    </Flex>
  );
};

export default OrganismPostContainer;
