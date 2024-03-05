import React from 'react'

import type { ButtonProps } from '@mui/material'
import { Button, Dialog, DialogTitle, DialogContent, Alert, AlertTitle, IconButton, Box } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

import { ScrollView } from '@/components/ui'
import { Loader } from './Loader'
import { use1688ProductDetail } from '@/hooks/api-nuwa/use1688ProductDetail'

export function DetailButton(props: DetailButtonProps) {
  const { offerId } = props

  const [open, setOpen] = React.useState(false)

  const query = use1688ProductDetail(open ? 103 : 0, {
    offer_id: offerId,
    language: 'en'
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleOpen}>detail</Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        {(() => {
          if (query.isPending) {
            return <Loader onClose={handleClose}></Loader>
          }

          if (query.isError) {
            return (
              <Alert severity='error'>
                <AlertTitle>Fetch detail failed...</AlertTitle>
                {query.error.message}
              </Alert>
            )
          }

          return (
            <>
              <DialogTitle sx={{ position: 'relative' }}>
                {query.data.subject}
                <Box
                  position={'absolute'}
                  right={16}
                  display={'flex'}
                  alignItems={'center'}
                  sx={{
                    insetBlock: 0
                  }}
                >
                  <IconButton onClick={handleClose}>
                    <CloseOutlined></CloseOutlined>
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <ScrollView>
                  <div dangerouslySetInnerHTML={{ __html: query.data.description }}></div>
                </ScrollView>
              </DialogContent>
            </>
          )
        })()}
      </Dialog>
    </>
  )
}

export type DetailButtonProps = ButtonProps & {
  offerId: number
}
