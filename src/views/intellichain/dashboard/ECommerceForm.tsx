import React from 'react'

import type { PaperProps } from '@mui/material'
import {
  Paper,
  Grid,
  MenuItem,
  Stack,
  Button,
  FormControlLabel,
  Switch,

  // Collapse,
  // IconButton,
  FormControl,
  RadioGroup,
  Radio,
  FormHelperText,
  InputAdornment
} from '@mui/material'
import {
  SyncAltOutlined,
  SyncOutlined

  // ExpandLessOutlined,
  // ExpandMoreOutlined,
} from '@mui/icons-material'
import { useForm, FormProvider, useController, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { toast } from 'react-toastify'

import type { UseQueryResult } from '@tanstack/react-query'

import { ECommerceShopSelect } from './ECommerceShopSelect'
import { InputNumber } from '@/components/form'
import { CollectionSelect } from './CollectionSelect'
import { CurrencySelect } from './CurrencySelect'
import type { Row } from '@/api/api-stg/connection_my_connections'
import { useExportToEc } from '@/hooks/api-nuwa/useExportToEc'
import type { Res } from './type'

export function ECommerceForm(props: ECommerceFormProps) {
  const { eCommerceShops, selection, query, ...restProps } = props

  const formCtx = useForm<FormValues>({
    defaultValues: {
      eCommerceShop: String(eCommerceShops.at(0)?.connection_id || ''),
      isPublish: true,
      price_method: 1,
      collection_id: 0,
      price_value: 20,

      // exchange_rate: 1,
      target_currency: ''
    },

    resolver: zodResolver(schema)
  })

  const controller = useController({
    control: formCtx.control,
    defaultValue: true,
    name: 'isPublish'
  })

  const price_methodController = useController({
    control: formCtx.control,
    name: 'price_method',
    defaultValue: 1
  })

  const target_currency = useWatch({
    control: formCtx.control,
    name: 'target_currency'
  })

  const [collapsed, setCollapsed] = React.useState(true)

  void collapsed

  const syncSelectedId = React.useId()
  const syncAllId = React.useId()

  const selectedMutation = useExportToEc()

  return (
    <Paper
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        (data, evt) => {
          if (!(evt?.nativeEvent instanceof SubmitEvent)) {
            return
          }

          switch (evt.nativeEvent.submitter?.id) {
            case syncAllId:
              return new Promise<void>(resolve => {
                selectedMutation.mutate(
                  {
                    data: {
                      collection_id: data.collection_id || void 0,
                      is_published: data.isPublish,
                      price_method: data.price_method,
                      price_value: data.price_value,

                      // exchange_rate: data.exchange_rate,
                      product_ids: query.data?.product_list.map(item => item.id) || [],
                      target_currency: data.target_currency
                    },
                    headers: {
                      'site-connection-id': data.eCommerceShop
                    }
                  },
                  {
                    onSettled() {
                      resolve()
                    },
                    onError(error) {
                      toast.error(error.message)
                    },
                    onSuccess() {
                      toast.success('Submit successlly!')
                    }
                  }
                )
              })
            case syncSelectedId:
              return new Promise<void>(resolve => {
                selectedMutation.mutate(
                  {
                    data: {
                      collection_id: data.collection_id || void 0,
                      is_published: data.isPublish,
                      price_method: data.price_method,
                      price_value: data.price_value,

                      // exchange_rate: data.exchange_rate,
                      product_ids: selection.map(Number),
                      target_currency: data.target_currency
                    },
                    headers: {
                      'site-connection-id': data.eCommerceShop
                    }
                  },
                  {
                    onSettled() {
                      resolve()
                    },
                    onError(error) {
                      toast.error(error.message)
                    },
                    onSuccess() {
                      toast.success('Submit successlly!')
                    }
                  }
                )
              })
            default:
              console.log('error')
          }
        },
        error => {
          console.error(error)
          setCollapsed(false)
        }
      )}
      sx={{ padding: 3 }}
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ECommerceShopSelect>
              {eCommerceShops.map(item => {
                return (
                  <MenuItem key={item.connection_id} value={String(item.connection_id)}>
                    {item.shop_alias || item.site_name}
                  </MenuItem>
                )
              })}
            </ECommerceShopSelect>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              {...controller.field}
              checked={controller.field.value}
              onChange={(evt, checked) => {
                void evt
                controller.field.onChange(checked)
              }}
              control={<Switch size='small'></Switch>}
              label='Is Publish'
              sx={{ minHeight: 40 }}
            ></FormControlLabel>
          </Grid>

          <Grid item xs={12} md={6}>
            <CollectionSelect></CollectionSelect>
          </Grid>

          <Grid item xs={12} md={6}>
            <CurrencySelect></CurrencySelect>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputNumber
              name='price_value'
              size='small'
              label='Increase Price'
              InputProps={{
                endAdornment: (() => {
                  switch (price_methodController.field.value) {
                    case 1:
                      return <InputAdornment position='end'>%</InputAdornment>
                    case 2:
                      if (target_currency) {
                        return <InputAdornment position='end'>{target_currency}</InputAdornment>
                      }

                      return void 0
                    default:
                      return void 0
                  }
                })()
              }}
            ></InputNumber>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <RadioGroup
                {...price_methodController.field}
                value={String(price_methodController.field.value)}
                onChange={(evt, v) => {
                  void evt
                  price_methodController.field.onChange(Number(v))
                }}
                row
              >
                <FormControlLabel
                  control={<Radio size='small'></Radio>}
                  label='percent'
                  value={String(1)}
                ></FormControlLabel>
                <FormControlLabel
                  control={<Radio size='small'></Radio>}
                  label='fixed amount'
                  value={String(2)}
                ></FormControlLabel>
              </RadioGroup>
              {
                <FormHelperText error={!!price_methodController.fieldState.error}>
                  {price_methodController.fieldState.error?.message}
                </FormHelperText>
              }
            </FormControl>
          </Grid>
        </Grid>

        {/* <Collapse in={!collapsed}>
          <Grid container spacing={3} marginTop={0}>
            <Grid item xs={12} md={6}>
              <InputNumber
                name="exchange_rate"
                size="small"
                label="Exchange Rate"
              ></InputNumber>
            </Grid>
          </Grid>
        </Collapse> */}

        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'} marginTop={3}>
          <Button
            type='submit'
            id={syncSelectedId}
            disabled={!selection.length || formCtx.formState.isSubmitting}
            variant='outlined'
            size='small'
            startIcon={<SyncAltOutlined></SyncAltOutlined>}
          >
            sync selected
          </Button>
          <Button
            type='submit'
            id={syncAllId}
            disabled={!query.data || formCtx.formState.isSubmitting}
            variant='outlined'
            size='small'
            startIcon={<SyncOutlined></SyncOutlined>}
          >
            sync all
          </Button>
          {/* <IconButton
            onClick={() => {
              setCollapsed((p) => !p);
            }}
            size="small"
            sx={{ ml: "auto" }}
          >
            {collapsed ? (
              <ExpandMoreOutlined fontSize="small"></ExpandMoreOutlined>
            ) : (
              <ExpandLessOutlined fontSize="small"></ExpandLessOutlined>
            )}
          </IconButton> */}
        </Stack>
      </FormProvider>
    </Paper>
  )
}

export type ECommerceFormProps = PaperProps & {
  eCommerceShops: Row[]
  selection: Array<string | number>
  query: UseQueryResult<Res>
}

const schema = z.object({
  eCommerceShop: z.string().min(1),
  isPublish: z.boolean(),
  price_method: z.literal(1).or(z.literal(2)),
  collection_id: z.number(),
  price_value: z.number().positive(),

  // exchange_rate: z.number().positive(),
  target_currency: z.string()
})

export type FormValues = z.infer<typeof schema>
