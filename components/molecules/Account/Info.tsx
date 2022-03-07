import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  RiMessage2Line,
  RiUserAddFill,
  RiUserUnfollowFill,
} from "react-icons/ri";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";

import MoleculeModal from "../Modal";
import { OrganismAccountFollowItems } from "components/organisms";

import { IUser } from "types/user.type";
import { useUser } from "hooks";
import { authStore } from "store";
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

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const [type, setType] = useState("following");

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
    queryClient.invalidateQueries(["follows"]);
  };

  const onOpenFollowModal = (type: "follower" | "following") => {
    setType(type);
    onOpen();
  };

  const isFollowed = auth.followingState.includes(data!.id);

  const followModalTitle: any = {
    follower: `Follower of ${data?.name}`,
    following: `Following of ${data?.name}`,
    undefined: "Empty",
  };

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
        <Button variant="link" onClick={() => onOpenFollowModal("follower")}>
          Follower {data?.followedBy?.length}
        </Button>
        <Button variant="link" onClick={() => onOpenFollowModal("following")}>
          Following {data?.following?.length}
        </Button>
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

      <MoleculeModal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        scrollBehavior="inside"
        title={followModalTitle[type]}
      >
        <OrganismAccountFollowItems userId={data!.id} type={type} />
      </MoleculeModal>
    </VStack>
  );
};

export default MoleculeAccountInfo;
