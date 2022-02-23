import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { MoleculePostHeader, MoleculePostAction } from "components/molecules";
import { IPost } from "types/post.type";

interface OrganismPostItemProps {
  post: IPost;
}

const OrganismPostItem: React.FC<OrganismPostItemProps> = ({ post }) => {
  return (
    <Flex direction="column" gap={4}>
      <MoleculePostHeader author={post.author} createdAt={post.createdAt} />
      <Stack spacing={2}>
        <Heading size="md">{post.title}</Heading>
        <Text>{post.content}</Text>
      </Stack>
      <MoleculePostAction />
    </Flex>
  );
};

export default OrganismPostItem;
