'use client'

import classnames from 'classnames'

import NavToggle from './NavToggle'
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'
import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import { Customizer } from '@components/customizer'

export default function NavbarContent() {
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
      </div>
      <div className='flex items-center'>
        <LanguageDropdown />
        <ModeDropdown />
        <Customizer />
        <UserDropdown />
      </div>
    </div>
  )
}
