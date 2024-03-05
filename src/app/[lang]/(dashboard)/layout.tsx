import Button from '@mui/material/Button'

import type { ChildrenType } from '@core/types'
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
import { getMode, getSettingsFromCookie, getSkin, getSystemMode } from '@core/server/actions'
import { AuthGuard } from '@/components/guard/AuthGuard'

export default async function Layout({ children }: ChildrenType) {
  const mode = getMode()
  const systemMode = getSystemMode()
  const settingsCookie = getSettingsFromCookie()
  const skin = getSkin()

  return (
    <AuthGuard>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation settingsCookie={settingsCookie} mode={mode} systemMode={systemMode} skin={skin} />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<Header />} footer={<HorizontalFooter />}>
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='ri-arrow-up-line' />
        </Button>
      </ScrollToTop>
    </AuthGuard>
  )
}
