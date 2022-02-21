import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useAuth } from "hooks";
import { authStore } from "store";
import { useRouter } from "next/router";

const OrganismNavbar: React.FC = () => {
  const { user } = useRecoilValue(authStore.authAtom);
  const resetAuthAtom = useResetRecoilState(authStore.authAtom);

  const toast = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useAuth.useAuthLogoutMutation();

  const onLogout = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          resetAuthAtom();
          toast({
            title: "Logout Success",
            description: "You have been logged out.",
          });
          router.replace("/login");
        },
        onError: (error: any) => {
          toast({
            title: "Logout Failed",
            status: "warning",
            description: error?.message,
          });
        },
      }
    );
  };

  return (
    <Flex h="16" alignItems="center" shadow="sm" w="full">
      <Stack
        justifyContent="space-between"
        w="full"
        direction="row"
        paddingInline="20"
      >
        <HStack>
          <Heading size="md">PoP Blog!</Heading>
        </HStack>

        <HStack spacing={16}>
          <Link>Latest Posts</Link>
          <Link>Posts</Link>
          <Menu>
            <MenuButton
              as={Button}
              color="white"
              bgColor="blackAlpha.700"
              rightIcon={<ChevronDownIcon />}
              isLoading={isLoading}
            >
              {user?.name}
            </MenuButton>
            <MenuList>
              <MenuItem>Account</MenuItem>
              <MenuItem>My Posts</MenuItem>
              <MenuItem
                isDisabled={isLoading}
                onClick={onLogout}
                icon={<ChevronLeftIcon />}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default OrganismNavbar;
