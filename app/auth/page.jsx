"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { Auth } from "../../components/auth/Auth";
import { LoadingSpinner } from "../../components/common/Spinner/LoadingSpinner";

export default function AuthPage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <LoadingSpinner />;
  }

  return <Auth />;
}
