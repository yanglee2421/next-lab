import { Grid } from '@mui/material'

import { ItemText } from '@/components/form'

export function SearchForm() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ItemText name='title' label='Title' size='small' type='search' autoComplete='off' />
        </Grid>
      </Grid>
    </>
  )
}
