# ShareWheels Frontend

The modern, web client for **ShareWheels**, a P2P carpooling platform.  
Built with **React, TypeScript**, this application delivers a seamless **real-time experience** using WebSockets for instant notifications and TanStack Query for efficient server state management.

---

## Key Features

- **Real-Time Notifications**  
  Integrated Socket.IO Client with a custom Context Provider to deliver instant booking updates  
  (via Toast & Notification Center) without page refreshes.

- **Secure Authentication**  
  JWT-based auth flow managed via Redux Toolkit, featuring persistent sessions and protected routes.

- **Firebase Integration**  
  Firebase Cloud Messaging (FCM) is used for push notifications, enabling real-time alerts even when the app is in the background.

- **Optimized Data Fetching**  
  Powered by TanStack Query (React Query) for caching, optimistic updates, and background synchronization.

- **Interactive Maps**  
  Uses Google Maps API to visualize routes and trip journey.

- **Responsive UI**  
  Styled with Tailwind CSS for a high-performance design.

---

## Client Architecture

The frontend is designed to handle **asynchronous server state** and **synchronous UI state** in separate layers.

| Layer           | Technology                     | Purpose                                                              |
| --------------- | ------------------------------ | -------------------------------------------------------------------- |
| Global UI State | Redux Toolkit                  | Manages client-only state like auth, modals, sidebar, etc.           |
| Server State    | TanStack Query                 | Manages API data caching, loading states, and background refetching. |
| Real-Time Layer | Socket.IO Client               | Maintains persistent WebSocket connection for live updates.          |
| Notifications   | Context API + Toast            | Listens to socket events and dispatches toast alerts globally.       |
| Push Messaging  | Firebase Cloud Messaging (FCM) | Delivers background and system-level push notifications.             |

---

## Tech Stack

- **Framework:** React (v19+) + TypeScript
- **Build Tool:** Vite (super-fast HMR)
- **State Management:** Redux Toolkit & TanStack Query
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Real-Time:** Socket.IO Client
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Maps:** Google Maps JavaScript API
- **UI Components:** React Hot Toast for notifications

---
