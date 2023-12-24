// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

export default function GuestGuard(props: GuestGuardProps) {
  // ** Props
  const { children, fallback } = props;

  const auth = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!auth.user) return;

    if (!router.isReady) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace("/");
    }, 16);

    return () => {
      clearTimeout(timer);
    };
  }, [auth.user, router]);

  if (auth.loading) {
    return <>{fallback}</>;
  }

  if (auth.user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface GuestGuardProps {
  children: React.ReactNode;
  fallback: React.ReactElement | null;
}
