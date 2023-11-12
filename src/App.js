import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { Router } from "./Router";

function App() {
  return (
    <div className="app">
      <ThemeContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
