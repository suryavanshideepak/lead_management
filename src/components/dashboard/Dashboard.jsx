import React, {  useState } from "react";
import { Box, Grid2 } from "@mui/material";
import Sidebar from "./Sidebar";
import '../../App.css';
import Navbar from "../nav/Navbar";
import UserSalesChart from "./UserSalesChart";
import SalesChart from "./SalesChart";
import { useDispatch, useSelector } from "react-redux";
import { sidebarCollapse } from "../../app/users/userSlice";

const Dashboard = ({title}) => {
  const { isOpen } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const toggleDrawer = () => {
    dispatch(sidebarCollapse(!isOpen))
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar toggleDrawer={toggleDrawer} />
      <Navbar title={"Dashboard"} toggle={toggleDrawer}/>
      <Box>
        <Grid2 container>
          <Grid2 item sx={4}>
           <UserSalesChart />
          </Grid2>
          <Grid2 item sx={4}>
            <SalesChart/>
          </Grid2>
        </Grid2>

      </Box>
      
    </Box>
  );
};

export default Dashboard;