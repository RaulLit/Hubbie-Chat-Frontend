# Hubbie Chat - Frontend

Hubbie Chat is a responsive, feature-rich, single-page real-time messaging application. Built on top of React, Material-UI (MUI), and WebSockets (Socket.IO), it offers a premium, modern chat experience with high-fidelity animations, real-time sync, and cookie-based authentication.

---

## ✨ Key Features
* **💬 Real-Time Messaging:** Instant message delivery and sync across clients using WebSockets.
* **⚡ Optimistic Send UI:** Messages appear instantly in the chat timeline with a pending clock icon while being saved to the database.
* **✓✓ Database Read Receipts:** Persistent checkmark indicators (Pending clock ➔ Sent single tick ➔ Delivered double ticks ➔ Read double blue ticks).
* **⌨️ Live Typing Indicators:** Visual cues indicating when another participant is typing.
* **📅 Date-Segregated Timeline:** Centered date pills ("Today", "Yesterday", "Wednesday, June 24, 2026") group messages by day.
* **👥 Group Chats:** Dynamic creation and configuration of group rooms (renaming, adding/ejecting users, admin rules).
* **🌓 Light & Dark Theme Support:** Seamless theme toggling persisted across sessions.
* **📱 Responsive Layouts:** Optimized viewport adjustments establishing a 3:7 column split on desktops and switching to single-pane views on mobile devices.

---

## 🚀 Tech Stack
* **UI/UX:** React (v18), Material UI (v5), Emotion styling engine
* **HTTP Client:** Axios (intercepted for automatic expired session logouts)
* **Realtime Sync:** Socket.IO Client
* **Form Logic:** React Hook Form & Yup
* **Routing:** React Router Dom (v6)

---

## 🛠️ Installation & Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (comes packaged with Node.js)

### 2. Install Dependencies
Navigate to the frontend folder and install the package dependencies:
```bash
cd frontend
npm install
```

### 3. Environment Configuration
Create a local `.env` file in the root of the `frontend` folder using the provided template:
```bash
cp .env.example .env
```

Open the `.env` file and set the required variables:
```env
# URL where the backend Node/Express server is running
REACT_APP_SERVER_URL=http://localhost:4000

# URL where the React application client is hosted
REACT_APP_CLIENT_URL=http://localhost:3000
```

### 4. Run the Development Server
Launch the application locally in development mode:
```bash
npm start
```
The application will automatically build and open in your default browser at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production
Generate an optimized, minified production bundle in the `build` directory:
```bash
npm run build
```
This builds static assets ready to be deployed on static hosts (e.g., Netlify, Vercel, or served via Nginx).
