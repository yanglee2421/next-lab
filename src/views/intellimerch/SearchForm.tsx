import React from 'react'

import type { PaperProps } from '@mui/material'
import { Grid, Paper, Stack, Button, IconButton } from '@mui/material'
import {
  ExpandMoreOutlined,
  ExpandLessOutlined,
  SearchOutlined,
  RefreshOutlined,
  ReplayOutlined
} from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ECommerceShopSelect } from './ECommerceShopSelect'
import { ItemText } from '@/components/form'
import { CategoryAutocomplete } from './CategoryAutocomplete'

export function SearchForm(props: Props) {
  const { onSearchSubmit, ...restProps } = props

  const formCtx = useForm<FormValues>({
    defaultValues: {
      title: '',
      categoryId: '',
      siteConnectionId: '',
      siteType: 0
    },

    resolver: zodResolver(schema)
  })

  const [collapsed, setCollapesd] = React.useState(true)

  return (
    <Paper
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        data => {
          React.startTransition(() => {
            onSearchSubmit(data)
          })
        },
        error => {
          console.warn(error)
        }
      )}
      onReset={() => {
        formCtx.reset()
      }}
      sx={{ padding: 3 }}
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ECommerceShopSelect />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryAutocomplete />
          </Grid>
          <Grid item xs={12} md={6}>
            <ItemText name='title' label='Title' size='small' autoComplete='off'></ItemText>
          </Grid>
        </Grid>

        {/* <Collapse in={!collapsed}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Collapse> */}

        <Stack direction={'row'} flexWrap={'wrap'} gap={3} marginTop={3}>
          <Button type='submit' variant='contained' size='small' startIcon={<SearchOutlined></SearchOutlined>}>
            search
          </Button>
          <Button type='reset' variant='outlined' size='small' startIcon={<ReplayOutlined></ReplayOutlined>}>
            reset
          </Button>
          <Button variant='outlined' size='small' startIcon={<RefreshOutlined />}>
            refresh
          </Button>
          <IconButton
            onClick={() => {
              setCollapesd(p => !p)
            }}
            size='small'
            sx={{ ml: 'auto', visibility: 'hidden' }}
          >
            {collapsed ? <ExpandMoreOutlined fontSize='small' /> : <ExpandLessOutlined fontSize='small' />}
          </IconButton>
        </Stack>
      </FormProvider>
    </Paper>
  )
}

const schema = z.object({
  title: z.string(),
  categoryId: z.string(),
  siteConnectionId: z.string().min(1),
  siteType: z.number()
})

export type FormValues = z.infer<typeof schema>

type Props = PaperProps & {
  onSearchSubmit(data: FormValues): void
}
