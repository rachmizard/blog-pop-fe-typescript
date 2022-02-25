import {
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { MoleculePostHeader, MoleculePostAction } from "components/molecules";
import { IPost } from "types/post.type";

interface OrganismPostItemProps {
  post: IPost;
}

const OrganismPostItem: React.FC<OrganismPostItemProps> = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex direction="column" gap={4}>
      <MoleculePostHeader
        isCollapsible={isOpen}
        onToggle={onToggle}
        author={post.author}
        createdAt={post.createdAt}
      />
      <Collapse in={isOpen}>
        <Stack spacing={2}>
          <Heading size="md">{post.title}</Heading>
          <Text>{post.content}</Text>
        </Stack>
        <MoleculePostAction
          postId={post.id}
          totalComments={post.postComment.length}
        />
      </Collapse>
    </Flex>
  );
};

export default OrganismPostItem;
