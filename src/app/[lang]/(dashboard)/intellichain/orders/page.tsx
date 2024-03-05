'use client'

import React from 'react'

import { Box, Button, Collapse, Grid, Paper, Stack, IconButton } from '@mui/material'
import {
  RefreshOutlined,
  SearchOutlined,
  ReplayOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { useImmer } from 'use-immer'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm, FormProvider } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { ItemText } from '@/components/form'

export default function OrdersPage() {
  const [state, updateState] = useImmer<{
    collapsed: boolean
  }>({
    collapsed: true
  })

  const formCtx = useForm<FormValues>({
    defaultValues: {
      startDate: null,
      endDate: null,
      orderId: '',
      productTitle: '',
      recipient: '',
      recipientPhone: ''
    },

    resolver: zodResolver(schema)
  })

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormProvider {...formCtx}>
            <Paper
              component={'form'}
              onSubmit={formCtx.handleSubmit(
                data => {
                  console.log(data)
                },
                error => {
                  console.error(error)
                  updateState(state => {
                    state.collapsed = false
                  })
                }
              )}
              onReset={() => {
                formCtx.reset()
              }}
              sx={{ padding: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ItemText name='orderId' size='small' label='Order ID'></ItemText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemText name='productTitle' size='small' label='Product Title'></ItemText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemText name='recipient' size='small' label='Recipient'></ItemText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemText name='recipientPhone' size='small' label='Recipient Phone'></ItemText>
                </Grid>
              </Grid>

              <Collapse in={!state.collapsed}>
                <Grid container spacing={3} marginTop={0}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}></Grid>
                </Grid>
              </Collapse>

              <Stack direction={'row'} gap={3} flexWrap={'wrap'} alignItems={'center'} marginTop={3}>
                <Button
                  type='submit'
                  disabled={formCtx.formState.isSubmitting}
                  size='small'
                  variant='contained'
                  startIcon={<SearchOutlined></SearchOutlined>}
                >
                  search
                </Button>
                <Button type='reset' size='small' variant='outlined' startIcon={<ReplayOutlined></ReplayOutlined>}>
                  reset
                </Button>
                <Button size='small' variant='outlined' startIcon={<RefreshOutlined></RefreshOutlined>}>
                  refresh
                </Button>
                <IconButton
                  onClick={() => {
                    updateState(state => {
                      state.collapsed = !state.collapsed
                    })
                  }}
                  size='small'
                  sx={{ ml: 'auto' }}
                >
                  {state.collapsed ? (
                    <ExpandMoreOutlined fontSize='small'></ExpandMoreOutlined>
                  ) : (
                    <ExpandLessOutlined fontSize='small'></ExpandLessOutlined>
                  )}
                </IconButton>
              </Stack>
            </Paper>
          </FormProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>

            <Collapse>
              <Grid container spacing={3} marginTop={0}>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}></Grid>
              </Grid>
            </Collapse>

            <Stack direction={'row'} gap={3} marginTop={3}></Stack>
          </Paper>
        </Grid>
      </Grid>
      <Paper sx={{ height: 780, marginTop: 6 }}>
        <DataGrid
          columns={[
            {
              field: 'order',
              flex: 1
            },
            {
              field: 'Product',
              flex: 1
            },
            {
              field: 'Trading',
              flex: 1
            },
            {
              field: 'Buyer',
              flex: 1
            },
            {
              field: 'Recipient',
              flex: 1
            }
          ]}
          rows={[]}
        ></DataGrid>
      </Paper>
    </Box>
  )
}

const schema = z.object({
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  orderId: z.string(),
  productTitle: z.string(),
  recipient: z.string(),
  recipientPhone: z.string()
})

type FormValues = z.infer<typeof schema>
