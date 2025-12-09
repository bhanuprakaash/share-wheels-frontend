import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketNotifications } from "../shared/hooks/useSocketNotification";
import { NotificationContext } from "./notification.context";
import Icon from "../shared/components/basic/Icon";

interface Notification {
  title: string;
  body: string;
  type: string;
  sentAt: string;
}

const toastStyles: Record<
  string,
  { bg: string; border: string; text: string; btn: string }
> = {
  NEW_BOOKING_REQUEST: {
    bg: "bg-blue-50",
    border: "border-blue-500",
    text: "text-blue-800",
    btn: "text-blue-700 hover:text-blue-900",
  },
  BOOKING_STATUS_UPDATE: {
    bg: "bg-green-50",
    border: "border-green-500",
    text: "text-green-800",
    btn: "text-green-700 hover:text-green-900",
  },
  BOOKING_CANCELLATION_UPDATE: {
    bg: "bg-red-50",
    border: "border-red-500",
    text: "text-red-800",
    btn: "text-red-700 hover:text-red-900",
  },
  TRIP_COMPLETION_REQUEST: {
    bg: "bg-yellow-50",
    border: "border-yellow-500",
    text: "text-yellow-800",
    btn: "text-yellow-700 hover:text-yellow-900",
  },
  TRIP_FINALIZED_CONFIRMATION: {
    bg: "bg-purple-50",
    border: "border-purple-500",
    text: "text-purple-800",
    btn: "text-purple-700 hover:text-purple-900",
  },
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const { latestNotification } = useSocketNotifications();

  const unreadCount = notificationList.length;

  const markAsRead = (notificationId: string) => {
    console.log(`Notification ${notificationId} marked as read.`);
  };

  useEffect(() => {
    if (latestNotification) {
      const newNotification = latestNotification as Notification;

      setNotificationList((prev) => [newNotification, ...prev]);

      toast.custom(
        (t) => {
          const styles =
            toastStyles[newNotification.type] ||
            toastStyles.NEW_BOOKING_REQUEST;

          return (
            <div
              className={`p-4 shadow-lg rounded-lg w-[320px] border-l-4 flex justify-between items-start ${styles.bg} ${styles.border}`}
            >
              <div className="flex-1 pr-3">
                <strong className={`block ${styles.text}`}>
                  {newNotification.title}
                </strong>

                <p className="text-sm text-gray-700 mt-1">
                  {newNotification.body}
                </p>

                <small className="text-xs text-gray-500 block mt-2">
                  Just now
                </small>
              </div>

              <Icon
                icon="close"
                customClassNames={`cursor-pointer text-lg ${styles.btn}`}
                onClick={() => toast.dismiss(t.id)}
              />
            </div>
          );
        },
        { id: newNotification.sentAt, duration: 5000 }
      );
    }
  }, [latestNotification]);

  return (
    <NotificationContext.Provider
      value={{ notifications: notificationList, unreadCount, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
