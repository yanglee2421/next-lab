'use client'

import React from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  TableContainer,
  TableRow,
  Table,
  TableCell,
  TableBody,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useCommonCountry } from '@/hooks/api-erp/useCommonCountry'
import { useCommonState } from '@/hooks/api-erp/useCommonState'
import { useBillAddressQuery } from '@/hooks/api-erp/useBillAddressQuery'

export function CardAddress() {
  const { t } = useTranslation()

  const billQuery = useBillAddressQuery()
  const countryQuery = useCommonCountry()
  const stateQuery = useCommonState()
  const params = useParams()

  if (billQuery.isPending) {
    return null
  }

  if (countryQuery.isPending) {
    return null
  }

  if (stateQuery.isPending) {
    return null
  }

  if (billQuery.isError) {
    return null
  }

  if (countryQuery.isError) {
    return null
  }

  if (stateQuery.isError) {
    return null
  }

  const country_list = countryQuery.data.country_list
  const country = country_list.find(item => item.id === billQuery.data.country_id)
  const countryText = country?.name

  const country_state_list = stateQuery.data.country_state_list
  const state = country_state_list.find(item => item.id === billQuery.data.state_id)
  const stateText = state?.name

  return (
    <Card>
      <CardHeader
        title={t('Billing Address')}
        action={
          <Button LinkComponent={Link} href={`/${params.lang}/account-setting/address`} variant='contained'>
            {t('Edit Address')}
          </Button>
        }
      ></CardHeader>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <AddressTable>
              <AddressRow label='country'>{countryText}</AddressRow>
              <AddressRow label='state'>{stateText}</AddressRow>
              <AddressRow label='city'>{billQuery.data.city}</AddressRow>
              <AddressRow label='street'>{billQuery.data.street}</AddressRow>
              <AddressRow label='street2'>{billQuery.data.street2}</AddressRow>
            </AddressTable>
          </Grid>
          <Grid item xs={12} lg={6}>
            <AddressTable>
              <AddressRow label='full name'>{billQuery.data.full_name}</AddressRow>
              <AddressRow label='email'>{billQuery.data.email}</AddressRow>
              <AddressRow label='phone'>{billQuery.data.phone}</AddressRow>
              <AddressRow label='mobile'>{billQuery.data.mobile}</AddressRow>
            </AddressTable>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function AddressTable(props: React.PropsWithChildren) {
  return (
    <TableContainer>
      <Table size='small' sx={{ width: '95%' }}>
        <TableBody
          sx={{
            '& .MuiTableCell-root': {
              border: 0,
              pt: 2,
              pb: 2.5,
              pl: '0 !important',
              pr: '0 !important',
              '&:first-of-type': {
                width: 148
              }
            }
          }}
        >
          {props.children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function AddressRow(props: { children: React.ReactNode; label: React.ReactNode }) {
  const { children, label } = props

  const { t } = useTranslation()

  return (
    <TableRow>
      <TableCell>
        <Typography variant='subtitle2' sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
          {t(String(label))}
        </Typography>
      </TableCell>
      <TableCell>{children}</TableCell>
    </TableRow>
  )
}
