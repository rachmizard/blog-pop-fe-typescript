import { RiUserAddLine, RiUserUnfollowFill } from "react-icons/ri";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";

import { authStore } from "store";
import { IUser } from "types/user.type";
import { formatDate } from "utils/intl";
import { useUser } from "hooks";

interface IMoleculeJoinerItemProps {
  user: IUser;
}

const MoleculeJoinerItem: React.FC<IMoleculeJoinerItemProps> = ({ user }) => {
  const { mutate, isLoading } = useUser.useFollowUserMutation();
  const { mutate: mutateUnfollow, isLoading: isLoadingUnfollow } =
    useUser.useUnFollowUserMutation();

  const [auth, setAuth] = useRecoilState(authStore.authAtom);

  const isFollowed = auth.followingState.includes(user.id);

  const hideFollowButton = user.id === auth.user.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const onClickFollow = (userId: number) => {
    mutate(
      { userId },
      {
        onSuccess: () => {
          setAuth((prev) => {
            return {
              ...prev,
              followingState: [...prev.followingState, userId],
            };
          });

          queryClient.invalidateQueries(["profile"]);

          toast({
            title: "Followed",
            description: `You are now following ${user.name}`,
            status: "success",
            variant: "top-accent",
            position: "top",
          });
        },
        onError: (error) => {
          toast({
            title: "Something went wrong",
            description: error.message,
            status: "error",
          });
        },
      }
    );
  };

  const onClickUnFollow = (userId: number) => {
    mutateUnfollow(
      { userId },
      {
        onSuccess: () => {
          setAuth((prev) => {
            return {
              ...prev,
              followingState: [
                ...prev.followingState.filter((id) => id !== userId),
              ],
            };
          });

          queryClient.invalidateQueries(["new-users"]);
          queryClient.invalidateQueries(["profile"]);
        },
        onError: (error) => {
          toast({
            title: "Something went wrong",
            description: error.message,
            status: "error",
          });
        },
      }
    );
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Flex gap={4} alignItems="center" w="full" flexShrink={0}>
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="gray.400"
          rounded="full"
          h="8"
          w="8"
          flexShrink={0}
        >
          <Text textAlign="center" color="white" textTransform="uppercase">
            {user.name[0]}
          </Text>
        </Flex>
        <Box alignItems="flex-start">
          <Text fontSize={{ base: "10px", sm: "20px", md: "16px" }}>
            {user.name}
          </Text>
          <Text
            fontSize={{ base: "10px", sm: "16px", md: "11px" }}
            color="gray.600"
          >
            {formatDate(user.createdAt)}
          </Text>
        </Box>
      </Flex>
      <Box hidden={hideFollowButton}>
        <Tooltip label={`${isFollowed ? "Followed" : `Follow ${user.name}`}`}>
          {isFollowed ? (
            <IconButton
              aria-label="Follow Icon Button"
              icon={<RiUserUnfollowFill />}
              rounded="full"
              variant="ghost"
              isLoading={isLoadingUnfollow}
              onClick={() => onClickUnFollow(user.id)}
            />
          ) : (
            <IconButton
              aria-label="Follow Icon Button"
              icon={<RiUserAddLine />}
              rounded="full"
              variant="ghost"
              isLoading={isLoading}
              onClick={() => onClickFollow(user.id)}
            />
          )}
        </Tooltip>
      </Box>
    </HStack>
  );
};

export default MoleculeJoinerItem;
