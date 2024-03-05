import React from 'react'

import { useSearchParams } from 'next/navigation'

import type { ListProps} from '@mui/material';
import { List, Backdrop, CircularProgress, Box, Typography, Alert } from '@mui/material'

import { useFormContext, useWatch } from 'react-hook-form'

import { ProductListItem } from './item'
import { PagiBtn } from './pagi-btn'
import { ScrollView } from '@/components/ui'
import { useShoplineProductSearch } from '@/hooks/api-stg/useShoplineProductSearch'


export function ProductList(props: ProductListProps) {
  const { ...restProps } = props

  const formCtx = useFormContext()

  const [title, page_info, page_limit, collection_id] = useWatch({
    control: formCtx.control,
    name: ['title', 'page_info', 'page_limit', 'collection_id']
  })

  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')

  const query = useShoplineProductSearch({
    title,
    page_info,
    page_limit,
    collection_id,
    site_connection_id: Number(connection_id)
  })

  return (
    <>
      <Box display={'flex'} gap={4} justifyContent={'space-between'} my={4}>
        <Typography variant='h6'>Product</Typography>
        <PagiBtn name='page_info' prev={query.data?.pagination?.previous} next={query.data?.pagination?.next} />
      </Box>
      <Box position={'relative'} overflow={'hidden'} height={{ xs: 252, md: 420 }}>
        <ScrollView>
          <List {...restProps}>
            {(() => {
              if (query.isPending) {
                return null
              }

              if (query.isError) {
                return query.error.cause ? <Alert severity='error'>{query.error.message}</Alert> : null
              }

              if (!query.data.products.length) {
                return <Alert severity='info'>Could not find any products</Alert>
              }

              return query.data.products.map(item => {
                return (
                  <ProductListItem
                    key={item.id}
                    itemData={{
                      ...item,
                      body_html: item.body_html || '',
                      tags: item.tags || '',
                      image: item.image || ''
                    }}
                  />
                )
              })
            })()}
          </List>
        </ScrollView>

        <Backdrop
          open={query.isFetching}
          sx={{
            position: 'absolute',
            color: 'common.white',
            zIndex(theme) {
              return theme.zIndex.mobileStepper - 1
            }
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Box>
    </>
  )
}

export type ProductListProps = ListProps
