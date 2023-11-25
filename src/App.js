import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { Router } from "./Router";

function App() {
  return (
    <div className="app">
      <ThemeContextProvider>
        <AuthContextProvider>
          <ChatContextProvider>
            <Router />
          </ChatContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
