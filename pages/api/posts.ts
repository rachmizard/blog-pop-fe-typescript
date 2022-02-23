// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "types/post.type";

interface Data {
  posts: IPost[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts: IPost[] = [
    {
      id: 3,
      createdAt: "2022-02-22T16:34:10.368Z",
      updatedAt: "2022-02-22T16:34:10.368Z",
      published: true,
      title: "This is my first blog",
      content: "Hellow!",
      authorId: 2,
      author: {
        id: 2,
        name: "Superman",
        email: "superman@mail.com",
      },
      postComment: [],
    },
  ];

  res.status(200).json({ posts });
}
