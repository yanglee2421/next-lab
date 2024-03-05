'use client'

import { useParams } from 'next/navigation'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import classnames from 'classnames'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

import { useQueryClient } from '@tanstack/react-query'

import type { Mode } from '@core/types'

// import Logo from '@core/svg/Logo'
import Illustrations from '@components/Illustrations'
import Link from '@components/Link'
import { ItemText, ItemPassword } from '@components/form'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useSignIn } from '@/hooks/api-erp'
import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'
import { Logo } from '@components/logo/Logo'

export default function LoginV2({ mode }: { mode: Mode }) {
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    },

    resolver: zodResolver(schema)
  })

  const setAccessToken = useAuthLocalStore(store => store.setAccessToken)
  const queryClient = useQueryClient()
  const mutation = useSignIn()
  const params = useParams()

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
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
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
            <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
          </div>
          <FormProvider {...formCtx}>
            <form
              noValidate
              autoComplete='off'
              onSubmit={formCtx.handleSubmit(
                data => {
                  return new Promise<void>(resolve => {
                    mutation.mutate(
                      {
                        data: {
                          email: data.email,
                          password: data.password
                        }
                      },
                      {
                        onSettled() {
                          resolve()
                        },
                        onError(error) {
                          toast.error(error.message)
                        },
                        onSuccess(data) {
                          setAccessToken(data.access_token)
                          queryClient.setQueryData(['refresh_token'], data)
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
              <ItemText name='email' label='Email' />
              <ItemPassword name='password' label='Password'></ItemPassword>
              <div className='flex justify-end items-center flex-wrap gap-x-3 gap-y-1'>
                <Typography
                  className='text-end'
                  color='primary'
                  component={Link}
                  href={`/${params.lang}/forgot-password`}
                >
                  Forgot password?
                </Typography>
              </div>
              <Button disabled={formCtx.formState.isSubmitting} fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href={`/${params.lang}/register`} color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <Button
                color='secondary'
                startIcon={<img src={'/images/pages/google.png'} alt='Google' width={22}></img>}
                sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
                onClick={() => {}}
              >
                Sign in with Google
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

type FormValues = z.infer<typeof schema>

const darkImg = '/images/pages/auth-v2-mask-dark.png'
const lightImg = '/images/pages/auth-v2-mask-light.png'
const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'
