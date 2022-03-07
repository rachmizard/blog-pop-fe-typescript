import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { IPost } from "types/post.type";
import { formatDate } from "utils/intl";

interface MoleculePostHeaderProps {
  author: IPost["author"];
  createdAt: IPost["createdAt"];
  isCollapsible?: boolean;
  onToggle?: () => void;
}

const MoleculePostHeader: React.FC<MoleculePostHeaderProps> = ({
  author,
  createdAt,
  isCollapsible,
  onToggle,
}) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <HStack w="full" justifyContent="space-between">
      <Link href={`/users/${author?.id}`} passHref>
        <Stack alignItems="center" direction="row" cursor="pointer">
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
      </Link>
      <Stack>
        <HStack>
          <Text fontSize={{ base: "14px", sm: "16px", md: "14px" }}>
            {formatDate(createdAt)}
          </Text>

          <IconButton
            icon={
              isCollapsible ? (
                <ChevronUpIcon aria-label="Button Icon" />
              ) : (
                <ChevronDownIcon aria-label="Button Icon" />
              )
            }
            aria-label="Button Icon Collapsible"
            fontSize="28"
            variant="ghost"
            onClick={onToggle}
          />
        </HStack>
      </Stack>
    </HStack>
  );
};

export default MoleculePostHeader;
