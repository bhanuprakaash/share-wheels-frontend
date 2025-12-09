import Title from "../../../shared/components/basic/Title";
import { useNotifications } from "../../../shared/hooks/useNotifications";

const notificationStyles: Record<
  string,
  { bg: string; border: string; text: string; badge: string }
> = {
  NEW_BOOKING_REQUEST: {
    bg: "bg-blue-50",
    border: "border-blue-500",
    text: "text-blue-800",
    badge: "bg-blue-100 text-blue-700",
  },
  BOOKING_STATUS_UPDATE: {
    bg: "bg-green-50",
    border: "border-green-500",
    text: "text-green-800",
    badge: "bg-green-100 text-green-700",
  },
  BOOKING_CANCELLATION_UPDATE: {
    bg: "bg-red-50",
    border: "border-red-500",
    text: "text-red-800",
    badge: "bg-red-100 text-red-700",
  },
  TRIP_COMPLETION_REQUEST: {
    bg: "bg-yellow-50",
    border: "border-yellow-500",
    text: "text-yellow-800",
    badge: "bg-yellow-100 text-yellow-700",
  },
  TRIP_FINALIZED_CONFIRMATION: {
    bg: "bg-purple-50",
    border: "border-purple-500",
    text: "text-purple-800",
    badge: "bg-purple-100 text-purple-700",
  },
};

const NotificationsPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Title title={`Notifications (${notifications.length})`} />

      <div className="space-y-4 mt-5">
        {notifications.map((n, index) => {
          const style =
            notificationStyles[n.type] ||
            notificationStyles.NEW_BOOKING_REQUEST;

          return (
            <div
              key={index}
              className={`border-l-4 rounded-lg shadow-sm p-4 flex justify-between items-start ${style.bg} ${style.border}`}
            >
              <div>
                <h3 className={`font-semibold ${style.text}`}>{n.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{n.body}</p>

                <small className="text-xs text-gray-500 block mt-2">
                  Received: {new Date(n.sentAt).toLocaleTimeString()}
                </small>
              </div>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${style.badge}`}
              >
                {n.type.replaceAll("_", " ")}
              </span>
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="flex items-center justify-center h-[75vh]">
          <p className="text-gray-500 text-center">
            You have no notifications yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
