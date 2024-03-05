import React from 'react'

import { Box, FormControl, Grid } from '@mui/material'


import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ItemCheck } from '@/components/ItemCheck'

import { ItemNumber } from '@components/ItemNumber'

export function ItemGenerate() {
  const { t } = useTranslation()
  const formCtx = useFormContext()

  const [isTitle, isDesc] = useWatch({
    name: ['isTitle', 'isDesc'],
    control: formCtx.control
  })

  return (
    <>
      <FormControl fullWidth>
        <Box display={'flex'} flexWrap={'wrap'}>
          <ItemCheck name='isTitle' label={t('Title')} />
          <ItemCheck name='isDesc' label={t('Description')} />
          <ItemCheck name='isKeywords' label={t('Keywords')} />
        </Box>
      </FormControl>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isTitle && <ItemNumber name={'titleLimit'} label={t('Title')} placeholder='20' />}
        </Grid>
        <Grid item xs={12}>
          {isDesc && <ItemNumber name={'descLimit'} label='Description' placeholder='300' />}
        </Grid>
      </Grid>
    </>
  )
}
