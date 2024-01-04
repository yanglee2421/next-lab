// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

// ** Util Import
import { getHomeRoute } from "src/layouts/components/acl/getHomeRoute";

export default function GuestGuard(props: GuestGuardProps) {
  // ** Props
  const { children, fallback } = props;

  const auth = useAuth();
  const { replace, ...router } = useRouter();

  React.useEffect(() => {
    const role = auth.user?.role;

    // Passed if not logged in
    if (!role) {
      return;
    }

    // Redirect route when Logged in
    if (!router.isReady) {
      return;
    }

    const timer = setTimeout(() => {
      const returnURL = (() => {
        if (!router.query.returnUrl) {
          return getHomeRoute(role);
        }

        if (typeof router.query.returnUrl === "string") {
          return router.query.returnUrl;
        }

        return getHomeRoute(role);
      })();

      replace(returnURL);
    }, 16);

    return () => {
      clearTimeout(timer);
    };
  }, [auth.user?.role, router.isReady, router.query.returnUrl, replace]);

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
