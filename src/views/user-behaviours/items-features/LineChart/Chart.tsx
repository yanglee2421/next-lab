'use client'

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  useColorScheme
} from '@mui/material'

import { useImmer } from 'use-immer'

import ReactApexcharts from '@/libs/ApexCharts'

import type { Res } from '@/api/api-nuwa/feature_flags_by_time'

import { rgbaToHex } from '@/utils/rgbaToHex'

export function Chart(props: Props) {
  // ** Props
  const { data } = props

  const theme = useTheme()

  const options = [
    ...new Set(
      data.flatMap(item => {
        return Object.keys(
          item.data.global.find(item => {
            return item.feature === 'product_type'
          })?.data || {}
        )
      })
    )
  ]

  const { mode, systemMode } = useColorScheme()

  const _mode = (mode === 'system' ? systemMode : mode) || 'light'
  const divider = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
  const disabledText = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)

  // const options: ApexOptions =

  const [state, updateState] = useImmer(() => {
    return {
      productType: options.at(0) || ''
    }
  })

  const lineMap = data.at(0)?.data[state.productType]?.reduce((map, item) => {
    const line = Object.entries(item.data)
      .sort((prev, curr) => {
        return curr[1] - prev[1]
      })
      .at(0)

    if (line) {
      map.set(item.feature, line[0])
    }

    return map
  }, new Map<string, string>())

  const lineData = data.reduce<Array<Map<string, number>>>((list, item) => {
    if (!lineMap) {
      return list
    }

    const map = new Map<string, number>()

    Array.from(lineMap.entries()).forEach(([feature, lineName]) => {
      const featureItem = item.data[state.productType]?.find(item => {
        return item.feature === feature
      })

      const value = featureItem?.data[lineName]

      if (value) {
        map.set(lineName, value)
      }
    })

    list.push(map)

    return list
  }, [])

  return (
    <Card>
      <CardHeader
        title='Product Feature'
        action={
          <FormControl size='small' sx={{ minWidth: 160 }}>
            <InputLabel>Product type</InputLabel>
            <Select
              value={state.productType}
              onChange={evt => {
                updateState(state => {
                  state.productType = evt.target.value
                })
              }}
              label='Product type'
            >
              {options.map(item => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        }
      ></CardHeader>
      <CardContent>
        <ReactApexcharts
          type='line'
          height={400}
          series={(() => {
            if (!lineMap) {
              return []
            }

            return Array.from(lineMap.values(), lineName => {
              return {
                name: lineName,
                data: lineData.map(item => item.get(lineName) || 0)
              }
            })
          })()}
          options={{
            chart: {
              parentHeightOffset: 0,
              zoom: { enabled: false },
              toolbar: { show: false },
              offsetX: theme.direction === 'rtl' ? 10 : -10
            },
            colors: ['#ff9f43'],
            stroke: { curve: 'straight' },
            dataLabels: { enabled: false },
            markers: {
              strokeWidth: 7,
              strokeOpacity: 1,
              colors: ['#ff9f43'],
              strokeColors: ['#fff']
            },
            grid: {
              padding: { top: -10 },
              borderColor: divider,
              xaxis: {
                lines: { show: true }
              }
            },
            tooltip: {
              custom(data: any) {
                return `<div class='bar-chart'>
                  <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
                </div>`
              }
            },
            yaxis: {
              labels: {
                style: { colors: disabledText, fontSize: '13px' }
              }
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { color: divider },
              crosshairs: {
                stroke: { color: divider }
              },
              labels: {
                style: { colors: disabledText, fontSize: '13px' }
              },
              categories: data.map(item => item.time)
            }
          }}
        ></ReactApexcharts>
      </CardContent>
    </Card>
  )
}

type Props = {
  data: Res
}
