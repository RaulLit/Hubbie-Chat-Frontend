"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { Intro } from "../components/Intro";
import { LoadingSpinner } from "../components/common/Spinner/LoadingSpinner";

export default function IntroPage() {
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

  return <Intro />;
}
