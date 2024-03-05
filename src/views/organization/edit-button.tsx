import React from 'react'

import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import { useForm, FormProvider, useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-toastify'

import { z } from 'zod'

import type { ListItem } from '@/api/api-erp/get_invite_accepted'
import { useUpdateInvite } from '@/hooks/api-erp/useUpdateInvite'
import { TButton, TLoadingButton } from '@/components'
import { ItemText } from '@components/form/ItemText'

export function EditButton(props: Props) {
  const { row } = props

  const [open, setOpen] = React.useState(false)

  const formCtx = useForm<FormValues>({
    defaultValues: {
      name: row.name,
      email: row.email,
      wd_role: row.wd_role
    },

    resolver: zodResolver(schema)
  })

  const roleController = useController({
    control: formCtx.control,
    name: 'wd_role'
  })

  const updateMutation = useUpdateInvite()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true)
        }}
      >
        <EditOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <FormProvider {...formCtx}>
            <Grid container spacing={6} mt={0}>
              <Grid item xs={12}>
                <ItemText name='name' label='Name' />
              </Grid>
              <Grid item xs={12}>
                <ItemText name='email' type='email' label='Email' />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup row {...roleController.field}>
                  <FormControlLabel control={<Radio />} label='user' value={1} />
                  <FormControlLabel control={<Radio />} label='admin' value={2} />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <TButton onClick={handleClose} variant='outlined'>
            cancel
          </TButton>
          <TLoadingButton
            onClick={formCtx.handleSubmit(data => {
              updateMutation.mutate(
                { data },
                {
                  onSuccess(data) {
                    handleClose()
                    toast.success(`Update ${data.updated} successlly!`)
                  },
                  onError(error) {
                    toast.error(error.message)
                  }
                }
              )
            })}
            loading={updateMutation.isPending}
            variant='contained'
          >
            confirm
          </TLoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

type Props = {
  row: ListItem
}

const schema = z.object({
  name: z.string().min(1).max(256),
  email: z.string().email(),
  wd_role: z.number().int()
})

type FormValues = z.infer<typeof schema>
