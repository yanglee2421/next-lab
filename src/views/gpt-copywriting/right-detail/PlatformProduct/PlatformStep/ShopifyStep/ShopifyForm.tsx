import React from 'react'

import {
  DialogContentText,
  Box,
  Grid,
  TextField,
  DialogContent,
  DialogActions,
  MobileStepper,
  Button
} from '@mui/material'
import { ArrowBackOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

import { ItemText } from '@/components/form'
import { ItemTags } from '@components/form/ItemTags'
import { TinyMCE } from '@components/form/TinyMCE'
import { ScrollView } from '@/components/ui'
import { ShopifySubmit } from './ShopifySubmit'
import type { FormValues } from './types'
import { useStep } from '../../StepContext'

export function ShopifyForm() {
  const formCtx = useFormContext<FormValues>()

  const descController = useController({
    control: formCtx.control,
    name: 'description'
  })

  const step = useStep()

  return (
    <>
      <DialogContent
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          key={step.store?.shop_alias || step.store?.site_name}
          label='Store'
          defaultValue={step.store?.shop_alias || step.store?.site_name}
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mt: 2 }}
        />
        <DialogContentText variant='overline' mt={2}>
          Other Information
        </DialogContentText>
        <Box position={'relative'} flex={1} overflow={'hidden'}>
          <ScrollView>
            <Box paddingRight={4}>
              <Grid container spacing={6} mt={0}>
                <Grid item xs={12} sm={4}>
                  <ItemText name='product.title' label='Product' InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <ItemText name='title' label='Title' />
                </Grid>
                <Grid item xs={12}>
                  <ItemTags name='keywords' />
                </Grid>
                <Grid item xs={12}>
                  <TinyMCE {...descController.field} />
                </Grid>
              </Grid>
            </Box>
          </ScrollView>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box flex={1}>
          <MobileStepper
            steps={3}
            activeStep={2}
            position='static'
            variant='dots'
            backButton={
              <Button
                onClick={() => {
                  React.startTransition(() => {
                    step.setStep(p => p - 1)
                  })
                }}
                variant='outlined'
                startIcon={<ArrowBackOutlined />}
              >
                previous
              </Button>
            }
            nextButton={<ShopifySubmit></ShopifySubmit>}
            sx={{ backgroundColor: 'transparent', userSelect: 'none' }}
          />
        </Box>
      </DialogActions>
    </>
  )
}
