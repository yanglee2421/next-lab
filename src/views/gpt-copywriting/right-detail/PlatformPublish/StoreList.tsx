import React from 'react'

import {
  List,
  ListItemButton,
  Radio,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  RadioGroup,
  TextField,
  DialogContentText,
  Alert,
  DialogActions,
  DialogContent,
  MobileStepper,
  Button
} from '@mui/material'

import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'

import { useMyConnections } from '@/hooks/api-stg/useMyConnections'


import { ScrollView } from '@components/ui'
import { ListLoader } from '@components/ui/ListLoader'
import { useStep } from './StepContext'

export function StoreList() {
  const query = useMyConnections({ is_list_all: false, site_type: 1 })
  const [search, setSearch] = React.useState('')
  const deferredSearch = React.useDeferredValue(search)
  const step = useStep()

  React.useEffect(() => {
    if (step.store) return
    if (!Array.isArray(query.data)) return
    if (!query.data.length) return

    step.setStore(query.data.at(0) || null)
  }, [step, query.data])

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
          label='Store Name'
          sx={{ mt: 2 }}
        />
        <DialogContentText variant='overline' mt={2}>
          Select a store
        </DialogContentText>
        <Box position={'relative'} flex={1} overflow={'hidden'}>
          {(() => {
            if (query.isPending) {
              return <ListLoader />
            }

            if (query.isError) {
              return <Alert severity='error'>{query.error.message}</Alert>
            }

            if (!query.data.length) {
              return <Alert severity='info'>No store</Alert>
            }

            const list = query.data.map(item => {
              const isAllow = [
                item.shop_alias?.toLowerCase().includes(deferredSearch.toLowerCase()),
                item.site_name?.toLowerCase().includes(deferredSearch.toLowerCase())
              ].every(Boolean)

              if (!isAllow) {
                return null
              }

              return (
                <ListItemButton key={item.connection_id} component='label'>
                  <ListItemAvatar>
                    <Avatar src={map.get(item.site_type)} />
                  </ListItemAvatar>
                  <ListItemText primary={item.shop_alias || item.site_name}></ListItemText>
                  <Radio value={String(item.connection_id)} />
                </ListItemButton>
              )
            })

            return (
              <ScrollView>
                <List>
                  <RadioGroup
                    value={String(step.store?.connection_id || '')}
                    onChange={(evt, v) => {
                      if (!v) {
                        return evt
                      }

                      const nextValue = query.data?.find(item => {
                        return String(item.connection_id) === v
                      })

                      if (!nextValue) {
                        return
                      }

                      step.setStore(nextValue)
                    }}
                  >
                    {list}
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
            activeStep={0}
            position='static'
            variant='dots'
            backButton={
              <Button disabled variant='outlined' startIcon={<ArrowBackOutlined />}>
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

const map = new Map<number, string>()

map.set(1, '/platform-icons/shopify.svg')
map.set(2, '/platform-icons/woocommerce.png')
map.set(3, '/platform-icons/shopline.png')
map.set(4, '/platform-icons/shoplazza.svg')
