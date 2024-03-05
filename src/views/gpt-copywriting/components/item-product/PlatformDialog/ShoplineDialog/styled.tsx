import React from 'react'

import type { IconButtonProps} from '@mui/material';
import { DialogContent, IconButton, Box, Typography, styled } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'


export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  position: 'relative',
  pr: [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
  pl: [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
  pt: [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
  pb: [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`]
}))

export function CloseBtn(props: IconButtonProps) {
  return (
    <IconButton {...props} size='small' sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
      <CloseOutlined></CloseOutlined>
    </IconButton>
  )
}

export function DialogHeader() {
  return (
    <Box sx={{ mb: 5, textAlign: 'center' }}>
      <Typography variant='h5' sx={{ mb: 3 }}>
        Select Product
      </Typography>
      <Typography variant='body2'>Select products from connected platforms.</Typography>
    </Box>
  )
}
