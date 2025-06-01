import { useNotifications } from "../../contexts/NotificationContext";
import { FaBell } from "react-icons/fa";
import { useState } from "react";

const icons = {
  info: (
    <svg
      className="w-6 h-6 text-indigo-900"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  ),
  close: (
    <svg
      className="w-5 h-5 text-indigo-900"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  bell: <FaBell className="w-5 h-6 text-indigo-900" />,
};

const NotificationCenter = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <div className="bg-indigo-100 bg-opacity-70 rounded-xl border border-gray-300 shadow-lg mt-10 p-6 w-4/5 mx-auto max-h-[75vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-5 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {icons.bell}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-indigo-900">Notifications</h3>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-indigo-900 border border-indigo-900 text-sm px-3 py-1 rounded hover:bg-indigo-100"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <div
                className={`flex items-start p-4 rounded-lg shadow ${
                  notification.read ? "bg-gray-50" : "bg-indigo-50"
                }`}
              >
                <div className="mr-3">
                  {icons[notification.type] || icons.info}
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-indigo-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="hover:bg-indigo-200 p-1 rounded"
                      aria-label="Mark as read"
                    >
                      {icons.close}
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="hover:bg-red-100 p-1 rounded"
                    aria-label="Delete notification"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
