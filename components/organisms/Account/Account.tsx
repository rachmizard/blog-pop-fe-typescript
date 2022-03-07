import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiMessage2Line, RiUserAddFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import { authStore } from "store";
import { MoleculeTabs } from "components/molecules";
import { usePost, useUser } from "hooks";
import { OrganismInfiniteScrollItems, OrganismPostItem } from "..";
import { INITIAL_FETCH_STATE_LIMIT } from "constant";
import OrganismAccountSkeleton from "./Skeleton";

interface OrganismAccountProps {
  userId: string | number;
}

const OrganismAccount: React.FC<OrganismAccountProps> = ({ userId }) => {
  const profile = useRecoilValue(authStore.authAtom);
  const authorized = profile.user.id === userId;

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { data, isLoading } = useUser.useFetchDetailUserQuery(userId);

  const contents = [
    {
      title: "Post",
      component: <Posts authorId={authorized ? profile.user.id : data?.id} />,
    },
    {
      title: "Replies",
      component: <Text>Coming soon..</Text>,
    },
  ];

  return (
    <>
      <Flex gap={8} direction="column" justifyContent="center">
        <OrganismAccountSkeleton show={isLoading}>
          <VStack spacing={6}>
            <Heading size="lg">Account</Heading>
            <Flex
              alignItems="center"
              justifyContent="center"
              bg="gray.400"
              w="20"
              h="20"
              rounded="full"
              boxShadow="md"
            >
              <Heading size="lg" color="ActiveBorder">
                {data?.name[0].toUpperCase()}
              </Heading>
            </Flex>

            <Heading>{data?.name}</Heading>
            <HStack spacing={4}>
              <Text>Follower {data?.followedBy?.length}</Text>
              <Text>Following {data?.following?.length}</Text>
              <Text>Posts {data?.posts?.length}</Text>
            </HStack>
            <HStack hidden={authorized}>
              <ButtonGroup
                spacing={10}
                size="sm"
                variant="link"
                colorScheme="facebook"
                rounded="none"
              >
                <Button leftIcon={<RiUserAddFill />}>Follow</Button>
                <Button leftIcon={<RiMessage2Line />}>Message</Button>
              </ButtonGroup>
            </HStack>
          </VStack>
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
