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
  Alert,
  DialogContent,
  DialogActions,
  Button,
  MobileStepper
} from '@mui/material'
import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

import { ScrollView } from '@/components/ui'
import { ListLoader } from '@components/ui/ListLoader'
import { useShoplineBlogCollection } from '@/hooks/api-stg/useShoplineBlogCollection'
import type { FormValues } from './types'
import { useStep } from '../../StepContext'

export function ShoplineList() {
  const formCtx = useFormContext<FormValues>()

  const blogController = useController({
    control: formCtx.control,
    name: 'blog'
  })

  const step = useStep()
  const [search, setSearch] = React.useState('')
  const query = useShoplineBlogCollection(step.store?.connection_id || 0)

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
          label='Blog Title'
          sx={{ mt: 2 }}
        />
        <DialogContentText variant='overline' mt={2}>
          Select a blog collection
        </DialogContentText>
        <Box position={'relative'} flex={1} overflow={'hidden'}>
          {(() => {
            if (query.isPending) {
              return <ListLoader />
            }

            if (query.isError) {
              return <Alert severity='error'>{query.error.message}</Alert>
            }

            if (!query.data.blogs.length) {
              return <Alert severity='info'>No blog in your store</Alert>
            }

            return (
              <ScrollView>
                <List>
                  <RadioGroup
                    {...blogController.field}
                    value={String(blogController.field.value?.id || '')}
                    onChange={(evt, v) => {
                      if (!v) {
                        return evt
                      }

                      const blog = query.data?.blogs.find(item => {
                        return String(item.id) === v
                      })

                      if (!blog) {
                        return
                      }

                      blogController.field.onChange(blog)
                    }}
                  >
                    {query.data.blogs.map(item => {
                      return (
                        <ListItemButton key={item.id} component='label'>
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
            activeStep={step.step}
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
                disabled={!blogController.field.value?.id}
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
