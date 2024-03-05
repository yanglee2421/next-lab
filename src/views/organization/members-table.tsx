import React from 'react'

import type {
  GridColDef} from '@mui/x-data-grid';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid'
import { Box, Link } from '@mui/material'

import { useAcceptedQuery } from '@/hooks/api-erp/useAcceptedQuery'
import type { ListItem } from '@/api/api-erp/get_invite_accepted'
import { EditButton } from './edit-button'
import { RoleCell } from './role-cell'


import { toTimeAgo } from '@/utils'

export function MembersTable() {
  const query = useAcceptedQuery()

  return (
    <DataGrid
      columns={columns()}
      rows={query.data?.invited_list || []}
      getRowId={item => item.email}
      autoHeight
      disableRowSelectionOnClick
      disableColumnSelector
      slots={{ toolbar }}
    />
  )
}

function columns(): GridColDef<ListItem>[] {
  return [
    {
      field: 'name',
      flex: 1,
      minWidth: 160,
      sortable: false
    },
    {
      field: 'email',
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
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return roleMap.get(params.value)
      }
    },
    {
      field: 'joined_time',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return toTimeAgo(params.value)
      }
    },
    {
      field: 'id',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <>
            <EditButton key={JSON.stringify(params.row)} row={params.row} />
          </>
        )
      }
    }
  ]
}

function toolbar() {
  return (
    <>
      <Box display={'flex'} py={3}>
        <GridToolbarFilterButton />
        <GridToolbarExport sx={{ ml: 3 }} />
        <GridToolbarQuickFilter sx={{ ml: 'auto' }} />
      </Box>
    </>
  )
}

const roleMap = new Map<number, React.ReactNode>()

roleMap.set(1, <RoleCell text='user' iconColor='warning' />)
roleMap.set(2, <RoleCell text='admin' iconColor='success' />)
