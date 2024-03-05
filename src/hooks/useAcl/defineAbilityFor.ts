import type { MongoAbility} from '@casl/ability';
import { createMongoAbility, AbilityBuilder } from '@casl/ability'

export function defineAbilityFor(role: number) {
  const aclBuilder = new AbilityBuilder<AppAbility>(createMongoAbility)

  switch (role) {
    // Admin
    case 2:
      aclBuilder.can('manage', 'all')
      break

    // User
    case 1:
      aclBuilder.can('read', 'all')
      aclBuilder.can('read', 'acl-page')
      aclBuilder.can('create', 'ticket')
      aclBuilder.cannot('read', 'page-billing-plan')
      aclBuilder.cannot('update', 'subscription')
      break

    // Guest
    default:
      aclBuilder.can('read', 'all')
      aclBuilder.can('read', 'page-oauth-shopify')
  }

  return aclBuilder.build()
}

export type AppAbility = MongoAbility<[string, string]>
