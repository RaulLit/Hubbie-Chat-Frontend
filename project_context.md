# Project Context - Hubbie Chat Frontend

This document details the architecture, file structure, global contexts, custom hooks, reusable components, and core page flows of the **Hubbie Chat** frontend application.

---

## 🚀 Tech Stack & Core Dependencies
* **Runtime & Framework:** Next.js (v14.2.3) using App Router (without `/src`)
* **UI Components & Styling:** Material UI (MUI v5) and Emotion styling engine
* **HTTP Client:** Axios (v1.7.2) for API requests with cookie credentials support
* **Realtime Messaging:** socket.io-client (v4.7.2) for WebSocket events
* **Navigation & Routing:** Next.js native filesystem routing (`next/navigation`)
* **Form & Validation:** React Hook Form (v7.48.2) & Yup (v1.3.2)
* **Environment Variables:** Loaded out-of-the-box via Next.js standard `NEXT_PUBLIC_` prefixes

---

## 📁 Repository Structure
```
frontend/
├── app/                    # Root-Level Next.js App Router
│   ├── globals.css         # Global scrollbar styles and custom CSS
│   ├── layout.jsx          # Root page HTML wrapper, font imports, and viewport config
│   ├── providers.jsx       # Client-side context wrappers tree (Theme, Alert, Auth, Chat, Layout)
│   ├── page.jsx            # Landing / Intro page route (Redirects to /home if authenticated)
│   ├── auth/
│   │   └── page.jsx        # Authentication route page (Redirects to /home if authenticated)
│   ├── home/
│   │   └── page.jsx        # Chat Workspace route page (Redirects to /auth if unauthenticated)
│   └── not-found.jsx       # 404 page fallback route
├── components/             # Reusable UI components & layouts (all markup files are .jsx)
│   ├── auth/               # Login and Signup forms & container
│   │   ├── Auth.jsx
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── common/             # Layout wraps and loading spinner component
│   │   ├── Spinner/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Spinner.css
│   │   └── Layout.jsx
│   ├── home/               # Chat dashboard panels and helper elements
│   │   ├── Chat.jsx
│   │   ├── ChatBox.jsx
│   │   ├── ChatLoading.jsx
│   │   ├── Home.jsx
│   │   ├── MyChats.jsx
│   │   ├── NewGroupModel.jsx
│   │   ├── ProfileModel.jsx
│   │   ├── SideDrawer.jsx
│   │   ├── TypingIndicator.jsx
│   │   ├── UpdateGroupModel.jsx
│   │   └── UserCard.jsx
│   ├── Intro.jsx            # Redesigned landing/welcome marketing panel
│   └── NotFound.jsx         # Fallback 404 alert component
├── contexts/               # React Global Context Providers (pure logic files are .js)
│   ├── AlertContext.js
│   ├── AuthContext.js
│   ├── ChatContext.js
│   └── ThemeContext.js
├── hooks/                  # Custom functional hooks (pure logic files are .js)
│   ├── useAlert.js
│   ├── useAuthContext.js
│   ├── useFetch.js
│   ├── useLogin.js
│   ├── useLogout.js
│   ├── useSearch.js
│   └── useSignup.js
├── util/                   # Helper utility scripts (.js)
│   └── Utilities.js
├── .env.example            # Environment variables template
├── next.config.js          # Next.js compiler settings configuration
├── package.json            # Scripts & frontend dependencies
└── README.md               # Onboarding and setup guide
```

---

## 🛡️ Global Contexts (`contexts/`)

All contexts are configured as client-side modules via the `"use client"` directive.

### 1. `AuthContext.js`
Manages authenticated user credentials. Reads initial state from `localStorage.getItem("user")`. Dispatches `LOGIN` and `LOGOUT` actions.

### 2. `ChatContext.js`
Stores active conversation variables:
* `chats` -> List of active 1v1 and group chats (validated as array and stored in `localStorage`).
* `selectedChat` -> The current active chat open in the viewport.
* `notification` -> Queue of incoming unread messages from other chats.

### 3. `ThemeContext.js`
Configures and applies responsive light/dark themes using the MUI `<ThemeProvider>`. Selects default themes according to system media queries. Body styling side-effects are safely run inside `useEffect` hooks for SSR compatibility.

### 4. `AlertContext.js`
Implements a reusable visual toast notification provider using MUI's `<Snackbar>` and `<Alert>`. Automatically stacks and triggers notifications.

---

## 🪝 Custom Hooks (`hooks/`)

### 1. `useFetch.js`
A wrapper around Axios that exposes a `request` function. Configured with:
* `withCredentials: true` to send token cookies.
* An interceptor that catches expired authentication tokens (`401 Unauthorized`) and automatically triggers the logout routine.
* Connects to `process.env.NEXT_PUBLIC_SERVER_URL`.

### 2. `useSearch.js`
Fetches users on query from `/api/user/allUser` with credentials. Returns structured user arrays, catching errors gracefully to prevent rendering crashes.

### 3. `useLogin.js`
Submits email and password credentials to `/api/auth/login`. On success, updates `localStorage`, dispatches context login, and redirects to `/home` using Next.js `useRouter()`.

### 4. `useSignup.js`
Triggers account sign-up and initial verification emails via `/api/auth/signup` and redirects users to the `/home` dashboard.

### 5. `useLogout.js`
Submits logout request `/api/auth/logout`, clears active user profile/chats cache, resets state variables, and redirects to `/auth` using `useRouter()`.

### 6. `useAlert.js`
Exposes triggers for displaying warning, error, info, or success alerts globally.

---

## 🧩 Reusable Components & Pages (`components/` & `app/`)

### 1. Pages (Routing Controllers in `app/`)

#### `app/page.jsx`
Main gateway which monitors loading status. Pushes logged-in users to `/home`, and otherwise renders the marketing panel `<Intro />`.

#### `app/home/page.jsx`
Protected workspace dashboard route. Renders `<Home />` layout or redirects unauthenticated page sessions to `/auth`.

#### `app/auth/page.jsx`
Sign-in route rendering `<Auth />`. Redirects authenticated users to the `/home` dashboard.

### 2. UI Components

#### `Intro.jsx`
The welcome landing page. Features a premium dashboard mock interface, interactive sign-in/register transitions, responsive grid designs, and a marketing layout summarizing key capabilities.

#### `Home.jsx`
The chat workspace dashboard layout containing the Side Drawer search panel, My Chats side navigation menu, and Chat Box message feed.

#### `NotFound.jsx`
Fallback page displaying a 404 error message.

---

## 🛠️ Utility Module (`util/Utilities.js`)
* **`getSender(user, users)` / `getSenderObj(user, users)`**: Retrieves display properties or profile object of the chat recipient in a 1v1 chat.
* **`isSameSender(messages, m, i, userId)`**: Determines if consecutive messages are from the same sender to group avatars efficiently.
* **`isLastMessage(messages, i, userId)`**: Confirms if a message bubble is the last message of the conversational thread.
* **`isDifferentDay(msg1, msg2)`**: Returns true if two messages were sent on different calendar days.
* **`formatDatePill(createdAt)`**: Formats date dividers into readable strings ("Today", "Yesterday", or full dates).
* **`formatChatTime(createdAt)`**: Formats message timestamps into local 12-hour AM/PM formats.
