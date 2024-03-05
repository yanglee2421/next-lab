'use client'

import React from 'react'

import { Box, Card, CardHeader, IconButton, Tooltip, styled, CircularProgress, CardContent } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid'
import { DownloadOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { useInvoiceListQuery } from '@/hooks/api-erp/useInvoiceListQuery'
import { useInvoicePdfPost } from '@/hooks/api-erp/useInvoicePdfPost'

export function CardInvoice() {
  const { t } = useTranslation()

  const query = useInvoiceListQuery()

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return (
    <Card>
      <CardHeader title={t('Invoice List')} sx={{ '& .MuiCardHeader-action': { m: 0 } }}></CardHeader>
      <CardContent>
        <DataGrid
          loading={query.isFetching}
          rows={query.data.invoice_list}
          columns={getColumns(t)}
          disableRowSelectionOnClick
          autoHeight
          pageSizeOptions={[10, 20, 50, 100]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        ></DataGrid>
      </CardContent>
    </Card>
  )
}

function getColumns(t: (s: string) => string): GridColDef[] {
  return [
    {
      flex: 0.15,
      minWidth: 90,
      headerName: `# ${t('name')}`,
      field: 'name',
      renderCell({ value }) {
        return <SpanStyled>#{value}</SpanStyled>
      }
    },
    {
      flex: 0.13,
      minWidth: 80,
      headerName: t('invoice date'),
      field: 'invoice_date'
    },
    {
      flex: 0.13,
      minWidth: 90,
      headerName: t('due date'),
      field: 'invoice_date_due'
    },
    {
      flex: 0.13,
      minWidth: 125,
      headerName: t('status'),
      field: 'payment_state_title'
    },
    {
      flex: 0.13,
      minWidth: 130,
      headerName: t('Amount Due'),
      field: 'amount_untaxed_signed',
      renderCell({ value, row }) {
        return `${String(row.currency_symbol)} ${Number(value).toFixed(2)}`
      }
    },
    {
      flex: 0.13,
      minWidth: 125,
      headerName: t('actions'),
      sortable: false,
      field: 'aaa',
      renderCell({ row }) {
        return <OperateBtns row={row} />
      }
    }
  ]
}

function OperateBtns(props: OperateBtnsProps) {
  const { row } = props

  const { t } = useTranslation()
  const mutation = useInvoicePdfPost()

  if (mutation.isPending) {
    return <CircularProgress size={20} />
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={t('Download')}>
        <IconButton
          onClick={() => {
            mutation.mutate({ data: { invoice_id: row.id } })
          }}
        >
          <DownloadOutlined></DownloadOutlined>
        </IconButton>
      </Tooltip>
    </Box>
  )
}

interface OperateBtnsProps {
  row: { id: number }
}

const SpanStyled = styled('span')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
