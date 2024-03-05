'use client'

import classnames from 'classnames'

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { Customizer } from '@components/customizer'

export default function NavbarContent() {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
      </div>
      <div className='flex items-center gap-4'>
        <LanguageDropdown />
        <ModeDropdown />
        <Customizer />
        <UserDropdown />
      </div>
    </div>
  )
}
