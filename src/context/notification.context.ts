import { createContext } from "react";

export interface Notification {
  title: string;
  body: string;
  type: string;
  sentAt: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
