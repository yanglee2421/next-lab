import React from 'react'

import { Grid, FormHelperText } from '@mui/material'

import { useController, useFormContext } from 'react-hook-form'

import { BtnGroupSplit } from './btn-group-split'
import { EmptyIcon } from './empty-icon'
import { EmptyText } from './empty-text'
import { ChipItem } from './chip-item'


export function ItemProduct(props: ItemProductProps) {
  // ** Props
  const { name } = props

  const formCtx = useFormContext()

  const fieldController = useController({
    name,
    control: formCtx.control,
    defaultValue: []
  })

  return (
    <>
      <Grid container spacing={6} mb={2}>
        {(() => {
          const value = fieldController.field.value

          if (!value?.length) {
            return [
              <Grid key='empty-icon' item xs={12} display={'flex'} justifyContent={'center'}>
                <EmptyIcon />
              </Grid>,
              <Grid key='empty-text' item xs={12}>
                <EmptyText />
              </Grid>
            ]
          }

          return (
            <Grid item xs={12} minHeight={160}>
              <Grid container spacing={3}>
                {value.map((item: { id: string; title: string }) => {
                  return <ChipItem key={item.id} label={item.title} id={item.id} />
                })}
              </Grid>
            </Grid>
          )
        })()}
        <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <BtnGroupSplit key={JSON.stringify(fieldController.field.value)} />
          {fieldController.fieldState.error && (
            <FormHelperText error>{fieldController.fieldState.error.message}</FormHelperText>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export interface ItemProductProps {
  name: string
}
