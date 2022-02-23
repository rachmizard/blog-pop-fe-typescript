import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { IPost } from "types/post.type";
import { formatDate } from "utils/intl";

interface MoleculePostHeaderProps {
  author: IPost["author"];
  createdAt: IPost["createdAt"];
}

const MoleculePostHeader: React.FC<MoleculePostHeaderProps> = ({
  author,
  createdAt,
}) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <HStack w="full" justifyContent="space-between">
      <Stack alignItems="center" direction="row">
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor={`#${randomColor}`}
          rounded="full"
          h="8"
          w="8"
        >
          <Text textAlign="center" color="white">
            {author?.name[0]}
          </Text>
        </Flex>
        <Heading size="sm">{author?.name}</Heading>
      </Stack>
      <Stack>
        <Text fontSize={{ base: "14px", sm: "16px", md: "14px" }}>
          {formatDate(createdAt)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default MoleculePostHeader;
