'use client'

// Charts Imports
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'

// MUI Imports
import type { Theme } from '@mui/material'
import { useTheme, useColorScheme } from '@mui/material'
import { green, blue, purple } from '@mui/material/colors'

// NextJs Imports

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

export function LineChart(props: LineChartProps) {
  // ** Props
  const { categories, series, ...restProps } = props

  const theme = useTheme()

  return (
    <ReactApexcharts
      type='line'
      height={400}
      series={series}
      options={useOptions({ theme, categories })}
      {...restProps}
    ></ReactApexcharts>
  )
}

function useOptions(options: Options): ApexOptions {
  // ** Params
  const { categories, theme } = options

  const { mode, systemMode } = useColorScheme()
  const _mode = (mode === 'system' ? systemMode : mode) || 'light'
  const divider = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
  const disabledText = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)

  return {
    chart: {
      parentHeightOffset: 0,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#ff9f43', green[500], blue[500], purple[400]],
    stroke: {
      curve: 'straight'
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43', green[500], blue[500], purple[400]],
      strokeColors: '#fff'
    },
    grid: {
      padding: {
        top: -10
      },
      borderColor: divider,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: disabledText
        }
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        color: divider
      },
      crosshairs: {
        stroke: {
          color: divider
        }
      },
      labels: {
        style: {
          colors: disabledText
        }
      },
      categories
    },
    legend: {
      labels: {
        colors: theme.palette.text.primary
      }
    }
  }
}

interface Options {
  theme: Theme
  categories: string[]
}

interface LineChartProps {
  categories: string[]
  series: ApexOptions['series']
}

const ReactApexcharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
})
