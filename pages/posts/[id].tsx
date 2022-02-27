import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";

import { AtomInputTextArea, Form } from "components/atoms";
import { MoleculeInputGroupText } from "components/molecules";
import {
  OrganismPostCommentItem,
  OrganismPostItem,
} from "components/organisms";
import { usePost } from "hooks";
import { AuthorizedLayout } from "layouts";
import { PostCommentSchemaValidation } from "validations/post.validation";
import { ICreatePostCommentVariables } from "types/post.type";
import { useQueryClient } from "react-query";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface DetailPostProps {
  postId: any;
}

const DetailPost: NextPage<DetailPostProps> = ({ postId }) => {
  const { data, isLoading } = usePost.useFetchDetailPost(postId);
  const queryClient = useQueryClient();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const { useCreatePostCommentMutation } = usePost;
  const { mutate, isLoading: isLoadingPostComment } =
    useCreatePostCommentMutation(postId);

  const onSubmitPostComment = (
    values: ICreatePostCommentVariables,
    onResetCallback: () => void
  ) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["post", postId]);

        onResetCallback();
      },
    });
  };

  const renderPostItem = () => {
    return isLoading ? (
      <Box>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    ) : (
      <OrganismPostItem post={data!.data} />
    );
  };

  const renderPostComments = () => {
    return (
      <Box h="28em" overflowY="scroll" p="8" boxShadow="md" rounded="8">
        {isLoading ? (
          <Stack spacing={8}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Box key={index}>
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            ))}
          </Stack>
        ) : data?.data.postComment && data?.data.postComment.length > 0 ? (
          data?.data.postComment.map((comment) => (
            <OrganismPostCommentItem
              key={`comment-key-${comment.id}`}
              comment={comment}
            />
          ))
        ) : (
          <Text color="gray.400" textAlign="center">
            No comments. Be the first comment in this post.
          </Text>
        )}
      </Box>
    );
  };

  return (
    <AuthorizedLayout
      title={isLoading ? `Fetching...` : `Detail Post ${data?.data.title}`}
    >
      <Container maxW="container.lg" my="10">
        <Form
          defaultValues={{
            content: "",
          }}
          validationSchema={PostCommentSchemaValidation}
          onSubmit={onSubmitPostComment}
        >
          {() => {
            return (
              <Stack spacing={5}>
                <Stack spacing={10}>
                  {renderPostItem()}
                  <Stack pl="10" spacing={6}>
                    <HStack justifyContent="space-between">
                      <Heading size="md">Comments</Heading>

                      <IconButton
                        icon={
                          isOpen ? (
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

                    <Divider />
                    <Collapse in={isOpen}>{renderPostComments()}</Collapse>
                  </Stack>
                </Stack>
                <Stack>
                  <MoleculeInputGroupText
                    label="Your Comment"
                    name="content"
                    component={AtomInputTextArea}
                  />
                  <Button isLoading={isLoadingPostComment} type="submit">
                    Comment
                  </Button>
                </Stack>
              </Stack>
            );
          }}
        </Form>
      </Container>
    </AuthorizedLayout>
  );
};

DetailPost.getInitialProps = ({ query }) => {
  return {
    postId: query.id,
  };
};

export default DetailPost;
