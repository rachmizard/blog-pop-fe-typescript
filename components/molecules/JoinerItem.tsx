import { Box, Flex, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { MdPersonAdd } from "react-icons/md";
import { IUser } from "types/user.type";
import { formatDate } from "utils/intl";

interface IMoleculeJoinerItemProps {
  user: IUser;
}

const MoleculeJoinerItem: React.FC<IMoleculeJoinerItemProps> = ({ user }) => {
  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <Flex gap={4} alignItems="center" flexShrink={0}>
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
      <Box>
        <Tooltip label={`Follow ${user.name}`}>
          <IconButton
            aria-label="Follow Icon Button"
            icon={<MdPersonAdd />}
            rounded="full"
            variant="ghost"
          />
        </Tooltip>
      </Box>
    </HStack>
  );
};

export default MoleculeJoinerItem;
