import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { MotivationIllustration } from '../../assets/illustrations';
import axiosInstance from '../../utils/axios';

// ----------------------------------------------------------------------

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [dashboardData, setDasboardData] = useState({})

  const getDashboard = async()=>{
    await axiosInstance.get('/admindashboard')
    .then((res)=>{
      setDasboardData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getDashboard()
  }, [])

  return (
    <>
      <Helmet>
        <title> General: E-commerce | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Postive Ratings"
              percent={(dashboardData.count_rating_5/dashboardData.total_reviews *100)}
              total={dashboardData.count_rating_5}
              chart={{
                colors: [theme.palette.primary.main],
                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Negative Ratings"
              percent={-(dashboardData.count_rating_1/dashboardData.total_reviews *100)}
              total={dashboardData.count_rating_1}
              chart={{
                colors: [theme.palette.info.main],
                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
              }}  
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Reviews"
              // percent={(dashboardData.consumer/dashboardData.total_reviews *100)}
              total={dashboardData.total_reviews}
              chart={{
                colors: [theme.palette.warning.main],
                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Orders"
              // percent={2.6}
              total={dashboardData.orders}
              chart={{
                colors: [theme.palette.primary.main],
                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Products"
              // percent={-0.1}
              total={dashboardData.product}
              chart={{
                colors: [theme.palette.info.main],
                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Users"
              // percent={0.6}
              total={dashboardData.consumer}
              chart={{
                colors: [theme.palette.warning.main],
                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender
              title="Sale By Gender"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 44 },
                  { label: 'Womens', value: 75 },
                ],
              }}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Yearly Sales"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            <EcommerceBestSalesman
              title="Best Reviews"
              tableData={dashboardData.reviews}
              tableLabels={[
                { id: 'seller', label: 'Review' },
                { id: 'product', label: 'Product' },
                { id: 'total', label: 'Rating' },
                { id: 'rank', label: 'Date', align: 'center' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
