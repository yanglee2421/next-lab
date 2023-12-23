// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

export default function AuthGuard(props: AuthGuardProps) {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  const replace = router.replace;

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user) return;

    if (router.asPath !== "/") {
      replace({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }

    replace("/login");
  }, [router.isReady, auth.user, router.asPath, replace]);

  if (auth.loading) {
    return <>{fallback}</>;
  }

  if (!auth.user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback: React.ReactElement | null;
}
