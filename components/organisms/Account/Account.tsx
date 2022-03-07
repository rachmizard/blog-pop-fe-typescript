import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useMemo, useState } from "react";

import { authStore } from "store";
import { MoleculeAccountInfo, MoleculeTabs } from "components/molecules";
import { usePost, useUser } from "hooks";
import { OrganismInfiniteScrollItems, OrganismPostItem } from "..";
import { INITIAL_FETCH_STATE_LIMIT } from "constant";
import OrganismAccountSkeleton from "./Skeleton";

interface OrganismAccountProps {
  userId: number;
}

const OrganismAccount: React.FC<OrganismAccountProps> = ({ userId }) => {
  const profile = useRecoilValue(authStore.authAtom);
  const authorized = profile.user.id === userId;

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { data, isLoading } = useUser.useFetchDetailUserQuery(userId);

  const contents = useMemo(() => {
    return [
      {
        title: "Post",
        component: <Posts authorId={authorized ? profile.user.id : data?.id} />,
      },
      {
        title: "Replies",
        component: <Text>Coming soon..</Text>,
      },
    ];
  }, [profile.user.id, data?.id]);

  return (
    <>
      <Flex gap={8} direction="column" justifyContent="center">
        <OrganismAccountSkeleton show={isLoading}>
          <MoleculeAccountInfo data={data} authorized={authorized} />
        </OrganismAccountSkeleton>
        <Box>
          <MoleculeTabs
            selectedTabIndex={selectedTabIndex}
            contents={contents}
            onChangeTab={(index) => setSelectedTabIndex(index)}
          />
        </Box>
      </Flex>
    </>
  );
};

const Posts: React.FC<{ authorId: number | any }> = ({ authorId }) => {
  const [fetchMore, setFetchMore] = useState(INITIAL_FETCH_STATE_LIMIT);

  const { data, isLoading } = usePost.useFetchPosts({
    filter: {
      authorId: {
        equals: authorId,
      },
    },
    page: 1,
    limit: fetchMore,
    orderBy: "createdAt:desc",
  });

  if (isLoading)
    return (
      <Box padding="4" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    );

  const dataLength = data?.data ? data.data.length : 0;
  const hasMore = !!data?.paginate.hasNextPage;

  return (
    <OrganismInfiniteScrollItems
      dataLength={dataLength}
      hasMore={hasMore}
      onNext={() => setFetchMore((prev) => prev + 2)}
    >
      <Stack spacing={10}>
        {data?.data.map((post) => (
          <OrganismPostItem key={post.id} post={post} />
        ))}
      </Stack>
    </OrganismInfiniteScrollItems>
  );
};

export default OrganismAccount;
