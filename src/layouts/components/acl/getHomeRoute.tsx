/**
 *  Set Home URL based on User Roles
 */
export function getHomeRoute(role: string) {
  switch (role) {
    case "client":
      return "/acl";

    default:
      return "/dashboards/analytics";
  }
}
