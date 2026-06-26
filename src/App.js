import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Layout } from "./components/common/Layout";

// Pages
import { Auth } from "./components/auth/Auth";
import { Home } from "./components/home/Home";
import { Intro } from "./components/Intro";
import { NotFound } from "./components/NotFound";
import { LoadingSpinner } from "./components/common/Spinner/LoadingSpinner";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={!user ? <Intro /> : <Navigate to="/home" />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
