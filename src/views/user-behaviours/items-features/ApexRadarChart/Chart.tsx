'use client'

import {
  useTheme,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  useColorScheme
} from '@mui/material'

import { useImmer } from 'use-immer'

import ReactApexcharts from '@/libs/ApexCharts'

import type { Res } from '@/api/api-nuwa/feature_flags'

import { rgbaToHex } from '@/utils/rgbaToHex'

export function Chart(props: Props) {
  // ** Props
  const { data, options } = props

  const theme = useTheme()

  const [state, updateState] = useImmer(() => {
    return {
      productType: options.at(0) || ''
    }
  })

  const { mode, systemMode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? systemMode : mode) || 'light'
  const divider = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
  const textDisabled = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)

  const filteredFeature = (() => {
    const category = data[state.productType]

    if (category) {
      return category.filter(item => {
        return Object.keys(item.data).length > 2
      })
    }

    return []
  })()

  const lineData: Map<string, number>[] = (() => {
    const list = []

    for (let i = 0; i < 3; i++) {
      const map = filteredFeature.reduce<Map<string, number>>((map, item) => {
        const tuple = Object.entries(item.data)
          .sort((prev, curr) => {
            return curr[1] - prev[1]
          })
          .at(i)

        if (tuple) {
          map.set(tuple[0], tuple[1])
        }

        return map
      }, new Map())

      list.push(map)
    }

    return list
  })()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} xl={6}>
        <Card>
          <CardHeader
            title='Hot Product Features'
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
          />
          <CardContent>
            <ReactApexcharts
              type='radar'
              height={440}
              series={lineData.map(item => {
                return {
                  name: [...item.keys()].join('/'),
                  data: [...item.values()]
                }
              })}
              options={{
                chart: {
                  parentHeightOffset: 0,
                  toolbar: { show: false },
                  dropShadow: {
                    top: 1,
                    blur: 8,
                    left: 1,
                    opacity: 0.2,
                    enabled: false
                  }
                },
                markers: { size: 0 },
                fill: { opacity: [1, 0.8] },

                // colors: [radarColors.series1, radarColors.series2],
                stroke: {
                  width: 0,
                  show: false
                },
                legend: {
                  fontSize: '13px',
                  labels: {
                    colors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`)
                  },
                  markers: {
                    height: 10,
                    width: 10,
                    offsetX: theme.direction === 'rtl' ? 7 : -4
                  },
                  itemMargin: {
                    vertical: 3,
                    horizontal: 9
                  }
                },
                plotOptions: {
                  radar: {
                    polygons: {
                      strokeColors: divider,
                      connectorColors: divider
                    }
                  }
                },
                grid: {
                  show: false,
                  padding: {
                    top: -20,
                    bottom: -20
                  }
                },
                yaxis: { show: false },
                xaxis: {
                  categories: ['Battery', 'Brand', 'Camera', 'Memory', 'Storage', 'Display', 'OS', 'Price'],
                  labels: {
                    style: {
                      fontSize: '13px',
                      colors: [
                        textDisabled,
                        textDisabled,
                        textDisabled,
                        textDisabled,
                        textDisabled,
                        textDisabled,
                        textDisabled,
                        textDisabled
                      ]
                    }
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4} xl={6}>
        <Card>
          <CardHeader title='Product Features Details'></CardHeader>
          <CardContent>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>feature</TableCell>
                    <TableCell>count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(() => {
                    return lineData
                      .flatMap(map => {
                        return [...map.entries()]
                      })
                      .map(([key, value]) => {
                        return (
                          <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        )
                      })
                  })()}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

type Props = {
  data: Res
  options: string[]
}
