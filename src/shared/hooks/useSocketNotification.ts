import { useEffect, useState, useMemo } from "react";
import { io, Socket } from "socket.io-client";

interface NotificationPayload {
  title: string;
  body: string;
  type: string;
  sentAt: string;
}

interface SocketNotificationHook {
  latestNotification: NotificationPayload | null;
  socket: Socket<never, never> | null;
  allNotifications: NotificationPayload[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const useSocketNotifications = (): SocketNotificationHook => {

  const [allNotifications, setAllNotifications] = useState<
    NotificationPayload[]
  >([]);


  const [socket, setSocket] = useState<Socket<never, never> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No token found for socket connection. Skipping setup.");
      return;
    }


    const newSocket: Socket<never, never> = io(API_URL, {
      query: { token: token },
      transports: ["websocket"],
      path: "/socket.io/",
    });

    setSocket(newSocket);


    newSocket.on("notification:new", (payload: NotificationPayload) => {
      console.log("Received real-time notification:", payload);
      setAllNotifications((prev) => [payload, ...prev]);
    });


    newSocket.on("connect", () =>
      console.log("Socket connected successfully.")
    );
    newSocket.on("disconnect", () => console.log("Socket disconnected."));
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); 

  const latestNotification = useMemo(() => {
    return allNotifications.length > 0 ? allNotifications[0] : null;
  }, [allNotifications]);

  return { latestNotification, socket, allNotifications };
};
