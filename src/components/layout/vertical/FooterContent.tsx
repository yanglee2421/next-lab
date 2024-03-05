'use client'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import classnames from 'classnames'

import useVerticalNav from '@menu/hooks/useVerticalNav'
import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { useSettings } from '@core/hooks/useSettings'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

export default function FooterContent() {
  const { settings } = useSettings()
  const { isBreakpointReached: isVerticalBreakpointReached } = useVerticalNav()
  const { isBreakpointReached: isHorizontalBreakpointReached } = useHorizontalNav()
  const params = useParams()

  const isBreakpointReached =
    settings.layout === 'vertical' ? isVerticalBreakpointReached : isHorizontalBreakpointReached

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href='https://https://warp-driven.com' target='https://https://warp-driven.com' className='text-primary'>
          WarpDriven
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          {/* <Link href='https://themeselection.com/license' target='_blank' className='text-primary'>
            License
          </Link>
          <Link href='https://themeselection.com' target='_blank' className='text-primary'>
            More Themes
          </Link>
          <Link
            href='https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/documentation/'
            target='_blank'
            className='text-primary'
          >
            Documentation
          </Link> */}
          <Link href={`/${params.lang}/ticket`} className='text-primary'>
            Support
          </Link>
        </div>
      )}
    </div>
  )
}
