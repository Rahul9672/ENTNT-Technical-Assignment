import { createContext, useContext, useState, useEffect } from "react";
import { getData, addItem, updateItem } from "../utils/localStorageUtils";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifications = () => {
    const notifs = getData("notifications") || [];
    setNotifications(notifs);
    setUnreadCount(notifs.filter((n) => !n.read).length);
  };

  useEffect(() => {
    refreshNotifications();
  }, []);

  const addNotification = (message, type = "info") => {
    const newNotif = {
      id: `n${Date.now()}`,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
    };
    addItem("notifications", newNotif);
    refreshNotifications();
  };

  const markAsRead = (id) => {
    updateItem("notifications", id, { read: true });
    refreshNotifications();
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    localStorage.setItem("notifications", JSON.stringify(updated));
    refreshNotifications();
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    localStorage.setItem("notifications", JSON.stringify(updated));
    refreshNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
