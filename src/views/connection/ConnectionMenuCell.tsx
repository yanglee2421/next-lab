import React from 'react'

import type {
  IconButtonProps} from '@mui/material';
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { MoreVertOutlined, EditOutlined } from '@mui/icons-material'


import { useQueryClient } from '@tanstack/react-query'

import { useForm, FormProvider } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { toast } from 'react-toastify'

import { ConnectionDeleteItem } from './ConnectionDeleteItem'
import { TButton, TLoadingButton } from '@/components'
import { useConnectionUpdate } from '@/hooks/api-stg/useConnectionUpdate'
import type { Row } from '@/api/api-stg/connection_my_connections'


import { ItemCheckbox, ItemText } from '@components/form'

export function ConnectionMenuCell(props: MenuCellProps) {
  // ** Props
  const { row } = props

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
  const [showDialog, setShowDialog] = React.useState(false)

  const form = useForm({
    defaultValues: {
      scopes: row.scopes || [],
      shop_alias: row.shop_alias || ''
    },

    resolver: yupResolver(
      yup.object().shape({
        shop_alias: yup.string(),
        scopes: yup.array().of(yup.number().required()).min(1)
      })
    )
  })

  // Query Hooks
  const mutation = useConnectionUpdate()
  const queryClient = useQueryClient()

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpen: IconButtonProps['onClick'] = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleEditClose = () => {
    setShowDialog(false)
    form.reset()
  }

  const handleEditOpen = () => {
    setShowDialog(true)
    handleMenuClose()
  }

  const handleSubmit = form.handleSubmit(data => {
    mutation.mutate(
      {
        data,
        headers: {
          'site-connection-id': row.connection_id
        }
      },
      {
        onSuccess(data) {
          handleEditClose()

          if (typeof data !== 'object') return
          if (!data) return
          if (typeof data.auth_url !== 'string') return
          if (!data.auth_url) return

          queryClient.removeQueries({
            queryKey: ['connection_my_connections']
          })

          setTimeout(() => {
            window.open(data.auth_url, '_parent')
          }, 0)
        },
        onError(error) {
          toast.error(error.message)
        }
      }
    )
  })

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <ConnectionDeleteItem site_connection_id={row.connection_id} onSuccess={handleMenuClose}></ConnectionDeleteItem>
      </Menu>
      <Dialog open={showDialog} onClose={handleEditClose} fullWidth>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormProvider {...form}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <ItemText name='shop_alias' label='Shop Name' sx={{ mt: 2 }}></ItemText>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup
                    row
                    sx={{
                      '& *': {
                        userSelect: 'none'
                      }
                    }}
                  >
                    <FormControlLabel
                      label='GPT Copywriting'
                      control={<ItemCheckbox name='scopes' value={1} />}
                      disabled={row.site_type === 2}
                    ></FormControlLabel>
                    <FormControlLabel
                      label='Recommendation System'
                      control={<ItemCheckbox name='scopes' value={2} />}
                      disabled={row.site_type === 2}
                    ></FormControlLabel>
                    <FormControlLabel
                      label='ERP'
                      control={<ItemCheckbox name='scopes' value={4} />}
                      disabled={row.site_type === 4}
                    ></FormControlLabel>
                  </FormGroup>
                  {form.formState.errors.scopes && (
                    <FormHelperText error>{form.formState.errors.scopes.message}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </FormProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <TButton onClick={handleEditClose} variant='outlined'>
            cancel
          </TButton>
          <TLoadingButton onClick={handleSubmit} loading={mutation.isPending} variant='contained'>
            confirm
          </TLoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export interface MenuCellProps {
  row: Row
}
