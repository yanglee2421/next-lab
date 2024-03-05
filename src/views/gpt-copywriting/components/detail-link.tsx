import { Link } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function DetailLink() {
  const { t } = useTranslation()
  const setTask = useCopywritingStore(s => s.setTask)

  return (
    <Link
      onClick={() => {
        setTask(null)
      }}
      color={'error'}
      component={'button'}
      sx={{ textTransform: 'capitalize' }}
    >
      {t('tasks')}
    </Link>
  )
}
