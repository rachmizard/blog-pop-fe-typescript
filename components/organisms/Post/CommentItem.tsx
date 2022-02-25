import {
  Box,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { MoleculePostHeader, MoleculePostAction } from "components/molecules";
import { IPostComment } from "types/post.type";

interface OrganismPostCommentItemProps {
  comment: IPostComment;
}

const OrganismPostCommentItem: React.FC<OrganismPostCommentItemProps> = ({
  comment,
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box p="4" boxShadow="md" rounded="md">
      <Flex direction="column" gap={4}>
        <MoleculePostHeader
          author={comment.author}
          createdAt={comment.createdAt}
          onToggle={onToggle}
          isCollapsible={isOpen}
        />
        <Collapse in={isOpen}>
          <Stack spacing={2}>
            <Heading size="md">{comment.title}</Heading>
            <Text>{comment.content}</Text>
          </Stack>
          <MoleculePostAction
            postId={comment.id}
            totalComments={comment.postComments.length}
          />
        </Collapse>
      </Flex>
    </Box>
  );
};

export default OrganismPostCommentItem;
