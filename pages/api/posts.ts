// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  users: IUser[];
}

interface IUser {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = [
    {
      id: 1,
      name: "Zimmy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Richard Georgie",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Michael Zayn",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  res.status(200).json({ users });
}
