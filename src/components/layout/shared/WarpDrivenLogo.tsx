import React from 'react'

import Link from 'next/link'

import styled from '@emotion/styled'

import type { VerticalNavContextProps } from '@menu/contexts/verticalNavContext'

// import MaterioLogo from '@core/svg/Logo'
import themeConfig from '@configs/themeConfig'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import { Logo } from '@components/logo/Logo'

export function WarpDrivenLogo() {
  const logoTextRef = React.useRef<HTMLSpanElement>(null)

  const { isHovered, isCollapsed, transitionDuration } = useVerticalNav()
  const { settings } = useSettings()

  const { layout } = settings

  React.useEffect(() => {
    if (layout === 'horizontal' || !isCollapsed) {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (isCollapsed && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isCollapsed])

  // You may return any JSX here to display a logo in the sidebar header
  // return <Img src='/next.svg' width={100} height={25} alt='logo' /> // for example
  return (
    <Link href='/' className='flex items-center min-bs-[24px]'>
      {/* <MaterioLogo className='text-[22px] text-primary' /> */}
      <Logo width={30}></Logo>
      <LogoText
        ref={logoTextRef}
        isHovered={isHovered}
        isCollapsed={isCollapsed}
        transitionDuration={transitionDuration}
      >
        {themeConfig.templateName}
      </LogoText>
    </Link>
  )
}

type LogoTextProps = {
  isHovered?: VerticalNavContextProps['isHovered']
  isCollapsed?: VerticalNavContextProps['isCollapsed']
  transitionDuration?: VerticalNavContextProps['transitionDuration']
}

const LogoText = styled.span<LogoTextProps>`
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  transition: ${({ transitionDuration }) =>
    `margin-inline-start ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`};

  ${({ isHovered, isCollapsed }) =>
    isCollapsed && !isHovered ? 'opacity: 0; margin-inline-start: 0;' : 'opacity: 1; margin-inline-start: 10px;'}
`
