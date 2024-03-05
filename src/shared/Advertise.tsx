import type { BoxProps} from '@mui/material';
import { Box, Grid, Paper, Typography } from '@mui/material'

import {
  AiBusinessAnalytics,
  ECommerceErp,
  IntelligentRecommendations,
  NlpAiTechnology,
  VisuallySimliarSearch
} from '@/components/logo'

export function Advertise(props: Props) {
  return (
    <Box height={'100%'} {...props}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <VisuallySimliarSearch width={96}></VisuallySimliarSearch>
            <Typography fontWeight={600}>Visual AI Technology</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <NlpAiTechnology width={96}></NlpAiTechnology>
            <Typography fontWeight={600}>NLP AI Technology</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <IntelligentRecommendations width={96}></IntelligentRecommendations>
            <Typography fontWeight={600}>Recommendation Systems</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <AiBusinessAnalytics width={96}></AiBusinessAnalytics>
            <Typography fontWeight={600}>AIGC Data Analytics</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <ECommerceErp width={96}></ECommerceErp>
            <Typography fontWeight={600}>eCommerce AI Platform</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

type Props = BoxProps
