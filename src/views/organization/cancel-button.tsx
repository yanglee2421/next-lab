import { CircularProgress, IconButton } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

import { toast } from 'react-toastify'

import { useCancelInvite } from '@/hooks/api-erp/useCancelInvite'
import type { ListItem } from '@/api/api-erp/get_invite_unaccepted'

export function CancelButton(props: Props) {
  const { row } = props

  const cancelMutation = useCancelInvite()

  if (cancelMutation.isPending) {
    return <CircularProgress size={18} />
  }

  return (
    <IconButton
      onClick={() => {
        cancelMutation.mutate(
          {
            data: {
              email: row.email
            }
          },
          {
            onError(error) {
              toast.error(error.message)
            },
            onSuccess(data) {
              toast.success(`Update ${data.email} successlly!`)
            }
          }
        )
      }}
    >
      <CloseOutlined />
    </IconButton>
  )
}

type Props = {
  row: ListItem
}
