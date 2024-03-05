import React from 'react'

import type {
  PaperProps,
  Theme} from '@mui/material';
import {
  Paper,
  Grid,
  MenuItem,
  Stack,
  Button,
  FormControlLabel,
  Box,
  Collapse,
  useMediaQuery,
  IconButton
} from '@mui/material'
import { SyncAltOutlined, SyncOutlined, ExpandMoreOutlined, ExpandLessOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { WoolworldsShopSelect } from './WoolworldsShopSelect'
import { InputSwitch, InputInt } from '@/components/form'
import type { Row } from '@/api/api-stg/connection_my_connections'

export function WoolworldsForm(props: WoolworldsFormProps) {
  const {
    woolworldsShops,
    selection,
    hasRow,
    onSyncAll,
    onSyncSelected,
    syncAllPending,
    syncSelectedPending,
    ...restProps
  } = props

  const formCtx = useForm<FormValues>({
    defaultValues: {
      site_connection_id_target: String(woolworldsShops.at(0)?.connection_id || ''),
      language: 'en',
      month_sold_threshold: 300,
      is_publish: true,
      is_refresh: true,
      is_detect_main_images: false,
      is_detect_description_images: false,
      synced_product_count_per_page: 10,
      synced_total_product_count: 0
    },

    resolver: zodResolver(schema)
  })

  const [collapsed, setCollapsed] = React.useState(true)

  const syncSelectedId = React.useId()
  const syncAllId = React.useId()

  const extraSmallScreen = useMediaQuery<Theme>(theme => {
    return theme.breakpoints.down('sm')
  })

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
              onSyncAll(data)
              break
            case syncSelectedId:
              onSyncSelected(data)
              break
            default:
          }
        },
        error => {
          console.error(error)
          setCollapsed(true)
        }
      )}
      sx={{ padding: 3 }}
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <WoolworldsShopSelect>
                {woolworldsShops.map(item => {
                  return (
                    <MenuItem key={item.connection_id} value={String(item.connection_id)}>
                      {item.shop_alias || item.site_name}
                    </MenuItem>
                  )
                })}
              </WoolworldsShopSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputInt name='month_sold_threshold' size='small' label='Monthly Sold Threshold'></InputInt>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<InputSwitch name='is_publish'></InputSwitch>}
                label='Is Publish'
                sx={{ minHeight: 40 }}
              ></FormControlLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<InputSwitch name='is_refresh'></InputSwitch>}
                label='Is Refresh'
                sx={{ minHeight: 40 }}
              ></FormControlLabel>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<InputSwitch name='is_detect_main_images'></InputSwitch>}
                label='Is Detect Main Images'
                sx={{ minHeight: 40 }}
              ></FormControlLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<InputSwitch name='is_detect_description_images'></InputSwitch>}
                label='Is Detect Description Images'
                sx={{ minHeight: 40 }}
              ></FormControlLabel>
            </Grid>
          </Grid>
        </Box>

        {extraSmallScreen ? (
          <Grid container spacing={3} marginTop={0}>
            <Grid item xs={12} md={6}>
              <InputInt
                name='synced_product_count_per_page'
                size='small'
                label='Synced Product Count per Page'
              ></InputInt>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputInt name='synced_total_product_count' size='small' label='Synced Total Product Count'></InputInt>
            </Grid>
          </Grid>
        ) : (
          <Collapse in={!collapsed}>
            <Grid container spacing={3} marginTop={0}>
              <Grid item xs={12} md={6}>
                <InputInt
                  name='synced_product_count_per_page'
                  size='small'
                  label='Synced Product Count per Page'
                ></InputInt>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputInt name='synced_total_product_count' size='small' label='Synced Total Product Count'></InputInt>
              </Grid>
            </Grid>
          </Collapse>
        )}

        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'} marginTop={3}>
          <Button
            disabled={!selection.length || syncSelectedPending}
            type='submit'
            id={syncSelectedId}
            variant='outlined'
            size='small'
            startIcon={<SyncAltOutlined></SyncAltOutlined>}
          >
            sync selected
          </Button>
          <Button
            disabled={!hasRow || syncAllPending}
            type='submit'
            id={syncAllId}
            variant='outlined'
            size='small'
            startIcon={<SyncOutlined></SyncOutlined>}
          >
            sync all
          </Button>
          {extraSmallScreen || (
            <IconButton
              onClick={() => {
                setCollapsed(p => !p)
              }}
              size='small'
              sx={{ ml: 'auto' }}
            >
              {collapsed ? (
                <ExpandMoreOutlined fontSize='small'></ExpandMoreOutlined>
              ) : (
                <ExpandLessOutlined fontSize='small'></ExpandLessOutlined>
              )}
            </IconButton>
          )}
        </Stack>
      </FormProvider>
    </Paper>
  )
}

export type WoolworldsFormProps = PaperProps & {
  woolworldsShops: Row[]
  selection: Array<string | number>
  hasRow?: boolean
  onSyncSelected(data: FormValues): void
  onSyncAll(data: FormValues): void
  syncSelectedPending: boolean
  syncAllPending: boolean
}

const schema = z.object({
  // product_ids: z.number().int().array().nonempty(),
  site_connection_id_target: z.string().min(1, { message: 'required' }),
  language: z.string(),
  month_sold_threshold: z.number().int().positive(),
  is_publish: z.boolean(),
  is_refresh: z.boolean(),
  is_detect_main_images: z.boolean(),
  is_detect_description_images: z.boolean(),
  synced_product_count_per_page: z.number().int().positive(),
  synced_total_product_count: z.number().int()
})

type FormValues = z.infer<typeof schema>
