import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { LoadingButton } from '@mui/lab'

import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { useGetPayment } from '@/hooks/api-stg/useGetPayment'
import { usePreAddPayment } from '@/hooks/api-erp/usePreAddPayment'
import { usePayTokenDel } from '@/hooks/api-erp/usePayTokenDel'
import type { Payment_tokens } from '@/api/api-erp/get_payment_token'

export function CardPayment() {
  const query = useGetPayment()
  const mutation = usePreAddPayment()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader
        title={t('Payment Methods')}
        action={
          <LoadingButton
            onClick={() => mutation.mutate()}
            loading={mutation.isPending}
            variant='contained'
            startIcon={<AddOutlined></AddOutlined>}
            sx={{ '& svg': { mr: 1 } }}
          >
            {t('add card')}
          </LoadingButton>
        }
      ></CardHeader>
      <CardContent>
        {(() => {
          if (query.isPending) {
            return null
          }

          if (query.isError) {
            return null
          }

          if (!query.data.payment_tokens.length) {
            return 'Empty'
          }

          return query.data.payment_tokens.map((item, index) => {
            return (
              <CardPaymentItem
                key={index}
                isLast={index === query.data.payment_tokens.length - 1}
                item={item}
              ></CardPaymentItem>
            )
          })
        })()}
      </CardContent>
    </Card>
  )
}

export interface DataType {
  name: string
  imgSrc: string
  imgAlt: string
  cardCvc: string
  expiryDate: string
  cardNumber: string
  cardStatus?: string
}

export function CardPaymentItem(props: CardPaymentItemProps) {
  const { item, isLast } = props

  const mutation = usePayTokenDel()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        borderRadius: 1,
        flexDirection: ['column', 'row'],
        justifyContent: ['space-between'],
        alignItems: ['flex-start', 'center'],
        mb: isLast ? void 0 : 4,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <div>
        <Box
          sx={{
            mt: 1,
            mb: 2.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{item.payment_token_id}</Typography>
        </Box>
        <Typography variant='body2'>**** **** **** {item.payment_details}</Typography>
      </div>

      <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
        <LoadingButton
          onClick={() => {
            mutation.mutate(item.payment_token_id)
          }}
          loading={mutation.isPending}
          variant='outlined'
          color='secondary'
        >
          {t('delete')}
        </LoadingButton>
      </Box>
    </Box>
  )
}

export interface CardPaymentItemProps {
  item: Payment_tokens
  isLast?: boolean
}
