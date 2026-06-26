# Project Context - Hubbie Chat Frontend

This document details the architecture, file structure, global contexts, custom hooks, reusable components, and core page flows of the **Hubbie Chat** frontend application.

---

## 🚀 Tech Stack & Core Dependencies
* **Runtime & Boilerplate:** React (v18.2.0), bootstrapped with Create React App
* **UI Components & Styling:** Material UI (MUI v5) and Emotion styling engine
* **HTTP Client:** Axios (v1.7.2) for API requests with cookie credentials support
* **Realtime Messaging:** socket.io-client (v4.7.2) for WebSocket events
* **Routing:** React Router Dom (v6.18.0)
* **Form & Validation:** React Hook Form (v7.48.2) & Yup (v1.3.2)

---

## 📁 Repository Structure
```
frontend/
├── public/                 # Static assets (HTML entrypoint, icons, manifest)
├── src/
│   ├── components/         # Reusable UI components & layouts
│   │   ├── auth/           # Login and Signup forms & container
│   │   │   ├── Auth.js
│   │   │   ├── LoginForm.js
│   │   │   └── SignupForm.js
│   │   ├── common/         # Layout wraps and loading spinner component
│   │   │   ├── Spinner/
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   └── Spinner.css
│   │   │   └── Layout.js
│   │   ├── home/           # Chat dashboard panel and helper elements
│   │   │   ├── Chat.js
│   │   │   ├── ChatBox.js
│   │   │   ├── ChatLoading.js
│   │   │   ├── Home.js
│   │   │   ├── MyChats.js
│   │   │   ├── NewGroupModel.js
│   │   │   ├── ProfileModel.js
│   │   │   ├── SideDrawer.js
│   │   │   ├── TypingIndicator.js
│   │   │   ├── UpdateGroupModel.js
│   │   │   └── UserCard.js
│   │   ├── Intro.js        # Redesigned responsive landing/welcome page
│   │   └── NotFound.js     # Page-not-found 404 fallback page
│   ├── contexts/           # React Global Context Providers
│   │   ├── AlertContext.js
│   │   ├── AuthContext.js
│   │   ├── ChatContext.js
│   │   └── ThemeContext.js
│   ├── hooks/              # Custom functional hooks
│   │   ├── useAlert.js
│   │   ├── useAuthContext.js
│   │   ├── useFetch.js
│   │   ├── useLogin.js
│   │   ├── useLogout.js
│   │   ├── useSearch.js
│   │   └── useSignup.js
│   ├── util/               # Helper utility scripts
│   │   └── Utilities.js
│   ├── App.js              # Routing and Context Wrappers
│   ├── index.css           # Global custom scrollbars and basic styles
│   └── index.js            # Entrypoint file
├── .env.example            # Environment templates
├── package.json            # Scripts & frontend dependencies
└── README.md               # User-facing onboarding and setup guide
```

---

## 🛡️ Global Contexts (`src/contexts/`)

### 1. `AuthContext.js`
Manages authenticated user credentials. Reads initial state from `localStorage.getItem("user")`. Dispatches `LOGIN` and `LOGOUT` actions.

### 2. `ChatContext.js`
Stores active conversation variables:
* `chats` -> List of active 1v1 and group chats (validated as array and stored in `localStorage`).
* `selectedChat` -> The current active chat open in the viewport.
* `notification` -> Queue of incoming unread messages from other chats.

### 3. `ThemeContext.js`
Configures and applies responsive light/dark themes using the MUI `<ThemeProvider>`. Persists the selected mode across page sessions.

### 4. `AlertContext.js`
Implements a reusable visual toast notification provider using MUI's `<Snackbar>` and `<Alert>`. Automatically stacks and triggers notifications.

---

## 🪝 Custom Hooks (`src/hooks/`)

### 1. `useFetch.js`
A wrapper around Axios that exposes a `request` function. Configured with:
* `withCredentials: true` to send token cookies.
* An interceptor that catches expired authentication tokens (`401 Unauthorized`) and automatically triggers the logout routine.

### 2. `useSearch.js`
Fetches users on query from `/api/user/allUser` with credentials. Returns structured user arrays, catching errors gracefully to prevent rendering crashes.

### 3. `useLogin.js`
Submits email and password to `/api/auth/login`. On success, updates `localStorage` and dispatches login actions.

### 4. `useSignup.js`
Triggers account sign-up and initial verification emails via `/api/auth/signup`.

### 5. `useLogout.js`
Submits logout request `/api/auth/logout`, clears active user profile/chats cache, and resets state variables.

### 6. `useAlert.js`
Exposes triggers for displaying warning, error, info, or success alerts globally.

---

## 🧩 Reusable Components & Pages (`src/components/`)

### 1. Pages

#### `Intro.js`
The welcome landing page. Features a premium dashboard mock interface, interactive sign-in/register transitions, responsive grid designs, and a marketing layout summarizing the application's key capabilities.

#### `Home.js`
The chat workspace dashboard layout containing the Side Drawer search panel, My Chats side navigation menu, and Chat Box message feed.

#### `NotFound.js`
Fallback page displaying a 404 error with direct navigation back to home.

### 2. Home Dashboard Components

#### `SideDrawer.js`
Slide-out drawer showing a user query inputs search field. Includes trigger buttons for creating/retrieving 1v1 chats.

#### `MyChats.js`
Renders active chats. Features custom WhatsApp-style previews including truncated last message content, sender name indicators, and last-message timestamps. Responds dynamically to device breakpoints (3:7 screen ratio split on desktops, single pane on mobile).

#### `ChatBox.js`
Manages the message timeline, active socket listeners (typing states, incoming messages), message read receipts, and input forms. Exposes controls for group settings.

#### `Chat.js`
Renders message bubbles inside a scrollable timeline. Implements:
* Optimistic send UI indicators (pending clock icon).
* Database status checkmarks (single grey tick for sent, double grey ticks for read by group members, double blue ticks for read by all).
* Interleaved centered date segregations pills ("Today", "Yesterday", etc.) dynamically showing historical date headers.

#### `NewGroupModel.js` & `UpdateGroupModel.js`
Interactive overlays to assemble or adjust group settings (group names, administrator validations, adding or ejecting participants).

#### `ProfileModel.js`
Displays profile metadata cards containing name, email, and avatars.

#### `UserCard.js`
A standard list-item card representation for users returned in search results.

---

## 🛠️ Utility Module (`src/util/Utilities.js`)
* **`getSender(user, users)` / `getSenderObj(user, users)`**: Retrieves the display properties or profile object of the chat recipient in a 1v1 chat.
* **`isSameSender(messages, m, i, userId)`**: Determines if consecutive messages are from the same sender to group avatars efficiently.
* **`isLastMessage(messages, i, userId)`**: Confirms if a message bubble is the last message of the conversational thread.
* **`isDifferentDay(msg1, msg2)`**: Returns true if two messages were sent on different calendar days.
* **`formatDatePill(createdAt)`**: Formats date dividers into readable strings ("Today", "Yesterday", or full dates).
* **`formatChatTime(createdAt)`**: Formats message timestamps into local 12-hour AM/PM formats.
