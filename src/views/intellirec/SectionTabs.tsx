import React from 'react'

import { Box, Grid, Paper, Stack } from '@mui/material'

import { StoreSelect } from './StoreSelect'
import { InitForm } from './InitForm'
import { Accordions } from './Accordions'

export function SectionTabs() {
  return (
    <Stack spacing={6} mt={3}>
      <Paper sx={{ p: 3 }}>
        <StoreSelect />
      </Paper>

      <Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <InitForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Accordions />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}
