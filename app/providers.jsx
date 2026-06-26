"use client";

import React from "react";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { AlertContextProvider } from "../contexts/AlertContext";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ChatContextProvider } from "../contexts/ChatContext";
import { Layout } from "../components/common/Layout";
import { ServerWakeUp } from "../components/common/ServerWakeUp";

export default function Providers({ children }) {
  return (
    <ThemeContextProvider>
      <AlertContextProvider>
        <AuthContextProvider>
          <ChatContextProvider>
            <Layout>
              {children}
              <ServerWakeUp />
            </Layout>
          </ChatContextProvider>
        </AuthContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  );
}
