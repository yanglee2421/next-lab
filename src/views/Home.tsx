'use client'

// MUI Imports
import { Button } from '@mui/material'

// I18n Imports
import { useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation('button')

  return (
    <>
      <Button>{t('submit')}</Button>
    </>
  )
}
