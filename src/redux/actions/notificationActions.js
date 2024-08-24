import { NotificationTypes } from "../types";

export const fetchNotifications = (notifications) => {
    return {
        type: NotificationTypes.FETCH_NOTIFICATIONS,
        payload: notifications
    }
}