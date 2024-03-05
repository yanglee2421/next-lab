'use client'

import React from 'react'

import ReactDOM from 'react-dom'

import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Checkbox from '@mui/material/Checkbox'
import type { Breakpoint } from '@mui/material/styles'
import classnames from 'classnames'
import { useDebounce, useMedia } from 'react-use'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IconButton } from '@mui/material'
import { SettingsOutlined } from '@mui/icons-material'

import type { Settings } from '@core/contexts/settingsContext'
import type { Direction } from '@core/types'
import type { PrimaryColorConfig } from '@configs/primaryColorConfig'
import EyeDropper from '@core/svg/EyeDropper'
import SkinDefault from '@core/svg/SkinDefault'
import SkinBordered from '@core/svg/SkinBordered'
import LayoutVertical from '@core/svg/LayoutVertical'
import LayoutCollapsed from '@core/svg/LayoutCollapsed'
import LayoutHorizontal from '@core/svg/LayoutHorizontal'
import ContentCompact from '@core/svg/ContentCompact'
import ContentWide from '@core/svg/ContentWide'
import DirectionLtr from '@core/svg/DirectionLtr'
import DirectionRtl from '@core/svg/DirectionRtl'
import primaryColorConfig from '@configs/primaryColorConfig'
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import styles from '@core/components/customizer/styles.module.css'
import { useThemeStore } from '@/hooks/store/useThemeStore'

export function Customizer({ disableDirection = false }: CustomizerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement | null>(null)
  const { settings, updateSettings, resetSettings, isSettingsChanged } = useSettings()
  const { collapseVerticalNav } = useVerticalNav()
  const isSystemDark = useMedia('(prefers-color-scheme: dark)', false)
  const direction = useThemeStore(store => store.direction)
  const setDirection = useThemeStore(store => store.setDirection)

  const isMobileScreen = useMedia('(max-width: 600px)', false)
  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const isColorFromPrimaryConfig = primaryColorConfig.find(item => item.main === settings.primaryColor)

  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Update Settings
  const handleChange = (field: keyof Settings | 'direction', value: Settings[keyof Settings] | Direction) => {
    // Update direction state
    if (field === 'direction') {
      setDirection(value as Direction)
    } else {
      // Update settings in cookie
      updateSettings({ [field]: value })
    }
  }

  const handleMenuClose = (event: MouseEvent | TouchEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setIsMenuOpen(false)
  }

  React.useEffect(() => {
    if (settings.layout === 'collapsed') {
      collapseVerticalNav(true)
    } else {
      collapseVerticalNav(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout])

  return (
    <>
      <IconButton onClick={handleToggle} color='inherit'>
        <SettingsOutlined color='inherit' />
      </IconButton>
      {ReactDOM.createPortal(
        <div
          className={classnames('customizer bs-full flex flex-col', styles.customizer, {
            [styles.show]: isOpen,
            [styles.smallScreen]: isMobileScreen
          })}
        >
          <div className={classnames('customizer-header flex items-center justify-between', styles.header)}>
            <div className='flex flex-col'>
              <h6 className={styles.customizerTitle}>Theme Customizer</h6>
              <p className={styles.customizerSubtitle}>Customize & Preview in Real Time</p>
            </div>
            <div className='flex gap-4'>
              <div onClick={resetSettings} className='relative flex cursor-pointer'>
                <i className={classnames('ri-refresh-line', styles.actionActiveColor)} />
                <div className={classnames(styles.dotStyles, { [styles.show]: isSettingsChanged })} />
              </div>
              <i
                className={classnames('ri-close-line cursor-pointer', styles.actionActiveColor)}
                onClick={handleToggle}
              />
            </div>
          </div>
          <ScrollWrapper
            {...(isBelowLgScreen
              ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
              : { options: { wheelPropagation: false, suppressScrollX: true } })}
          >
            <div className={classnames('customizer-body flex flex-col', styles.customizerBody)}>
              <div className='theming-section flex flex-col gap-6'>
                <Chip
                  label='Theming'
                  size='small'
                  color='primary'
                  variant='tonal'
                  className={classnames('self-start', styles.chip)}
                />
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Primary Color</p>
                  <div className='flex items-center justify-between'>
                    {primaryColorConfig.map(item => (
                      <div
                        key={item.main}
                        className={classnames(styles.primaryColorWrapper, {
                          [styles.active]: settings.primaryColor === item.main
                        })}
                        onClick={() => handleChange('primaryColor', item.main)}
                      >
                        <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
                      </div>
                    ))}
                    <div
                      ref={anchorRef}
                      className={classnames(styles.primaryColorWrapper, {
                        [styles.active]: !isColorFromPrimaryConfig
                      })}
                      onClick={() => setIsMenuOpen(prev => !prev)}
                    >
                      <div
                        className={classnames(styles.primaryColor, 'flex items-center justify-center')}
                        style={{
                          backgroundColor: !isColorFromPrimaryConfig
                            ? settings.primaryColor
                            : 'var(--mui-palette-action-selected)',
                          color: isColorFromPrimaryConfig
                            ? 'var(--mui-palette-text-primary)'
                            : 'var(--mui-palette-primary-contrastText)'
                        }}
                      >
                        <EyeDropper fontSize='1.25rem' />
                      </div>
                    </div>
                    <Popper
                      transition
                      open={isMenuOpen}
                      disablePortal
                      anchorEl={anchorRef.current}
                      placement='bottom-end'
                      className='z-[1]'
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                          <Paper elevation={6} className={styles.colorPopup}>
                            <ClickAwayListener onClickAway={handleMenuClose}>
                              <div>
                                <DebouncedColorPicker
                                  settings={settings}
                                  isColorFromPrimaryConfig={isColorFromPrimaryConfig}
                                  handleChange={handleChange}
                                />
                              </div>
                            </ClickAwayListener>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                </div>
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Mode</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, styles.modeWrapper, {
                          [styles.active]: settings.mode === 'light'
                        })}
                        onClick={() => handleChange('mode', 'light')}
                      >
                        <i className='ri-sun-line text-[30px]' />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('mode', 'light')}>
                        Light
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, styles.modeWrapper, {
                          [styles.active]: settings.mode === 'dark'
                        })}
                        onClick={() => handleChange('mode', 'dark')}
                      >
                        <i className='ri-moon-clear-line text-[30px]' />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('mode', 'dark')}>
                        Dark
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, styles.modeWrapper, {
                          [styles.active]: settings.mode === 'system'
                        })}
                        onClick={() => handleChange('mode', 'system')}
                      >
                        <i className='ri-computer-line text-[30px]' />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('mode', 'system')}>
                        System
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Skin</p>
                  <div className='flex items-center gap-4'>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'default' })}
                        onClick={() => handleChange('skin', 'default')}
                      >
                        <SkinDefault />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('skin', 'default')}>
                        Default
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'bordered' })}
                        onClick={() => handleChange('skin', 'bordered')}
                      >
                        <SkinBordered />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('skin', 'bordered')}>
                        Bordered
                      </p>
                    </div>
                  </div>
                </div>
                {settings.mode === 'dark' ||
                (settings.mode === 'system' && isSystemDark) ||
                settings.layout === 'horizontal' ? null : (
                  <div className='flex items-center justify-between'>
                    <label className='font-medium cursor-pointer' htmlFor='customizer-semi-dark'>
                      Semi Dark
                    </label>
                    <Checkbox
                      id='customizer-semi-dark'
                      checked={settings.semiDark === true}
                      onChange={() => handleChange('semiDark', !settings.semiDark)}
                    />
                  </div>
                )}
              </div>
              <hr className={styles.hr} />
              <div className='layout-section flex flex-col gap-6'>
                <Chip
                  label='Layout'
                  size='small'
                  color='primary'
                  variant='tonal'
                  className={classnames('self-start', styles.chip)}
                />
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Layouts</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'vertical' })}
                        onClick={() => handleChange('layout', 'vertical')}
                      >
                        <LayoutVertical />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('layout', 'vertical')}>
                        Vertical
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'collapsed' })}
                        onClick={() => handleChange('layout', 'collapsed')}
                      >
                        <LayoutCollapsed />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('layout', 'collapsed')}>
                        Collapsed
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, {
                          [styles.active]: settings.layout === 'horizontal'
                        })}
                        onClick={() => handleChange('layout', 'horizontal')}
                      >
                        <LayoutHorizontal />
                      </div>
                      <p className={styles.itemLabel} onClick={() => handleChange('layout', 'horizontal')}>
                        Horizontal
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Content</p>
                  <div className='flex items-center gap-4'>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, {
                          [styles.active]: settings.contentWidth === 'compact'
                        })}
                        onClick={() =>
                          updateSettings({
                            navbarContentWidth: 'compact',
                            contentWidth: 'compact',
                            footerContentWidth: 'compact'
                          })
                        }
                      >
                        <ContentCompact />
                      </div>
                      <p
                        className={styles.itemLabel}
                        onClick={() =>
                          updateSettings({
                            navbarContentWidth: 'compact',
                            contentWidth: 'compact',
                            footerContentWidth: 'compact'
                          })
                        }
                      >
                        Compact
                      </p>
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.itemWrapper, {
                          [styles.active]: settings.contentWidth === 'wide'
                        })}
                        onClick={() =>
                          updateSettings({
                            navbarContentWidth: 'wide',
                            contentWidth: 'wide',
                            footerContentWidth: 'wide'
                          })
                        }
                      >
                        <ContentWide />
                      </div>
                      <p
                        className={styles.itemLabel}
                        onClick={() =>
                          updateSettings({
                            navbarContentWidth: 'wide',
                            contentWidth: 'wide',
                            footerContentWidth: 'wide'
                          })
                        }
                      >
                        Wide
                      </p>
                    </div>
                  </div>
                </div>
                {!disableDirection && (
                  <div className='flex flex-col gap-2.5'>
                    <p className='font-medium'>Direction</p>
                    <div className='flex items-center gap-4'>
                      <div className='flex flex-col items-start gap-0.5'>
                        <div
                          className={classnames(styles.itemWrapper, {
                            [styles.active]: direction === 'ltr'
                          })}
                          onClick={() => {
                            React.startTransition(() => {
                              handleChange('direction', 'ltr')
                            })
                          }}
                        >
                          <DirectionLtr />
                        </div>
                        <p className={styles.itemLabel}>
                          Left to Right <br />
                          (English)
                        </p>
                      </div>
                      <div className='flex flex-col items-start gap-0.5'>
                        <div
                          className={classnames(styles.itemWrapper, {
                            [styles.active]: direction === 'rtl'
                          })}
                          onClick={() => {
                            React.startTransition(() => {
                              handleChange('direction', 'rtl')
                            })
                          }}
                        >
                          <DirectionRtl />
                        </div>
                        <p className={styles.itemLabel}>
                          Right to Left <br />
                          (Arabic)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollWrapper>
        </div>,
        document.body
      )}
    </>
  )
}

function DebouncedColorPicker(props: DebouncedColorPickerProps) {
  const { settings, isColorFromPrimaryConfig, handleChange } = props
  const [debouncedColor, setDebouncedColor] = React.useState(settings.primaryColor ?? primaryColorConfig[0].main)

  useDebounce(() => handleChange('primaryColor', debouncedColor), 200, [debouncedColor])

  return (
    <>
      <HexColorPicker
        color={!isColorFromPrimaryConfig ? settings.primaryColor ?? primaryColorConfig[0].main : '#eee'}
        onChange={setDebouncedColor}
      />
      <HexColorInput
        className={styles.colorInput}
        color={!isColorFromPrimaryConfig ? settings.primaryColor ?? primaryColorConfig[0].main : '#eee'}
        onChange={setDebouncedColor}
        prefixed
        placeholder='Type a color'
      />
    </>
  )
}

type CustomizerProps = {
  breakpoint?: Breakpoint | 'xxl' | `${number}px` | `${number}rem` | `${number}em`
  disableDirection?: boolean
}

type DebouncedColorPickerProps = {
  settings: Settings
  isColorFromPrimaryConfig: PrimaryColorConfig | undefined
  handleChange: (field: keyof Settings | 'primaryColor', value: Settings[keyof Settings] | string) => void
}
