'use client'

import React from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import type { Mode } from '@core/types'

// import Logo from '@core/svg/Logo'
import Illustrations from '@components/Illustrations'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'

import { ItemText } from '@/components/form'
import { useSignupEmailActivate } from '@/hooks/api-erp/useSignupEmailActivate'
import { LangSelect } from '@components/form/LangSelect'
import { Logo } from '@components/logo/Logo'

export default function RegisterV2({ mode }: { mode: Mode }) {
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const params = useParams()

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
      company_email: '',
      company_name: '',
      lang: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useSignupEmailActivate()

  const [checked, setChecked] = React.useState(false)

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
          image1={{ src: '/images/illustrations/objects/tree-3.png' }}
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
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography className='mbe-1'>Make your app management easy and fun!</Typography>
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
              <ItemText name='name' autoFocus fullWidth label='Username' />
              <ItemText name='email' fullWidth label='Email' />
              <ItemText name='company_name' fullWidth label='Company Name' />
              <ItemText name='company_email' fullWidth label='Company Email' />
              <LangSelect name='lang' label='Language'></LangSelect>
              <div className='flex justify-between items-center gap-3'>
                <FormControlLabel
                  checked={checked}
                  onChange={(evt, checked) => {
                    void evt
                    setChecked(checked)
                  }}
                  control={<Checkbox />}
                  label={
                    <>
                      <span>I agree to </span>
                      <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                        privacy policy & terms
                      </Link>
                    </>
                  }
                />
              </div>
              <Button disabled={!checked || mutation.isPending} fullWidth variant='contained' type='submit'>
                Sign Up
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href={`/${params.lang}/login`} color='primary'>
                  Sign in instead
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <OauthButtonGroup onlyGoogle></OauthButtonGroup>
            </FormProvider>
          </form>
        </div>
      </div>
    </div>
  )
}

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(256),
  lang: z.string().min(1),
  company_name: z.string().min(1).max(256),
  company_email: z.string().email()
})

type FormValues = z.infer<typeof schema>

const darkImg = '/images/pages/auth-v2-mask-dark.png'
const lightImg = '/images/pages/auth-v2-mask-light.png'
const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

function OauthButtonGroup({ onlyGoogle }: { onlyGoogle: boolean }) {
  if (onlyGoogle) {
    return (
      <Button
        color='secondary'
        startIcon={<img src={'/images/pages/google.png'} alt='Google' width={22}></img>}
        sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
        onClick={() => {}}
      >
        Sign in with Google
      </Button>
    )
  }

  return (
    <div className='flex justify-center items-center gap-2'>
      <IconButton>
        <i className='ri-facebook-fill text-facebook' />
      </IconButton>
      <IconButton>
        <i className='ri-twitter-fill text-twitter' />
      </IconButton>
      <IconButton>
        <i className='ri-github-fill text-github' />
      </IconButton>
      <IconButton>
        <i className='ri-google-line text-googlePlus' />
      </IconButton>
    </div>
  )
}
