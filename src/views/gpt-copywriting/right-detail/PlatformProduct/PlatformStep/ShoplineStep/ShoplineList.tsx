import React from 'react'

import {
  List,
  ListItemButton,
  Radio,
  ListItemText,
  Box,
  RadioGroup,
  TextField,
  DialogContentText,
  ListItemAvatar,
  Avatar,
  Alert,
  DialogContent,
  DialogActions,
  Button,
  MobileStepper
} from '@mui/material'
import { WidgetsOutlined, ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

import { ScrollView } from '@/components/ui'
import { ListLoader } from '@components/ui/ListLoader'
import { useShoplineProductSearch } from '@/hooks/api-stg/useShoplineProductSearch'
import type { FormValues } from './types'
import { useStep } from '../../StepContext'

export function ShoplineList() {
  const formCtx = useFormContext<FormValues>()

  const productController = useController({
    control: formCtx.control,
    name: 'product'
  })

  const [search, setSearch] = React.useState('')
  const step = useStep()

  const query = useShoplineProductSearch({
    site_connection_id: step.store?.connection_id || 0,

    page_limit: 50,

    title: search,
    collection_id: void 0
  })

  return (
    <>
      <DialogContent
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          value={search}
          onChange={evt => {
            setSearch(evt.target.value)
          }}
          fullWidth
          label='Product Title'
          sx={{ mt: 2 }}
        />
        <DialogContentText variant='overline' mt={2}>
          Select a product ID
        </DialogContentText>
        <Box position={'relative'} flex={1} overflow={'hidden'}>
          {(() => {
            if (query.isPending) {
              return <ListLoader />
            }

            if (query.isError) {
              return <Alert severity='error'>{query.error.message}</Alert>
            }

            return (
              <ScrollView>
                <List>
                  <RadioGroup
                    {...productController.field}
                    value={String(productController.field.value?.id || '')}
                    onChange={(evt, v) => {
                      if (!v) {
                        productController.field.onChange(null)

                        return evt
                      }

                      if (!query.data?.products.length) {
                        return
                      }

                      const p = query.data.products.find(item => {
                        return String(item.id) === v
                      })

                      if (!p) {
                        return
                      }

                      productController.field.onChange({
                        id: p.id,
                        title: p.title,
                        body_html: p.body_html,
                        tags: p.tags,
                        image: p.image
                      })
                    }}
                  >
                    <ListItemButton component='label'>
                      <ListItemAvatar>
                        <Avatar>
                          <WidgetsOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={'Create a new product'}></ListItemText>
                      <Radio value={''} />
                    </ListItemButton>
                    {query.data.products.map(item => {
                      return (
                        <ListItemButton key={item.id} component='label'>
                          <ListItemAvatar>
                            <Avatar src={item.image?.at(0)} alt={item.title} />
                          </ListItemAvatar>
                          <ListItemText primary={item.title}></ListItemText>
                          <Radio value={item.id} />
                        </ListItemButton>
                      )
                    })}
                  </RadioGroup>
                </List>
              </ScrollView>
            )
          })()}
        </Box>
      </DialogContent>

      <DialogActions>
        <Box flex={1}>
          <MobileStepper
            steps={3}
            activeStep={1}
            position='static'
            variant='dots'
            backButton={
              <Button
                onClick={() => {
                  React.startTransition(() => {
                    step.setStep(p => p - 1)
                  })
                }}
                variant='outlined'
                startIcon={<ArrowBackOutlined />}
              >
                previous
              </Button>
            }
            nextButton={
              <Button
                onClick={() => {
                  React.startTransition(() => {
                    step.setStep(p => p + 1)
                  })
                }}
                variant='contained'
                endIcon={<ArrowForwardOutlined />}
              >
                next
              </Button>
            }
            sx={{ backgroundColor: 'transparent', userSelect: 'none' }}
          />
        </Box>
      </DialogActions>
    </>
  )
}
