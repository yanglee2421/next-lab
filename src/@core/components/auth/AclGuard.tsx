// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import type { ACLObj } from "src/configs/acl";

// ** Context Imports
import { AbilityContext } from "src/layouts/components/acl/Can";

// ** Config Import
import { buildAbilityFor } from "src/configs/acl";

// ** Component Import
import NotAuthorized from "src/pages/401";
import Spinner from "src/@core/components/spinner";
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

// ** Util Import
import { getHomeRoute } from "src/layouts/components/acl/getHomeRoute";

export default function AclGuard(props: AclGuardProps) {
  // ** Props
  const { aclAbilities, children, guestGuard = false } = props;

  // ** Hooks
  const auth = useAuth();
  const { replace, ...router } = useRouter();

  React.useEffect(() => {
    // Allow passage if logged in guest guard disabled
    if (guestGuard) {
      return;
    }

    const role = auth.user?.role;

    // Allow passage if logged in
    if (!role) {
      return;
    }

    // Redirect route when not Logged in
    if (!router.isReady) {
      return;
    }

    if (router.route !== "/") {
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
  }, [
    guestGuard,
    auth.user?.role,
    router.isReady,
    router.route,
    router.query.returnUrl,
    replace,
  ]);

  // User is not logged in
  if (!auth.user?.role) {
    return <>{children}</>;
  }

  if (router.route === "/") {
    return <Spinner />;
  }

  // Check the access of current user and render pages
  const ability = buildAbilityFor(auth.user.role);

  if (ability.can(aclAbilities.action, aclAbilities.subject)) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
}

interface AclGuardProps {
  children: React.ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  aclAbilities: ACLObj;
}
