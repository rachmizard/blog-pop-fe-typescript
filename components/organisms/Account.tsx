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
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { RiMessage2Line, RiUserAddFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import { authStore } from "store";
import { MoleculeTabs } from "components/molecules";
import { usePost } from "hooks";
import { OrganismInfiniteScrollItems, OrganismPostItem } from ".";
import { INITIAL_FETCH_STATE_LIMIT } from "constant";

interface OrganismAccountProps {
  userId?: string;
  isAuthorized?: boolean;
}

const OrganismAccount: React.FC<OrganismAccountProps> = ({ isAuthorized }) => {
  const profile = useRecoilValue(authStore.authAtom);
  const { user } = profile;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [authorized] = useBoolean(isAuthorized);

  const contents = [
    {
      title: "Post",
      component: <Posts authorId={user.id} />,
    },
    {
      title: "Replies",
      component: <Text>Coming soon..</Text>,
    },
  ];

  return (
    <Flex gap={8} direction="column" justifyContent="center">
      <VStack spacing={6}>
        <Heading size="lg">My Account</Heading>
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
            {user.name[0]}
          </Heading>
        </Flex>
        <Heading>{user.name}</Heading>
        <HStack spacing={4}>
          <Text>Follower {user.followedBy?.length}</Text>
          <Text>Following {user.following?.length}</Text>
          <Text>Posts {user.posts?.length}</Text>
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
      <Box>
        <MoleculeTabs
          selectedTabIndex={selectedTabIndex}
          contents={contents}
          onChangeTab={(index) => setSelectedTabIndex(index)}
        />
      </Box>
    </Flex>
  );
};

const Posts: React.FC<{ authorId: number }> = ({ authorId }) => {
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
