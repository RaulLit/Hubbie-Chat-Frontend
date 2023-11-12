import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
// Pages
import { Auth } from "./components/auth/Auth";
import { Home } from "./components/home/Home";
import { Intro } from "./components/Intro";
import { NotFound } from "./components/NotFound";

export const Router = () => {
  const { user } = useContext(AuthContext);
  return (
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
  );
};
