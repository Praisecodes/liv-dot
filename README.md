# LIV DOT – Event Viewer Flow (React Native)

This project is a simplified implementation of an event viewing flow for LIV DOT’s mobile application. It demonstrates how a viewer interacts with an event, including access control, event status handling, and network-aware UI states.

---

## 🚀 Features

The application handles the following states:

- [x] Loading event details
- [x] User has not purchased access
- [x] Payment/access is pending verification
- [x] Event is upcoming
- [x] Event is live and available to watch
- [x] Event is offline or unavailable
- [x] Replay is available
- [x] Device is offline / request failed

---

## 🧠 Approach

The application is built with a **state-driven UI approach**, where the UI is derived from a combination of:

- Event data (mocked)
- Payment status
- Time-based conditions (start/end date)
- Network state (NetInfo)
- Request state (React Query)

Instead of relying on scattered conditional logic, the system derives a **single event view state**, which determines what the user sees and can do.

---

## 🏗️ Tech Stack

- React Native (Expo)
- TypeScript
- Expo Router
- Zustand (local UI state)
- TanStack Query (server state simulation)
- NetInfo (network detection)
- date-fns (date handling)

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Praisecodes/liv-dot.git
cd liv-dot