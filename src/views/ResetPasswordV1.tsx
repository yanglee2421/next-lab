'use client'

import React from 'react'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import type { Mode } from '@core/types'
import DirectionalIcon from '@components/DirectionalIcon'

// import Logo from '@core/svg/Logo'
import Illustrations from '@components/Illustrations'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'

import { ItemPassword } from '@/components/form'
import { useLoginSignup } from '@/hooks/api-erp/useLoginSignup'
import { Logo } from '@components/logo/Logo'

export function ResetPasswordV1({ mode }: { mode: Mode }) {
  const params = useParams()
  const searchParams = useSearchParams()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const formCtx = useForm<FormValues>({
    defaultValues: {
      password: '',
      confirm_password: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useLoginSignup()

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='!p-12'>
          <div className='flex justify-center items-center gap-3 mbe-6'>
            <Logo className='bs-8 text-primary' height={28} width={35} />
            <Typography variant='h4' className='font-semibold tracking-[0.15px]'>
              {themeConfig.templateName}
            </Typography>
          </div>
          <Typography variant='h4'>Reset Password 🔒</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Your new password must be different from previously used passwords
            </Typography>
            <form
              noValidate
              autoComplete='off'
              onSubmit={formCtx.handleSubmit(
                data => {
                  return new Promise<void>(resolve => {
                    mutation.mutate(
                      {
                        data: {
                          ...data,
                          token: searchParams.get('token') || ''
                        }
                      },
                      {
                        onSettled() {
                          resolve()
                        }
                      }
                    )
                  })
                },
                error => {
                  console.error(error)
                }
              )}
              className='flex flex-col gap-5'
            >
              <FormProvider {...formCtx}>
                <ItemPassword name='password' label='Password'></ItemPassword>
                <ItemPassword name='confirm_password' label='Confirm Password'></ItemPassword>
                <Button disabled={formCtx.formState.isSubmitting} fullWidth variant='contained' type='submit'>
                  Set New Password
                </Button>
                <Typography className='flex justify-center items-center' color='primary'>
                  <Link href={`/${params.lang}/login`} className='flex items-center gap-1.5'>
                    <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                    <span>Back to Login</span>
                  </Link>
                </Typography>
              </FormProvider>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

const schema = z
  .object({
    password: z.string().min(6).max(16),
    confirm_password: z.string().min(6).max(16)
  })
  .refine(value => value.password === value.confirm_password, {
    message: 'The passwords entered twice are inconsistent',
    path: ['confirm_password']
  })

type FormValues = z.infer<typeof schema>

const darkImg = '/images/pages/auth-v1-mask-dark.png'
const lightImg = '/images/pages/auth-v1-mask-light.png'
