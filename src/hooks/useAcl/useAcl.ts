import React from 'react'

import { useAbility } from '@casl/react'

import type { AppAbility} from './defineAbilityFor';
import { defineAbilityFor } from './defineAbilityFor'

export const AclContext = React.createContext<AppAbility>(defineAbilityFor(0))
export const useAcl = () => useAbility(AclContext)
