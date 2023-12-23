// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

interface GuestGuardProps {
  children: React.ReactNode;
  fallback: React.ReactElement | null;
}

export default function GuestGuard(props: GuestGuardProps) {
  // ** Props
  const { children, fallback } = props;

  const auth = useAuth();
  const router = useRouter();

  const replace = router.replace;

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user) {
      replace("/");
    }
  }, [router.isReady, auth.user, replace]);

  if (auth.loading) {
    return <>{fallback}</>;
  }

  if (auth.user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
