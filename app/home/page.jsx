"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { Home } from "../../components/home/Home";
import { LoadingSpinner } from "../../components/common/Spinner/LoadingSpinner";

export default function HomePage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoadingSpinner />;
  }

  return <Home />;
}
