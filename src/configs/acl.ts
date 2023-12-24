import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";

export type Subjects = string;
export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type AppAbility = MongoAbility<[Actions, Subjects]>;

export type ACLObj = {
  action: Actions;
  subject: string;
};

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (role === "admin") {
    can("manage", "all");
  } else if (role === "client") {
    can(["read"], "acl-page");
  } else {
    can(["read", "create", "update", "delete"], subject);
  }

  return rules;
};

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  const acl = new AbilityBuilder<AppAbility>(createMongoAbility).build();

  acl.update(defineRulesFor(role, subject));

  return acl;
};

export const defaultACLObj: ACLObj = {
  action: "manage",
  subject: "all",
};

export default defineRulesFor;
