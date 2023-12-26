// ACL Imports
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
export function buildAbilityFor(role: number): AppAbility {
  const acl = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (role) {
    // Admin
    case 2:
      acl.can("manage", "all");
      break;

    // User
    case 1:
      acl.can("read", "all");
      acl.can("read", "acl-page");
      acl.can("create", "ticket");
      acl.cannot("read", "page-billing-plan");
      acl.cannot("update", "subscription");
      break;

    // Visitor
    default:
      acl.can("read", "all");
      acl.cannot("read", "page-billing-plan");
      acl.cannot("update", "subscription");
  }

  return acl.build();
}

export const defaultACLObj: ACLObj = {
  action: "read",
  subject: "fallback",
};

export type AppAbility = MongoAbility<[string, string]>;

export type ACLObj = {
  action: string;
  subject: string;
};
