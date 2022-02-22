export interface IPost {
  id: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  content: string;
  authorId: number;
}
