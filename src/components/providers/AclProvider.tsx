'use client'

import React from 'react'

import '@/locales/i18n'
import { useParams } from 'next/navigation'

import { useTranslation } from 'react-i18next'

import { AclContext } from '@/hooks/useAcl'
import { defineAbilityFor } from '@/hooks/useAcl/defineAbilityFor'
import { useTaskActive } from '@/hooks/api-nlp/useTaskActive'
import { usePayResultQuery } from '@/hooks/usePayResultQuery'

export function AclProvider(props: React.PropsWithChildren) {
  useTaskActive()
  usePayResultQuery()

  const { i18n } = useTranslation()
  const params = useParams()

  React.useEffect(() => {
    if (typeof params.lang === 'string') {
      i18n.changeLanguage(params.lang)
    }
  }, [i18n, params.lang])

  return <AclContext.Provider value={defineAbilityFor(2)}>{props.children}</AclContext.Provider>
}
