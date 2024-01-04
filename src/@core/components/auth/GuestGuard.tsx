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
  const { replace, ...router } = useRouter();

  React.useEffect(() => {
    // Passed if not logged in
    if (!auth.user?.role) {
      return;
    }

    // Redirect route when Logged in
    if (!router.isReady) {
      return;
    }

    const timer = setTimeout(() => {
      replace("/");
    }, 16);

    return () => {
      clearTimeout(timer);
    };
  }, [auth.user?.role, router.isReady, replace]);

  if (auth.loading) {
    return <>{fallback}</>;
  }

  if (auth.user?.role) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface GuestGuardProps {
  children: React.ReactNode;
  fallback: React.ReactElement | null;
}
