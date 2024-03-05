'use client'

import React from 'react'

import type { ButtonProps } from '@mui/material'
import { Box, Button, FormHelperText, Typography, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useFormContext, useController } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'

export function ItemImgHeader(props: ItemImgHeaderProps) {
  // ** Props
  const { name, isCompany } = props

  const { t } = useTranslation()
  const formCtx = useFormContext()

  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: ''
  })

  const mutation = useBase64Post()

  const initImgSrc = isCompany ? '/images/avatars/enterprise_200.png' : '/images/avatars/1.png'
  const model = controller.field.value ? `data:image/png;base64,${controller.field.value}` : initImgSrc

  const handleReset = () => formCtx.resetField(name)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ImgStyled src={model} />
      <div>
        <ButtonStyled loading={mutation.isPending} variant='contained' component='label'>
          {t('upload new photo')}
          <input
            type='file'
            accept='image/*'
            hidden
            value={''}
            onChange={async evt => {
              formCtx.resetField(name)

              const { files } = evt.target

              if (!(files instanceof FileList)) {
                return
              }

              const file = files[0]

              if (!file.type.includes('image')) {
                formCtx.setError(name, { message: 'Must be an image!' })
                
return
              }

              if (!['image/jpeg', 'image/png'].includes(file.type)) {
                formCtx.setError(name, { message: 'Only images in jpeg, jpg and png formats are supported' })
                
return
              }

              if (file.size > 800 * 1024) {
                formCtx.setError(name, { message: 'The maximum size of the image is 800k' })
                
return
              }

              try {
                const data = await mutation.mutateAsync(file)
                const res = data.split(',').at(1)

                controller.field.onChange(res)

                return
              } catch (error) {
                formCtx.setError(name, { message: Reflect.get(Object(error), 'message') || 'System error' })

                return
              }
            }}
          />
        </ButtonStyled>
        <ResetButtonStyled onClick={handleReset} variant='outlined' color='secondary'>
          {t('reset')}
        </ResetButtonStyled>
        {(() => {
          if (!controller.fieldState.error) {
            return <ImgTip />
          }

          return <FormHelperText error>{controller.fieldState.error.message}</FormHelperText>
        })()}
      </div>
    </Box>
  )
}

interface ItemImgHeaderProps {
  name: string
  isCompany?: boolean
}

function ImgTip() {
  // I18n Hooks
  const { t } = useTranslation()

  return (
    <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
      {t('Allowed PNG or JPEG. Max size of 800K.')}
    </Typography>
  )
}

function useBase64Post() {
  return useMutation<string, Error, Blob>({
    mutationFn(req) {
      return toDataURL(req)
    }
  })
}

function toDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(blob)

    reader.onload = evt => {
      const data = evt.target?.result

      if (!data) {
        return reject(new Error('Invalid File'))
      }

      return resolve(String(data))
    }

    reader.onerror = evt => {
      reject(evt.target?.error)
    }
  })
}

// Styled Components
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

interface ButtonStyledProps extends ButtonProps {
  component?: React.ElementType
  htmlFor?: string
}

const ButtonStyled = styled(LoadingButton)<ButtonStyledProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))
