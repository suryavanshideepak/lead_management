import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";
import Sidebar from "./Sidebar";
import '../../App.css';
import Navbar from "../nav/Navbar";
import UserSalesChart from "./UserSalesChart";
import SalesChart from "./SalesChart";
import { useDispatch, useSelector } from "react-redux";
import { sidebarCollapse } from "../../app/users/userSlice";
import DashboardCards from "./DashboardCards";
import { getAllTotalOrders } from "../../app/leads/leadSlice";

const Dashboard = ({ title }) => {
  const { isOpen } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(sidebarCollapse(!isOpen));
  };

  useEffect(()=>{
    dispatch(getAllTotalOrders())
  },[dispatch])

  return (
    <Box sx={{ display: 'flex', marginTop: 8, marginBottom: 4, overflow: 'hidden' }}>
      <Sidebar toggleDrawer={toggleDrawer} />
      <Navbar title={"Dashboard"} toggle={toggleDrawer} />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>

        <DashboardCards/>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 5 }}>
          <Grid2 container spacing={2} >
            <Grid2 item xs={12} md={6} sx={{ width:'100%',padding:5 }}>
              <UserSalesChart />
            </Grid2>
            <Grid2 item xs={12} md={6} sx={{ width:'100%',padding:5 }}>
              <SalesChart />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
