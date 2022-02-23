import { Flex, IconButton, Link, Stack } from "@chakra-ui/react";
import { MdComment, MdShare, MdThumbUp } from "react-icons/md";

interface MoleculePostActionProps {
  comments: [];
  onThumbUp?: () => void;
  onComment?: (postId: number) => void;
}

const MoleculePostAction: React.FC<MoleculePostActionProps> = ({
  comments,
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      color="gray.600"
    >
      <Stack direction="row" spacing={3}>
        <IconButton
          aria-label="Like Post"
          icon={<MdThumbUp />}
          variant="ghost"
        />

        <IconButton
          aria-label="Comment Post"
          icon={<MdComment />}
          variant="ghost"
        />

        <IconButton
          aria-label="Share Post"
          icon={<MdShare />}
          variant="ghost"
        />
      </Stack>
      <Stack direction="row">
        <Link fontSize="sm">{`${comments.length} comments`}</Link>
      </Stack>
    </Flex>
  );
};

export default MoleculePostAction;
