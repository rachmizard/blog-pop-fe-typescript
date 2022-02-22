// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "types/user.type";

interface Data {
  users: IUser[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users: IUser[] = [
    {
      id: 3,
      name: "Batman",
      email: "batman@mail.com",
      createdAt: "2022-02-21T04:23:18.842Z",
      updatedAt: "2022-02-21T04:23:18.842Z",
      role: "USER",
      posts: [],
    },
    {
      id: 2,
      name: "Superman",
      email: "superman@mail.com",
      createdAt: "2022-02-20T16:39:14.240Z",
      updatedAt: "2022-02-20T16:39:14.240Z",
      role: "USER",
      posts: [],
    },
  ];

  res.status(200).json({ users });
}
