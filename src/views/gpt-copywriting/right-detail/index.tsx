import React from 'react'

import { Box, Card, CardActions, CardContent, CardHeader, Typography, Skeleton, Alert, AlertTitle } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { ArticleDetail } from './article-detail'
import { DetailLink } from '../components'
import { PlatformPublish } from './PlatformPublish'
import { PlatformProduct } from './PlatformProduct'
import { ScrollView } from '@/components/ui'
import { useTaskDetail } from '@/hooks/api-nlp/useTaskDetail'


export function RightDetail() {
  const { t } = useTranslation()
  const detailQuery = useTaskDetail()

  if (detailQuery.isPending) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader title={'Loading...'} />
        <CardContent>
          <Typography variant='h3'>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton animation='wave' />
          </Typography>
          <Typography variant='caption'>
            <Skeleton animation={false} />
          </Typography>
        </CardContent>
      </Card>
    )
  }

  if (detailQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch detail failed</AlertTitle>
        {detailQuery.error.message}
      </Alert>
    )
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardHeader title={t('Detail')} action={<DetailLink></DetailLink>}></CardHeader>

      <CardContent
        sx={{
          flex: 1,
          overflow: 'hidden'
        }}
      >
        <ScrollView>
          <ArticleDetail
            description={detailQuery.data.output.description || ''}
            title={detailQuery.data.output.title || ''}
            keywords={detailQuery.data.output.keywords || []}
            showCopy
          ></ArticleDetail>
        </ScrollView>
      </CardContent>

      <CardActions>
        <Box display={'flex'} justifyContent={'center'} gap={4} width={'100%'}>
          <PlatformPublish data={detailQuery.data} />
          <PlatformProduct data={detailQuery.data} />
        </Box>
      </CardActions>
    </Card>
  )
}
