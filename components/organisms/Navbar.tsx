import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
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
  useBreakpoint,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useAuth } from "hooks";
import { authStore } from "store";
import { useRouter } from "next/router";

const OrganismNavbar: React.FC = () => {
  const { user } = useRecoilValue(authStore.authAtom);
  const resetAuthAtom = useResetRecoilState(authStore.authAtom);

  const displayNavLink = useBreakpointValue({ base: "none", md: "block" });
  const displayNavLinkOnMenu = useBreakpointValue({
    base: (
      <>
        <MenuItem>Latest Posts</MenuItem>
        <MenuItem>Old Posts</MenuItem>
      </>
    ),
    md: null,
    lg: null,
    xl: null,
  });

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
          resetAuthAtom();
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
    <Flex
      h="16"
      alignItems="center"
      shadow="sm"
      w="full"
      position="sticky"
      top={0}
      bgColor="white"
      zIndex={1}
      paddingInline={{ base: "4", md: "20" }}
    >
      <Stack justifyContent="space-between" w="full" direction="row">
        <HStack>
          <Heading size="md">PoP Blog!</Heading>
        </HStack>

        <HStack spacing={16}>
          <HStack spacing={8} display={displayNavLink}>
            <Link>Latest Posts</Link>
            <Link>Old Posts</Link>
          </HStack>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              isLoading={isLoading}
            >
              {user?.name}
            </MenuButton>
            <MenuList>
              {displayNavLinkOnMenu}
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
