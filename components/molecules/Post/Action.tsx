import { Flex, IconButton, Link, Stack } from "@chakra-ui/react";
import {
  MdComment,
  MdOutlineThumbUp,
  MdShare,
  MdThumbUp,
} from "react-icons/md";
import { useRecoilState } from "recoil";
import Router from "next/router";

import { postAtom } from "store/post/post.store";
import { IPost } from "types/post.type";

interface MoleculePostActionProps {
  postId: number;
  totalComments: number;
  onThumbUp?: () => void;
  onComment?: (postId: number) => void;
}

const MoleculePostAction: React.FC<MoleculePostActionProps> = ({
  postId,
  totalComments,
}) => {
  const [post, setPost] = useRecoilState(postAtom);

  const onThumbUp = () => {
    setPost((currVal) => {
      const currentLikes = currVal.likes;

      if (currentLikes.includes(postId)) {
        return {
          ...currVal,
          likes: currentLikes.filter((id) => id !== postId),
        };
      }

      return { ...currVal, likes: [...currVal.likes, postId] };
    });
  };

  const ThumbUpIcon = post.likes.includes(postId) ? (
    <MdThumbUp />
  ) : (
    <MdOutlineThumbUp />
  );

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
          icon={ThumbUpIcon}
          variant="ghost"
          onClick={onThumbUp}
        />

        <IconButton
          aria-label="Comment Post"
          icon={<MdComment />}
          variant="ghost"
          onClick={() => Router.push(`/posts/${postId}`)}
        />

        <IconButton
          aria-label="Share Post"
          icon={<MdShare />}
          variant="ghost"
        />
      </Stack>
      <Stack direction="row">
        <Link
          onClick={() => Router.push(`/posts/${postId}`)}
          fontSize="sm"
        >{`${totalComments} comments`}</Link>
      </Stack>
    </Flex>
  );
};

export default MoleculePostAction;
