import React from 'react'

import type { Theme } from '@mui/material'
import { Card, CardHeader, useMediaQuery, Tooltip, CardContent } from '@mui/material'
import type { DataGridProps } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { LoadingButton } from '@mui/lab'

import { useTranslation } from 'react-i18next'

import { ListBtn } from '../components'
import { StatusCell } from './StatusCell'
import { CircularProgressWithLabel } from './CircularProgressWithLabel'
import { useTaskAll } from '@/hooks/api-nlp/useTaskAll'
import { toDeduplicate } from '@/utils/toDeduplicate'
import { toLocaleDate } from '@/utils/toLocaleDate'
import { toTimeAgo } from '@/utils/toTimeAgo'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function RightTable() {
  const { t } = useTranslation()
  const columns = getColumns(t)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10
  })

  const query = useTaskAll()
  const tab = useCopywritingStore(s => s.tab)
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={t('Tasks')}
        action={
          <LoadingButton
            onClick={() => {
              query.refetch()
            }}
            loading={query.isRefetching}
          >
            {t('refresh')}
          </LoadingButton>
        }
      ></CardHeader>
      <CardContent sx={{ flex: 1 }}>
        <DataGrid
          rows={
            toDeduplicate(
              query.data.filter(item => {
                return item.role_no === tab
              }),
              { keyProp: 'task_id' }
            ) || []
          }
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={r => r.task_id}
          autoHeight={isSmall}
        ></DataGrid>
      </CardContent>
    </Card>
  )
}

function getColumns(t: (s: string) => string): DataGridProps['columns'] {
  return [
    {
      field: 'task_label',
      headerName: t('name'),
      flex: 1,
      minWidth: 240
    },
    {
      field: 'start_time',
      headerName: t('time'),
      renderCell(params) {
        return (
          <Tooltip title={toLocaleDate(params.value)}>
            <span>{toTimeAgo(params.value)}</span>
          </Tooltip>
        )
      },
      flex: 1,
      minWidth: 160
    },
    {
      field: 'task_progress',
      headerName: t('progress'),
      renderCell(params) {
        return <CircularProgressWithLabel value={params.value}></CircularProgressWithLabel>
      },
      flex: 1,
      minWidth: 120
    },
    {
      field: 'task_status',
      headerName: t('status'),
      renderCell(params) {
        return <StatusCell label={params.value}></StatusCell>
      },
      flex: 1,
      minWidth: 120
    },
    {
      field: 'task_id',
      headerName: t('operation'),
      renderCell({ value, row }) {
        const isOk = row.task_status === 'SUCCESS'

        if (isOk) return <ListBtn id={value} />

        return <></>
      },
      flex: 1,
      minWidth: 120
    }
  ]
}
