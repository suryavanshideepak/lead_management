import React, {  useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import '../../App.css';
import Navbar from "../nav/Navbar";
import UserSalesChart from "./UserSalesChart";
import SalesChart from "./SalesChart";

const Dashboard = ({title}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Navbar title={"Dashboard"} open={open} toggle={toggleDrawer}/>
      <UserSalesChart />
      <SalesChart/>
    </Box>
  );
};

export default Dashboard;