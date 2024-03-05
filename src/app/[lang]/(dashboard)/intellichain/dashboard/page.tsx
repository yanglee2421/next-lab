import React from 'react'

import Grid from '@mui/material/Grid'

import Congratulations from '@views/ecommerce/Congratulations'
import CardStatVertical from '@components/card-statistics/Vertical'
import TotalProfitStackedBar from '@views/ecommerce/TotalProfitStackedBar'
import TotalSales from '@views/ecommerce/TotalSales'
import LineChartWithShadow from '@views/ecommerce/LineChartWithShadow'
import RadialBarChart from '@views/ecommerce/RadialBarChart'
import Transactions from '@views/ecommerce/Transactions'
import NewVisitors from '@views/ecommerce/NewVisitors'
import WebsiteStatistics from '@views/ecommerce/WebsiteStatistics'
import Table from '@views/ecommerce/Table'
import MeetingSchedule from '@views/ecommerce/MeetingSchedule'
import { db } from '@/data/fake-db/invoice'

export default function DashboardECommerce() {
  const data = getData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} className='self-end'>
        <Congratulations />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Revenue'
              stats='$95k'
              avatarIcon='ri-money-dollar-circle-line'
              avatarColor='success'
              subtitle='Revenue Increase'
              trendNumber='12%'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Transactions'
              stats='12.1k'
              avatarIcon='ri-bank-card-line'
              avatarColor='info'
              subtitle='Daily Transactions'
              trendNumber='38%'
              trend='positive'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <TotalProfitStackedBar />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TotalSales />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LineChartWithShadow />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadialBarChart />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Transactions />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Logistics'
              stats='$44k'
              avatarIcon='ri-car-line'
              avatarColor='error'
              subtitle='Revenue Increase'
              trendNumber='42%'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Reports'
              stats='268'
              avatarIcon='ri-file-chart-line'
              avatarColor='warning'
              subtitle='System Bugs'
              trendNumber='28%'
              trend='negative'
            />
          </Grid>
          <Grid item xs={12}>
            <NewVisitors />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <WebsiteStatistics />
      </Grid>
      <Grid item xs={12} lg={8} className='order-last lg:order-[unset]'>
        <Table invoiceData={data.slice(0, 8)} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MeetingSchedule />
      </Grid>
    </Grid>
  )
}

const getData = React.cache(() => db)
