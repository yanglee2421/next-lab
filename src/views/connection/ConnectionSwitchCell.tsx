import type { SwitchProps} from '@mui/material';
import { Switch, CircularProgress } from '@mui/material'

import { useConnectionUpdateStatus } from '@/hooks/api-stg/useConnectionUpdateStatus'

export function ConnectionSwitchCell(props: ConnectionSwitchCellProps) {
  const { site_connection_id, status, ...restProps } = props

  const mutation = useConnectionUpdateStatus()

  if (mutation.isPending) {
    return <CircularProgress size={20}></CircularProgress>
  }

  return (
    <Switch
      checked={status === 1}
      onChange={(evt, checked) => {
        void evt

        mutation.mutate(
          {
            data: {
              status: checked ? 1 : 3
            },
            headers: {
              'site-connection-id': site_connection_id
            }
          },
          {}
        )
      }}
      {...restProps}
    ></Switch>
  )
}

export type ConnectionSwitchCellProps = SwitchProps & {
  site_connection_id: number
  status: number
}
