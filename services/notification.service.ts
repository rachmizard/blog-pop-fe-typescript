import { AxiosResponse } from "axios";
import { INotificationsResponse } from "types/notification.type";
import AdapterService from "./adapterService.service";

export default class NotificationService extends AdapterService {
  constructor() {
    super();
  }

  async getNotifications(
    params = {}
  ): Promise<AxiosResponse<INotificationsResponse>> {
    try {
      return this.sendGetRequest("/notifications", params);
    } catch (error: any) {
      throw new Error(
        "NotificationService.getNotifications: " + error?.message
      );
    }
  }
}
