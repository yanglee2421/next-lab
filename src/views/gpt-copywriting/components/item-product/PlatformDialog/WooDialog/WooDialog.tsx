import React from 'react'

import { useSearchParams } from 'next/navigation'

import type { Theme } from '@mui/material';
import { Box, Button, Dialog, DialogActions, Typography, Grid, useMediaQuery } from '@mui/material'


import { useFormContext, useController, useForm, FormProvider } from 'react-hook-form'

import { DialogContentStyled, CloseBtn, DialogHeader } from './styled'
import { TreeList } from './tree-list'
import { ProductList } from './product-list'
import { SearchForm } from './search-form'
import type { FormValues } from './types'


export function WooDialog() {
  const { control } = useFormContext()

  const { field } = useController({
    control,
    name: 'product',
    defaultValue: []
  })

  const searchParams = useSearchParams()

  const formCtx = useForm<FormValues>({
    defaultValues: {
      page: 1,
      page_limit: 20,

      title: '',
      collection_id: '',

      checkeds: field.value
    }
  })

  const [open, setOpen] = React.useState(false)

  const closeHandler = () => {
    formCtx.reset()
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const isSmall = useMediaQuery<Theme>(theme => {
    return theme.breakpoints.down('md')
  })

  return (
    <FormProvider {...formCtx}>
      <Button onClick={handleOpen} sx={{ textTransform: 'none' }}>
        {searchParams.get('shop_alias') || searchParams.get('site_name')}
      </Button>
      <Dialog fullScreen={isSmall} fullWidth open={open} maxWidth='md' onClose={closeHandler}>
        <DialogContentStyled>
          <CloseBtn onClick={closeHandler} />
          <DialogHeader />
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography variant='h6' mb={4}>
                Category
              </Typography>
              <TreeList />
            </Grid>
            <Grid item xs={12} md={8} overflow={'hidden'}>
              <SearchForm />
              <ProductList />
            </Grid>
          </Grid>
        </DialogContentStyled>
        <DialogActions>
          <Box display={'flex'} gap={4}>
            <Button onClick={closeHandler} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const nextCheckeds = formCtx.getValues().checkeds

                field.onChange([...nextCheckeds])
                closeHandler()
              }}
              variant='contained'
            >
              Confrim
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </FormProvider>
  )
}
