import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonText,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AtomNotificationIcon } from "components/atoms";
import { useRouter } from "next/router";
import { MdNotifications } from "react-icons/md";

import { NotificationData } from "types/notification.type";

interface MoleculeNotificationMenuProps {
  dataLength?: number;
  data?: NotificationData[];
  isLoading?: boolean;
  isFetchingLoadMore?: boolean;
  hasNextPage?: boolean;
  onLoadMore: (count: number) => void;
  appendCounter: number;
}

const MoleculeNotificationMenu: React.FC<MoleculeNotificationMenuProps> = ({
  dataLength = 0,
  appendCounter = 2,
  data,
  isLoading,
  isFetchingLoadMore,
  hasNextPage,
  onLoadMore,
}) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton>
        <Box position="relative">
          <IconButton
            icon={<MdNotifications size="20px" />}
            aria-label="Notification Icon Button"
            variant="link"
          />
          <Badge
            hidden={dataLength === 0}
            position="absolute"
            top="-8px"
            right="0"
            fontWeight="bold"
            colorScheme="red"
          >
            {dataLength}
          </Badge>
        </Box>
      </MenuButton>
      <MenuList>
        {isLoading ? (
          <MenuItem>
            <SkeletonText w="full" />
          </MenuItem>
        ) : data?.length ? (
          data?.map((item, index) => {
            return (
              <MenuItem
                key={index}
                icon={<AtomNotificationIcon type={item.type} />}
                onClick={() => router.push(item?.link ? item?.link : "/")}
              >
                {item.description}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>
            <Text>No Notifications</Text>
          </MenuItem>
        )}
        {hasNextPage && (
          <MenuItem
            as={Button}
            variant="unstyled"
            closeOnSelect={false}
            onClick={() => onLoadMore(appendCounter)}
            isLoading={isFetchingLoadMore}
            size="sm"
          >
            <Text fontSize="13px" textAlign="center">
              Load More...
            </Text>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MoleculeNotificationMenu;
