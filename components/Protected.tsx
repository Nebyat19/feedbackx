// components/Protected.tsx
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Protected({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession();
     
      if (!session.data) {
        window.location.href = "/login";
        return;
      }
      setAuthorized(true);
    };

    checkAuth();
  }, []);

  if (!authorized) {
    return null; // optional: return a loading spinner instead
  }

  return <>{children}</>;
}
