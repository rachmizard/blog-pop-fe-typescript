import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "hooks";
import {
  RiMessage2Line,
  RiUserAddFill,
  RiUserUnfollowFill,
} from "react-icons/ri";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { authStore } from "store";
import { IUser } from "types/user.type";

interface MoleculeAccountInfoProps {
  data?: IUser;
  authorized: boolean;
}

const MoleculeAccountInfo: React.FC<MoleculeAccountInfoProps> = ({
  data,
  authorized,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useUser.useFollowUserMutation();
  const { mutate: mutateUnfollow, isLoading: isLoadingUnFollow } =
    useUser.useUnFollowUserMutation();
  const [auth, setAuth] = useRecoilState(authStore.authAtom);

  const onFollowHandler = (userId: number) => {
    mutate(
      { userId },
      {
        onSuccess,
      }
    );
  };

  const onUnFollowHandler = (userId: number) => {
    mutateUnfollow(
      {
        userId,
      },
      {
        onSuccess: onSuccessUnFollow,
      }
    );
  };

  const onSuccess = () => {
    setAuth((prev) => {
      return {
        ...prev,
        followingState: [...prev.followingState, data!.id],
      };
    });

    onInvalidateQueries();
  };

  const onSuccessUnFollow = () => {
    setAuth((prev) => {
      return {
        ...prev,
        followingState: [
          ...prev.followingState.filter((id) => id !== data!.id),
        ],
      };
    });

    onInvalidateQueries();
  };

  const onInvalidateQueries = () => {
    queryClient.invalidateQueries(["user-detail", data!.id]);
    queryClient.invalidateQueries(["profile"]);
  };

  const isFollowed = auth.followingState.includes(data!.id);

  return (
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
          <Button
            isLoading={isLoading || isLoadingUnFollow}
            leftIcon={isFollowed ? <RiUserUnfollowFill /> : <RiUserAddFill />}
            onClick={() =>
              isFollowed
                ? onUnFollowHandler(data!.id)
                : onFollowHandler(data!.id)
            }
          >
            {`${
              isFollowed ? `Unfollow ${data!.name}` : `Follow ${data!.name}`
            }`}
          </Button>
          <Button leftIcon={<RiMessage2Line />}>Message</Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
};

export default MoleculeAccountInfo;
