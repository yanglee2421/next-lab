// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

export default function AuthGuard(props: AuthGuardProps) {
  // ** Props
  const { children, fallback } = props;

  const auth = useAuth();
  const { replace, ...router } = useRouter();

  React.useEffect(() => {
    // Allow passage if logged in
    if (auth.user?.role) {
      return;
    }

    // Redirect route when not Logged in
    if (!router.isReady) {
      return;
    }

    const timer = setTimeout(() => {
      replace({
        pathname: "/login",
        query:
          router.asPath === "/"
            ? void 0
            : {
                returnUrl: router.asPath,
              },
      });
    }, 16);

    return () => {
      clearTimeout(timer);
    };
  }, [auth.user?.role, router.isReady, router.asPath, replace]);

  if (auth.loading) {
    return <>{fallback}</>;
  }

  if (!auth.user?.role) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback: React.ReactElement | null;
}
