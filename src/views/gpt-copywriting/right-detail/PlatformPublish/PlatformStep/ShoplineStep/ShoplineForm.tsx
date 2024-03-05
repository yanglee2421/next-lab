import React from 'react'

import {
  DialogContentText,
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import { ShoplineSubmit } from './ShoplineSubmit'
import type { FormValues } from './types'
import { useStep } from '../../StepContext'
import { ScrollView } from '@/components/ui'

export function ShoplineForm() {
  const step = useStep()

  const formCtx = useFormContext<FormValues>()

  const publishedController = useController({
    control: formCtx.control,
    name: 'published'
  })

  const descController = useController({
    control: formCtx.control,
    name: 'content_html'
  })

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
                <Grid item xs={12} sm={6}>
                  <ItemText name='blog.title' label='Blog Collection' InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ItemText name='title' label='Blog Title' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ItemText name='author' label='Author' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ItemText name='image_link' label='Image Link' />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup {...publishedController.field} row>
                    <FormControlLabel label='published' control={<Radio />} value={true} />
                    <FormControlLabel label='darft' control={<Radio />} value={false} />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <ItemTags name='tags' />
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
            activeStep={step.step}
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
            nextButton={<ShoplineSubmit></ShoplineSubmit>}
            sx={{ backgroundColor: 'transparent', userSelect: 'none' }}
          />
        </Box>
      </DialogActions>
    </>
  )
}
