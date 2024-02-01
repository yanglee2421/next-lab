'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

export default function NavbarContent() {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <LanguageDropdown />
        <ModeDropdown />
      </div>
      <div className='flex items-center'>
        <UserDropdown />
      </div>
    </div>
  )
}
