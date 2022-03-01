import { useQuery } from "react-query";
import { NotificationService } from "services";
import {
  INotificationsResponse,
  INotificationTransformedResponse,
  NotificationData,
  NotificationType,
} from "types/notification.type";

const notificationService = new NotificationService();

const transformNotification = (
  data: INotificationsResponse
): INotificationTransformedResponse => {
  const transformed: NotificationData[] = data.data.map((notification) => {
    return {
      id: notification.id,
      title: notification.content,
      description: `${notification.metaData.user} ${notification.content}`,
      link: `/notifications/${notification.id}`,
      type: notification.metaData.type as NotificationType,
    };
  });

  return {
    paginate: data.paginate,
    data: transformed,
  };
};

export const useFetchNotification = (params = {}) => {
  return useQuery(
    ["notifications", params],
    () => notificationService.getNotifications(params),
    {
      select: (data) => {
        return transformNotification(data?.data);
      },
      keepPreviousData: true,
    }
  );
};
