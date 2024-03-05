'use client'

import { useParams } from 'next/navigation'

import { useTheme } from '@mui/material/styles'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { PlanGuard } from '@components/guard/PlanGuard'

export default function HorizontalMenu() {
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { settings } = useSettings()
  const params = useParams()

  const { skin } = settings
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor:
          skin === 'bordered' ? 'var(--mui-palette-background-paper)' : 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuItemStyles={menuItemStyles(settings, theme)}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 4 : 16),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme, settings),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='ri-circle-line' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        <PlanGuard role={2}>
          <SubMenu label='IntelliRec' icon={<i className='ri-search-eye-line' />}>
            <MenuItem href={`/${params.lang}/intellirec/dashboard`}>Dashboard</MenuItem>
            <MenuItem href={`/${params.lang}/intellirec/setting`}>Setting</MenuItem>
          </SubMenu>
        </PlanGuard>
        <SubMenu label='IntelliMerch' icon={<i className='ri-shopping-bag-line' />}>
          <MenuItem href={`/${params.lang}/intellimerch/dashboard`}>Dashboard</MenuItem>
          <MenuItem href={`/${params.lang}/user-behaviours/user`}>User Insight</MenuItem>
          <MenuItem href={`/${params.lang}/user-behaviours/user-features`}>User Features</MenuItem>
          <MenuItem href={`/${params.lang}/user-behaviours/items`}>Items Insight</MenuItem>
          <MenuItem href={`/${params.lang}/user-behaviours/items-features`}>Items Features</MenuItem>
          <MenuItem href={`/${params.lang}/intellimerch/product-optimisation`}>AI Copilot</MenuItem>
          <MenuItem href={`/${params.lang}/intellitools/gpt-copywriting`}>GPT Copywriting</MenuItem>
        </SubMenu>
        <PlanGuard role={5}>
          <SubMenu label='IntelliChain' icon={<i className='ri-links-line' />}>
            <MenuItem href={`/${params.lang}/intellichain/dashboard`}>Dashboard</MenuItem>
            <MenuItem href={`/${params.lang}/intellichain/product-optimisation`}>Product Listing</MenuItem>
            <MenuItem href={`/${params.lang}/intellichain/subscription`}>Subscription</MenuItem>
            <MenuItem href={`/${params.lang}/intellichain/logistics`}>Logistics</MenuItem>
            <MenuItem href={`/${params.lang}/intellichain/orders`}>Orders</MenuItem>
          </SubMenu>
        </PlanGuard>
        <PlanGuard role={6}>
          <SubMenu label='IntelliVendor' icon={<i className='ri-equalizer-line' />}>
            <MenuItem href={`/${params.lang}/intellivendor/product-listing`}>Product Listing</MenuItem>
          </SubMenu>
        </PlanGuard>
        <SubMenu label='Account' icon={<i className='ri-user-line' />}>
          <MenuItem href={`/${params.lang}/user/overview`}>Overview</MenuItem>
          <MenuItem href={`/${params.lang}/user/security`}>Security</MenuItem>
          <MenuItem href={`/${params.lang}/user/billing`}>Billing</MenuItem>
        </SubMenu>
        <SubMenu label='Subscription' icon={<i className='ri-money-dollar-circle-line' />}>
          <MenuItem href={`/${params.lang}/subscription/1`}>AI Copilot</MenuItem>
          <MenuItem href={`/${params.lang}/subscription/2`}>IntelliRec</MenuItem>
          <MenuItem href={`/${params.lang}/subscription/4`}>IntelliMerch</MenuItem>
          <MenuItem href={`/${params.lang}/subscription/5`}>IntelliChain</MenuItem>
          <MenuItem href={`/${params.lang}/subscription/6`}>IntelliVendor</MenuItem>
          <MenuItem href={`/${params.lang}/subscription/8`}>AI Agent</MenuItem>
        </SubMenu>
        <SubMenu label='Connection' icon={<i className='ri-git-commit-line' />}>
          <MenuItem href={`/${params.lang}/connection/my-connection`}>My Connection</MenuItem>
          <MenuItem href={`/${params.lang}/connection/new-connection`}>New Connection</MenuItem>
        </SubMenu>
      </Menu>
    </HorizontalNav>
  )
}

function RenderExpandIcon({ level }: RenderExpandIconProps) {
  return (
    <StyledHorizontalNavExpandIcon level={level}>
      <i className='ri-arrow-right-s-line' />
    </StyledHorizontalNavExpandIcon>
  )
}

type RenderExpandIconProps = {
  level?: number
}

function RenderVerticalExpandIcon({ open, transitionDuration }: RenderVerticalExpandIconProps) {
  return (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
      <i className='ri-arrow-right-s-line' />
    </StyledVerticalNavExpandIcon>
  )
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}
