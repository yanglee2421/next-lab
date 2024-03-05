import React from 'react'

import { Link } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid'

import { toTimeAgo } from '@/utils'
import { useUnacceptedQuery } from '@/hooks/api-erp/useUnacceptedQuery'
import type { ListItem } from '@/api/api-erp/get_invite_unaccepted'
import { CancelButton } from './cancel-button'
import { RoleCell } from './role-cell'

export function PendingTable() {
  const query = useUnacceptedQuery()

  return (
    <DataGrid
      columns={columns()}
      rows={query.data?.invited_list || []}
      getRowId={item => item.email}
      autoHeight
      disableRowSelectionOnClick
      disableColumnSelector
    />
  )
}

function columns(): GridColDef<ListItem>[] {
  return [
    {
      field: 'email',
      headerName: 'INVITEE',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return (
          <Link href={`mailto:${params.value}`} underline='always' sx={{ textDecorationLine: 'underline' }}>
            {params.value}
          </Link>
        )
      }
    },
    {
      field: 'wd_role',
      headerName: 'role',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return roleMap.get(params.value)
      }
    },
    {
      field: 'create_by',
      headerName: 'CREATED BY',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      minWidth: 160,
      sortable: false
    },
    {
      field: 'create_time',
      headerName: 'CREATED',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return toTimeAgo(params.value)
      }
    },
    {
      field: 'signup_url',
      headerName: 'INVITE LINK',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return (
          <>
            <Link href={params.value} underline='always' sx={{ textDecoration: 'underline' }}>
              invite link
            </Link>
          </>
        )
      }
    },
    {
      field: 'lang',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell(params) {
        return (
          <>
            <CancelButton row={params.row} />
          </>
        )
      }
    }
  ]
}

const roleMap = new Map<number, React.ReactNode>()

roleMap.set(1, <RoleCell text='user' iconColor='warning' />)
roleMap.set(2, <RoleCell text='admin' iconColor='success' />)
