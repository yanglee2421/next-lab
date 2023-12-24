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
import getHomeRoute from "src/layouts/components/acl/getHomeRoute";

export default function AclGuard(props: AclGuardProps) {
  // ** Props
  const { aclAbilities, children, guestGuard = false } = props;

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  const replace = router.replace;

  React.useEffect(() => {
    if (guestGuard) return;

    if (router.route !== "/") {
      return;
    }

    if (!auth.user?.role) {
      return;
    }

    replace(getHomeRoute(auth.user.role));
  }, [guestGuard, auth.user, replace]);

  // User is not logged in
  if (!auth.user?.role) {
    return <>{children}</>;
  }

  if (router.route === "/") {
    return <Spinner />;
  }

  // Check the access of current user and render pages
  const ability = buildAbilityFor(auth.user.role, aclAbilities.subject);

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
