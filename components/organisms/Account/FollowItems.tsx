import {
  Box,
  Flex,
  HStack,
  Input,
  Skeleton,
  SkeletonCircle,
  useToast,
} from "@chakra-ui/react";
import { MoleculeAccountFollowItem } from "components/molecules";
import { useDebounce, useUser } from "hooks";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { authStore } from "store";
import { OrganismInfiniteScrollItems } from "..";

interface OrganismAccountFollowItemsProps {
  type: string | "following" | "follower";
  userId: number;
}

const OrganismAccountFollowItems: React.FC<OrganismAccountFollowItemsProps> = ({
  type,
  userId,
}) => {
  let filter = {};

  if (type === "following") {
    Object.assign(filter, { followingId: Number(userId) });
  }

  if (type === "follower") {
    Object.assign(filter, { followerId: Number(userId) });
  }

  const toast = useToast();

  const [search, setSearch] = useState<string>("");
  const [limitData, setLimitData] = useState<number>(10);
  const setAuthStore = useSetRecoilState(authStore.authAtom);

  const searchDebounce = useDebounce(search, 100);

  const { mutate, isLoading: isLoadingFollow } =
    useUser.useFollowUserMutation();
  const { mutate: mutateUnfollow, isLoading: isLoadingUnFollow } =
    useUser.useUnFollowUserMutation();

  const queryClient = useQueryClient();

  const { data, isLoading } = useUser.useFetchUserFollowsQuery(
    [type, userId, searchDebounce, limitData],
    {
      filter: {
        ...filter,
        [type === "follower" ? "following" : "follower"]: searchDebounce
          ? {
              OR: [
                {
                  name: {
                    contains: searchDebounce,
                    mode: "insensitive",
                  },
                },
                { email: { contains: searchDebounce, mode: "insensitive" } },
              ],
            }
          : {},
      },
      page: 1,
      limit: limitData,
    }
  );

  useEffect(() => {
    if (searchDebounce) {
      setSearch(searchDebounce);
    }
  }, [searchDebounce]);

  const onFollowHandler = (userId: number, type: "follow" | "unfollow") => {
    if (type === "follow") {
      mutate(
        {
          userId,
        },
        {
          onSuccess: () => {
            setAuthStore((prevState) => {
              return {
                ...prevState,
                followingState: [...prevState.followingState, userId],
              };
            });

            onInvalidateQueries();
          },
          onError: (error: Error) => {
            toast({
              title: "Something went wrong",
              description: error.message,
              position: "bottom",
              status: "warning",
            });
          },
        }
      );
    }

    if (type === "unfollow") {
      mutateUnfollow(
        {
          userId,
        },
        {
          onSuccess: () => {
            setAuthStore((prevState) => {
              return {
                ...prevState,
                followingState: [
                  ...prevState.followingState.filter((id) => id !== userId),
                ],
              };
            });

            onInvalidateQueries();
          },
        }
      );
    }
  };

  const onInvalidateQueries = () => {
    queryClient.invalidateQueries(["follows"]);
    queryClient.invalidateQueries(["profile"]);
    queryClient.invalidateQueries(["user-detail", userId]);
  };

  const onSearchFilter = (value: string) => {
    setSearch(value);
  };

  const hasNextPage = !isLoading && data!.paginate?.hasNextPage;

  return (
    <Flex direction="column" w="full" gap={3}>
      <Box>
        <Input
          variant="flushed"
          size="sm"
          placeholder="Search User..."
          onChange={(event) => onSearchFilter(event.target.value)}
        />
      </Box>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <OrganismAccountFollowItemsSkeleton key={index} />
        ))
      ) : (
        <Box
          id="scrollableTargetFlex"
          style={{
            height: 400,
            overflowY: "scroll",
            padding: 4,
          }}
        >
          <OrganismInfiniteScrollItems
            dataLength={data!.data.length}
            hasMore={hasNextPage}
            onNext={() => {
              setLimitData((prev) => prev + 3);
            }}
            scrollableTarget="scrollableTargetFlex"
          >
            {data?.data.map((user, index) => {
              const extractUser =
                user[type === "following" ? "follower" : "following"];

              return (
                <MoleculeAccountFollowItem
                  key={index}
                  user={extractUser}
                  onFollow={onFollowHandler}
                  isLoadingAllButton={isLoadingFollow || isLoadingUnFollow}
                />
              );
            })}
          </OrganismInfiniteScrollItems>
        </Box>
      )}
    </Flex>
  );
};

const OrganismAccountFollowItemsSkeleton: React.FC<{}> = () => {
  return (
    <Flex w="full" justifyContent="space-between" gap={4}>
      <HStack w="full" spacing={4}>
        <SkeletonCircle />
        <Skeleton h="8" w="full" />
      </HStack>
      <Skeleton w="10" />
    </Flex>
  );
};

export default OrganismAccountFollowItems;
