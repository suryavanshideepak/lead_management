import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";
import Sidebar from "./Sidebar";
import '../../App.css';
import Navbar from "../nav/Navbar";
import UserSalesChart from "./UserSalesChart";
import SalesChart from "./SalesChart";
import { useDispatch, useSelector } from "react-redux";
import { sidebarCollapse } from "../../app/users/userSlice";
import TinyLineChart from "../chart/TinyLineChart";

const Dashboard = ({ title }) => {
  const { isOpen } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(sidebarCollapse(!isOpen));
  };

  return (
    <Box sx={{ display: 'flex', marginTop: 8, marginBottom: 4, overflow: 'hidden' }}>
      <Sidebar toggleDrawer={toggleDrawer} />
      <Navbar title={"Dashboard"} toggle={toggleDrawer} />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Box sx={{ flexGrow: 1, p: 3, }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#61dafb' }}>
                <CardContent>
                  <Typography color="textPrimary" variant="h6">Chart 1</Typography>
                  {/* <Typography variant="h6">45</Typography> */}
                  <Box height={100}>
                    <TinyLineChart />
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#ffff7a' }}>
                <CardContent>
                  <Typography variant="h6">Chart 2</Typography>

                  <TinyLineChart />
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#65ff65' }}>
                <CardContent>
                  <Typography variant="h6">Chart 3</Typography>
                  <TinyLineChart />

                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Card sx={{ width: '300px', backgroundColor: '#b2a999' }}>
                <CardContent>
                  <Typography variant="h6">Chart 4</Typography>
                  <TinyLineChart />

                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center',width:'100%',p:5 }}>
          <Grid2 container  sx={{ width: '100%' }}>
            <Grid2 item xs={12} sm={6} md={6} sx={{ width: '50%' }}>
                <UserSalesChart />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={6} sx={{ width: '50%' }}>
                <SalesChart />
            </Grid2>
          </Grid2>
        </Box>
      </Box>


    </Box>
  );
};

export default Dashboard;
