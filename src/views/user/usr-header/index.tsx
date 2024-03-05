import { Card, CardMedia } from '@mui/material'

import { CaBody } from './ca-body'

export function UsrHeader() {
  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image='/images/pages/profile-banner.png'
        sx={{ height: { xs: 150, md: 250 } }}
      ></CardMedia>
      <CaBody></CaBody>
    </Card>
  )
}
