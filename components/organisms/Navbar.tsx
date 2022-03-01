import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
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
import { useFetchNotification } from "hooks/useNotification";
import MoleculeNotificationMenu from "components/molecules/NotificationMenu";
import { useState } from "react";

const OrganismNavbar: React.FC = () => {
  const { user } = useRecoilValue(authStore.authAtom);
  const resetAuthAtom = useResetRecoilState(authStore.authAtom);
  const [limit, setLimit] = useState(4);

  const displayNavLinkOnMenu = useBreakpointValue({
    base: <></>,
    md: null,
    lg: null,
    xl: null,
  });

  const toast = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useAuth.useAuthLogoutMutation();
  const {
    data,
    isLoading: isLoadingFetchNotification,
    isFetching,
  } = useFetchNotification({
    filter: {
      isRead: false,
      authorId: user?.id,
    },
    orderBy: "createdAt:desc",
    page: 1,
    limit,
  });

  const notificationHasNextPage = data?.paginate.hasNextPage;
  const notificationDataLength = data?.paginate.totalRecords;

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
          <MoleculeNotificationMenu
            isLoading={isLoadingFetchNotification}
            isFetchingLoadMore={isFetching}
            dataLength={notificationDataLength}
            data={data?.data}
            hasNextPage={notificationHasNextPage}
            appendCounter={2}
            onLoadMore={(counter) => {
              setLimit((prev) => prev + counter);
            }}
          />
          <Menu isLazy>
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
