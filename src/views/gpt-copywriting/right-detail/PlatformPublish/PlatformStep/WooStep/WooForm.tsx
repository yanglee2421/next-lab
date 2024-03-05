import { DialogContentText, Box, Grid, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'

import { ItemText } from '@/components/form'
import { ItemTags } from '@components/form/ItemTags'
import { TinyMCE } from '@components/form/TinyMCE'
import type { FormValues } from './types'
import { useStep } from '../../StepContext'

export function WooForm() {
  const formCtx = useFormContext<FormValues>()

  const publishedController = useController({
    control: formCtx.control,
    name: 'published'
  })

  const descController = useController({
    control: formCtx.control,
    name: 'description'
  })

  const step = useStep()

  return (
    <>
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
      <Box height={300}>
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
            <ItemText name='image' label='Image Link' />
          </Grid>
          <Grid item xs={12}>
            <RadioGroup {...publishedController.field} row>
              <FormControlLabel label='published' control={<Radio />} value={true} />
              <FormControlLabel label='darft' control={<Radio />} value={false} />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <ItemTags name='keywords' />
          </Grid>

          <Grid item xs={12}>
            <TinyMCE {...descController.field} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
