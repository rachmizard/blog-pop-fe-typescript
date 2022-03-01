import { IPaginate } from "./paginate.type";

export interface INotification {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  readAt: string;
  isRead: boolean;
  metaData: {
    type: string;
    user: string;
    userId: number;
  };
  author: {
    id: number;
    name: string;
    email: string;
  };
}

export interface INotificationsResponse {
  paginate: IPaginate;
  data: INotification[];
}

export interface NotificationData {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  link?: string;
}

export interface INotificationTransformedResponse {
  paginate: IPaginate;
  data: NotificationData[];
}

export enum NotificationType {
  follow = "follow",
  like = "like",
  comment = "comment",
  mention = "mention",
  post = "post",
  reply = "reply",
}
