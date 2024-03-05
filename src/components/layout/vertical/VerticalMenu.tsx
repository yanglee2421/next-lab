'use client'

import { useParams } from 'next/navigation'

import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, MenuItem, SubMenu, MenuSection } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useAllSubscribedPlans } from '@/hooks/api-stg/useAllSubscribedPlans'
import { PlanGuard } from '@components/guard/PlanGuard'
import { StoreGuard } from '@components/guard/StoreGuard'

export default function VerticalMenu({ scrollMenu }: Props) {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const query = useAllSubscribedPlans()

  if (query.isPending) {
    return
  }

  const { transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuSection label='Intelligent eCommerce'>
          <PlanGuard role={2}>
            <SubMenu label='IntelliRec' icon={<i className='ri-search-eye-line' />}>
              <MenuItem href={`/${params.lang}/intellirec/dashboard`}>Dashboard</MenuItem>
              <MenuItem href={`/${params.lang}/intellirec/setting`}>Setting</MenuItem>
            </SubMenu>
          </PlanGuard>
          <SubMenu label='IntelliMerch' icon={<i className='ri-shopping-bag-line' />}>
            <StoreGuard>
              <MenuItem href={`/${params.lang}/intellimerch/dashboard`}>Dashboard</MenuItem>
              <MenuItem href={`/${params.lang}/user-behaviours/user`}>User Insight</MenuItem>
              <MenuItem href={`/${params.lang}/user-behaviours/user-features`}>User Features</MenuItem>
              <MenuItem href={`/${params.lang}/user-behaviours/items`}>Items Insight</MenuItem>
              <MenuItem href={`/${params.lang}/user-behaviours/items-features`}>Items Features</MenuItem>
            </StoreGuard>
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
        </MenuSection>
        <MenuSection label='Setting'>
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
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

function RenderExpandIcon({ open, transitionDuration }: RenderExpandIconProps) {
  return (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
      <i className='ri-arrow-right-s-line' />
    </StyledVerticalNavExpandIcon>
  )
}

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}
