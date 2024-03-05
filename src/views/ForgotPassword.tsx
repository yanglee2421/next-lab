'use client'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import type { Mode } from '@core/types'

// import Logo from '@core/svg/Logo'
import Illustrations from '@components/Illustrations'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'

import { useResetPassword } from '@/hooks/api-erp/useResetPassword'
import { ItemText } from '@components/form/ItemText'
import { Logo } from '@components/logo/Logo'

export default function ForgotPasswordV2({ mode }: { mode: Mode }) {
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const formCtx = useForm({
    defaultValues: {
      email: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useResetPassword()

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden'>
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-2.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <div className='flex justify-center items-center gap-3 mbe-6'>
            <Logo className='text-primary' height={28} width={35} />
            <Typography variant='h4' className='font-semibold tracking-[0.15px]'>
              {themeConfig.templateName}
            </Typography>
          </div>
        </div>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>Forgot Password 🔒</Typography>
            <Typography className='mbs-1'>
              Enter your email and we&#39;ll send you instructions to reset your password
            </Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={formCtx.handleSubmit(
              data => {
                mutation.mutate(data)
              },
              error => {
                console.error(error)
              }
            )}
            className='flex flex-col gap-5'
          >
            <FormProvider {...formCtx}>
              <ItemText name='email' autoFocus fullWidth label='Email' />
              <Button disabled={mutation.isPending} fullWidth variant='contained' type='submit'>
                Send reset link
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='/login' className='flex items-center'>
                  <i className='ri-arrow-left-s-line' />
                  <span>Back to Login</span>
                </Link>
              </Typography>
            </FormProvider>
          </form>
        </div>
      </div>
    </div>
  )
}

const schema = z.object({
  email: z.string().email()
})

const darkImg = '/images/pages/auth-v2-mask-dark.png'
const lightImg = '/images/pages/auth-v2-mask-light.png'
const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'
const borderedDarkIllustration = '/images/illustrations/auth/v2-forgot-password-dark-border.png'
const borderedLightIllustration = '/images/illustrations/auth/v2-forgot-password-light-border.png'
