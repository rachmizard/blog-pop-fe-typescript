import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useAuth } from "hooks";
import { authStore } from "store";
import { useRouter } from "next/router";
import { MdNotifications } from "react-icons/md";

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
          toast({
            title: "Logout Success",
            description: "You have been logged out.",
          });

          resetAuthAtom();
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
          <Heading
            size="md"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            PoP Blog!
          </Heading>
        </HStack>

        <HStack spacing={4} alignItems="center">
          <IconButton
            display={displayNavLink}
            icon={<MdNotifications size="20px" />}
            aria-label="Notification Icon Button"
            variant="link"
          />
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
              <MenuItem onClick={() => router.push("/account")}>
                Account
              </MenuItem>
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
