import { Box, Card, CardContent, Grid2, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const DashboardCards = () => {
  const { totalVarifiedOrder } = useSelector(state => state.lead)

  return (
    <Box sx={{ flexGrow: 1, p: 3, }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#61dafb' }}>
                <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                    <Typography variant='h3' >Verified Orders</Typography>
                    <Typography variant='p' paddingY={2}>{totalVarifiedOrder?.totalOrders}</Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#ffff7a' }}>
                <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} >
                    <Typography variant='h3'>Total Price</Typography>
                    <Typography variant='p' paddingY={2}>{totalVarifiedOrder?.totalPrice}</Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#65ff65' }}>
                <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                    <Typography variant='h3'>Ticket Size</Typography>
                    <Typography variant='p' paddingY={2}>{totalVarifiedOrder?.averageTicketSize}</Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#b2a999' }}>
                <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant="h3">Total Orders</Typography>
                  <Typography variant='p' paddingY={2}>{totalVarifiedOrder?.totalOrders}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
  )
}

export default DashboardCards