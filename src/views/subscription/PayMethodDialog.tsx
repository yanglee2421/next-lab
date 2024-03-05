'use client'

import type {
  DialogProps
} from '@mui/material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  RadioGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Radio
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm, FormProvider, useController } from 'react-hook-form'

import { useGetPayment } from '@/hooks/api-stg/useGetPayment'
import { ErrorAlert } from '@/components/ui'
import { useNewSubscriptionMake } from '@/hooks/api-stg/useNewSubscriptionMake'
import { SkeletonList } from '@components/ui/SkeletonList'
import { usePreAddPayment } from '@/hooks/api-erp/usePreAddPayment'

export function PayMethodDialog(props: Props) {
  const { planId, onClose, ...restProps } = props

  const formCtx = useForm({
    defaultValues: {
      payment_token_id: 0
    }
  })

  const controller = useController({
    control: formCtx.control,
    name: 'payment_token_id',
    defaultValue: 0
  })

  const query = useGetPayment()
  const mutation = useNewSubscriptionMake()
  const addPayMutation = usePreAddPayment()

  const handleCancel = () => {
    mutation.reset()
    onClose?.({}, 'backdropClick')
  }

  return (
    <Dialog
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        data => {
          mutation.mutate(
            {
              payment_token_id: data.payment_token_id,
              product_id: planId,
              force_cancel_old_subscription: true
            },
            {
              onSuccess() {
                onClose?.({}, 'backdropClick')
              }
            }
          )
        },
        error => {
          console.error(error)
        }
      )}
      fullWidth
      {...restProps}
    >
      <DialogTitle>Please select the bank card used for payment</DialogTitle>
      <DialogContent>
        <FormProvider {...formCtx}>
          {(() => {
            if (query.isPending) {
              return <SkeletonList></SkeletonList>
            }

            if (query.isError) {
              return <ErrorAlert titleNode={'Fetch data failed'}>{query.error.message}</ErrorAlert>
            }

            if (query.data.payment_tokens.length) {
              return (
                <RadioGroup
                  {...controller.field}
                  value={String(controller.field.value)}
                  onChange={(evt, value) => {
                    void evt
                    controller.field.onChange(Number(value))
                  }}
                >
                  <List sx={{ height: 360 }}>
                    {query.data.payment_tokens.map(item => {
                      return (
                        <ListItemButton key={item.payment_token_id} component='label'>
                          <ListItemAvatar>
                            <Radio name='payment_token_id' value={String(item.payment_token_id)}></Radio>
                          </ListItemAvatar>
                          <ListItemText>**** **** **** {item.payment_details}</ListItemText>
                        </ListItemButton>
                      )
                    })}
                  </List>
                </RadioGroup>
              )
            }

            return (
              <Button
                onClick={() => {
                  addPayMutation.mutate()
                }}
                variant='contained'
              >
                add card
              </Button>
            )
          })()}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Box display={'flex'} gap={2} justifyContent={'center'} width={'100%'}>
          <Button onClick={handleCancel} variant='outlined' color='secondary'>
            cancel
          </Button>
          <LoadingButton
            type='submit'
            loading={mutation.isPending}
            disabled={!controller.field.value}
            variant='contained'
          >
            confirm
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

type Props = DialogProps & {
  planId: number
  open: boolean
}
