import type { IconButtonProps} from '@mui/material';
import { CircularProgress, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'

import { toast } from 'react-toastify'

import { useConnectionUpdateStatus } from '@/hooks/api-stg/useConnectionUpdateStatus'

export function ConnectionDeleteItem(props: ConnectionDeleteItemProps) {
  // ** Props
  const { site_connection_id, onSuccess } = props

  // API Hooks
  const mutation = useConnectionUpdateStatus()

  const handleClick = () => {
    mutation.mutate(
      {
        data: {
          status: 4
        },
        headers: {
          'site-connection-id': site_connection_id
        }
      },
      {
        onSuccess,
        onError(error) {
          toast.error(error.message)
        }
      }
    )
  }

  if (mutation.isPending) {
    return (
      <MenuItem>
        <ListItemIcon>
          <CircularProgress size={18}></CircularProgress>
        </ListItemIcon>
        <ListItemText>loading...</ListItemText>
      </MenuItem>
    )
  }

  return (
    <>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <DeleteOutline></DeleteOutline>
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </>
  )
}

export type ConnectionDeleteItemProps = IconButtonProps & {
  site_connection_id: number
  onSuccess(): void
}
