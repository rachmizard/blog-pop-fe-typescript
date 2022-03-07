import {
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { AtomPictureLabel } from "components/atoms";

import { authStore } from "store";
import { IUser } from "types/user.type";

const MoleculeAccountFollowItem: React.FC<MoleculeAccountFollowItemProps> = ({
  user,
  onFollow,
  isLoadingAllButton,
}) => {
  const { followingState, user: userAuth } = useRecoilValue(authStore.authAtom);

  const isFollowed = followingState.includes(user.id);

  const onFollowHandler = () => {
    onFollow(user.id, isFollowed ? "unfollow" : "follow");
  };

  return (
    <Flex w="full" justifyContent="space-between" rounded="sm" p="3">
      <HStack>
        <AtomPictureLabel text="Mizard" />
        <VStack spacing={0} alignItems="flex-start">
          <Heading size="sm">{user.name}</Heading>
          <Text fontSize="11">{user.email}</Text>
        </VStack>
      </HStack>
      <Flex>
        {userAuth.id !== user.id && (
          <Tooltip
            label={
              isFollowed
                ? "Unfollow ".concat(user.name)
                : "Follow ".concat(user.name)
            }
          >
            <Button
              isDisabled={isLoadingAllButton}
              variant="outline"
              size="xs"
              onClick={onFollowHandler}
              colorScheme={isFollowed ? "orange" : "telegram"}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
};

interface MoleculeAccountFollowItemProps {
  user: Pick<IUser, "id" | "email" | "name">;
  onFollow: (userId: number, type: "follow" | "unfollow") => void;
  isLoadingAllButton?: boolean;
}

export default MoleculeAccountFollowItem;
