import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material'
import { useForm, FormProvider, useController } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { toast } from 'react-toastify'

import { TButton, TLoadingButton } from '@/components'
import { ItemText } from '@components/form/ItemText'
import { useInviteMembers } from '@/hooks/api-erp/useInviteMembers'

export function InviteDialog() {
  const [open, setOpen] = React.useState(false)

  const formCtx = useForm({
    defaultValues: {
      email: '',
      name: '',
      wd_role: 1
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().max(64).required(),
        name: yup.string().max(64).required(),
        wd_role: yup.number().integer().required()
      })
    )
  })

  const roleField = useController({
    control: formCtx.control,
    name: 'wd_role'
  })

  const inviteMutation = useInviteMembers()

  const handleClose = () => {
    setOpen(false)
    formCtx.reset()
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSubmit = formCtx.handleSubmit(data => {
    console.log(data)
    inviteMutation.mutate(
      { data },
      {
        onError(error) {
          console.error(error)
          toast.error(error.message)
        },
        onSuccess(data) {
          toast.success(`Invite ${data.login} successlly!`)
          handleClose()
        }
      }
    )
  })

  return (
    <>
      <Button onClick={handleOpen} variant='contained'>
        invite
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Invite members</DialogTitle>
        <DialogContent>
          <FormProvider {...formCtx}>
            <Grid container spacing={6} mt={0}>
              <Grid item xs={12}>
                <ItemText name='email' label='Email' type='email' />
              </Grid>
              <Grid item xs={12}>
                <ItemText name='name' label='Name' />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup row {...roleField.field}>
                  <FormControlLabel control={<Radio />} label='Admin' value={2} />
                  <FormControlLabel control={<Radio />} label='User' value={1} />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <TButton onClick={handleClose} variant='outlined'>
            cancel
          </TButton>
          <TLoadingButton onClick={handleSubmit} loading={inviteMutation.isPending} variant='contained'>
            confirm
          </TLoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
