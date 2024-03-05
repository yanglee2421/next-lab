import { Button } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function ListBtn(props: ListBtnProps) {
  const { id } = props

  const { t } = useTranslation()
  const setTask = useCopywritingStore(s => s.setTask)

  return (
    <Button
      onClick={() => {
        setTask(id)
      }}
      size='small'
      sx={{ textTransform: 'capitalize' }}
    >
      {t('view')}
    </Button>
  )
}

export interface ListBtnProps {
  id: string
}
