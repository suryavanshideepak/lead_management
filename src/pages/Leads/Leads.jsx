import React, { useState } from 'react'
import LeadTable from '../../components/leadTable/LeadTable'
import { Box, Typography } from '@mui/material'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/nav/Navbar'

const Leads = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
    <div>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Navbar title={"Leads"} open={open} toggle={toggleDrawer}/>
        <LeadTable/>
    </div>
  )
}

export default Leads